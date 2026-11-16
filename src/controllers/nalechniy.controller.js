const NalechniyModel = require('../models/nalechniy.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const moment = require('moment');
const nalechniy_itemModel = require('../models/nalechniy_item.model');
const PastavchikModel = require('../models/pastavchik.model');
const valyutaModel = require('../models/valyuta.model');
const skladModel =  require('../models/sklad.model');
const producRegister =  require('../models/product_register.model');
const doctypy = require('../utils/docTypes.utils');
const SeriyaModel =  require('../models/seriya.model');
/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class NalechniyController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await NalechniyModel.findAll({
            include:[
                {model: nalechniy_itemModel, as: 'nalechniy_item'},
                {model: PastavchikModel , as : 'pastavchik'  },
                {model: valyutaModel , as : 'valyuta', required: false  },
                {model: skladModel , as : 'sklad', required: false  }
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getFilter = async (req, res, next) => {
        let query = {};
        if (req.body.pastavchik_id){
            query.pastavchik_id = req.body.pastavchik_id
        }
        
        if (req.body.valyuta_id){
            query.valyuta_id = req.body.valyuta_id
        }

        let modelList = await NalechniyModel.findAll({
            where:query,

            include:[
                {model: nalechniy_itemModel, as: 'nalechniy_item'},
                {model: PastavchikModel , as : 'pastavchik'  },
                {model: valyutaModel , as : 'valyuta', required: false  },
                {model: skladModel , as : 'sklad', required: false  }
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };
    getFilter = async (req, res, next) => {
        let query = {};
        if (req.body.pastavchik_id){
            query.pastavchik_id = req.body.pastavchik_id
        }
        
        if (req.body.valyuta_id){
            query.valyuta_id = req.body.valyuta_id
        }

        if(req.body.datetime1 && req.body.datetime2){
            query.date = {
                [Op.gte]: req.body.datetime1 ,
                [Op.lte] : req.body.datetime2
            }
        }

        let modelList = await NalechniyModel.findAll({
            where:query,

            include:[
                {model: PastavchikModel , as : 'pastavchik'  },
                {model: valyutaModel , as : 'valyuta', required: false  },
                {model: skladModel , as : 'sklad', required: false  },
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const user = await NalechniyModel.findOne({
            include:[
                {model: nalechniy_itemModel, as: 'nalechniy_item'}
            ],
            where:{ id: req.params.id }
        });


        if (!user) {
            throw new HttpException(404, req.mf('data not found'));
        }

        res.send(user);
    };

    create = async (req, res, next) => {
        this.checkValidation(req);
        console.log(req.body);
        let { nalechniy_item, ...data } = req.body;
        data.date = Math.floor(new Date().getTime()/1000);
        const model = await NalechniyModel.create(data);

        if (!model) {
            throw new HttpException(500, req.mf('Nalechniy saqlashda xatolik'));
        }

        this.#nalechniy_itemAdd(nalechniy_item, model);

        res.status(201).send(model);
    };
    #nalechniy_itemAdd = async(nalechniy_item, model, insert = true) => {
        if(!insert){
            await  this.#deleteZakasItem(model.id)
        }
        for(let key of nalechniy_item){
            let nalechniy = {
            doc_id: model.id,
            tovar: key.tovar,
            ostatka: key.ostatka,
            count: key.count,
            price: key.price,
            skidka: key.skidka,
            summa: key.summa
            }
            await nalechniy_itemModel.create(nalechniy)

            let seriya = {
                product_id: key.tovar,
                narxi: key.price,
                datetime: new Date()
            }
            let ser_id = null
            await SeriyaModel.create(seriya).then((res) =>{
                ser_id = res.id
            })

            let producRegisteritem = {
                doc_id: model.id,
                product_id: key.tovar,
                seriya_id: ser_id,
                count: key.count,
                doc_type: doctypy.kirim,
                type: 1,
                }
            await producRegister.create(producRegisteritem)
        }
    }
    update = async (req, res, next) => {
        this.checkValidation(req);
        let { nalechniy_item, ...data } = req.body;
        // let { 
        //     name,
        //     date,
        //     client_id,
        //     agent_id,
        //     valyuta_id,
        //     jammi_summa,
        //     jammi_skidka
        // } = req.body;

        const model = await NalechniyModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.name = data.name;
        model.date = data.date;
        model.pastavchik_id = data.pastavchik_id;
        model.sklad_id = data.sklad_id;
        model.valyuta_id = data.valyuta_id;
        model.pay_type_id = data.pay_type_id;
        model.jammi_summa = data.jammi_summa;
        model.jammi_skidka = data.jammi_skidka;
        model.rasxod = data.rasxod;
        model.save();
      await this.#nalechniy_itemAdd(nalechniy_item, model, false);
        res.send(model);
    };


    #deleteZakasItem = async(doc_id) =>{
        await nalechniy_itemModel.destroy({
            where:{doc_id: doc_id}
        })
        await producRegister.destroy({
            where:{doc_id: doc_id}
        })
    }
    delete = async (req, res, next) => {
        const model = await NalechniyModel.findOne({ where : { id: req.params.id } })

        await nalechniy_itemModel.destroy({
            where:{doc_id: model.id}
        })
        await producRegister.destroy({
            where:{doc_id: model.id}
        })

        if (!model) {
            throw new HttpException(404, req.mf('data not found..'));
        }
        
        try {
            await model.destroy({ force: true });
        } catch (error) {
            await model.destroy();
        }

        res.send(req.mf('data has been deleted'));
    };

}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new NalechniyController;