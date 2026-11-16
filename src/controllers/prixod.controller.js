const PrixodModel = require('../models/prixod.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const moment = require('moment');
const prixod_itemModel = require('../models/prixod_item.model');
const PastavchikModel = require('../models/pastavchik.model');
const valyutaModel = require('../models/valyuta.model');
const skladModel =  require('../models/sklad.model');
const producRegister =  require('../models/product_register.model');
const kassaRegister = require('../models/kassa_register.model')
const doctypy = require('../utils/docTypes.utils');
const SeriyaModel =  require('../models/seriya.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class PrixodController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await PrixodModel.findAll({
            include:[
                {model: prixod_itemModel, as: 'prixod_item'},
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

        let modelList = await PrixodModel.findAll({
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
        const user = await PrixodModel.findOne({
            include:[
                {model: prixod_itemModel, as: 'prixod_item'},
                {model: PastavchikModel , as : 'pastavchik'  },
                {model: valyutaModel , as : 'valyuta', required: false  },
                {model: skladModel , as : 'sklad', required: false  }
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
        let { prixod_item, ...data } = req.body;
        data.date = Math.floor(new Date().getTime()/1000);
        const model = await PrixodModel.create(data);

        if (!model) {
            throw new HttpException(500, req.mf('Prixod saqlashda xatolik'));
        }

        this.#prixod_itemAdd(prixod_item, model);

        res.status(201).send(model);
    };
    #prixod_itemAdd = async(prixod_item, model, insert = true) => {
        if(!insert){
            await  this.#deletePrixodItem(model.id)
        }
        for(let key of prixod_item){
            
            let seriya = {
                product_id: key.tovar,
                narxi: key.price,
                datetime: new Date()
            }
            let ser_id = null
            await SeriyaModel.create(seriya).then((res) =>{
                ser_id = res.id
            })

            let prixod = {
                doc_id: model.id,
                tovar: key.tovar,
                ostatka: key.ostatka,
                count: key.count,
                price: key.price,
                skidka: key.skidka,
                summa: key.summa
            }
            await prixod_itemModel.create(prixod)
            let producRegisteritem = {
                doc_id: model.id,
                product_id: key.tovar,
                seriya_id: ser_id,
                count: key.count,
                doc_type: doctypy.kirim,
                type: 1,
                }
            await producRegister.create(producRegisteritem);
              if(model.valyuta_id == 1){
                prixod.pay_type = "sum"
            }
            else{
                prixod.pay_type = "usd"
            }
            let date = Math.floor( new Date().getTime() / 1000)
            let KassaRegister = {
                datetime:date,
                doc_id:model.id,
                doc_type: "Chiqim",
                pay_type: prixod.pay_type,
                pay_type_id:model.pay_type_id,
                summa:model.jammi_summa,
                record_type:1,
                sklad_id:model.sklad_id
            }
            await kassaRegister.create(KassaRegister);
        }
    }
    update = async (req, res, next) => {
        this.checkValidation(req);
        let { prixod_item, ...data } = req.body;     
        const model = await PrixodModel.findOne({ where: { id: req.params.id }} );

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
      await this.#prixod_itemAdd(prixod_item, model, false);
        res.send(model);
    };


    #deletePrixodItem = async(doc_id) =>{
        await prixod_itemModel.destroy({
            where:{doc_id: doc_id}
        })
        await producRegister.destroy({
            where:{doc_id: doc_id}
        })
    }
    delete = async (req, res, next) => {
        const model = await PrixodModel.findOne({ where : { id: req.params.id } })
        await prixod_itemModel.destroy({
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
module.exports = new PrixodController;