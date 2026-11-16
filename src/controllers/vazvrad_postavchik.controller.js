const VazvradPostavchikModel = require('../models/vazvrad_postavchik.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const moment = require('moment');
const vazvrad_postavchik_itemModel = require('../models/vazvrad_postavchik_item.model');
const postavchikModel = require('../models/pastavchik.model');
const valyutaModel = require('../models/valyuta.model');
const agentModel = require('../models/agent.model');
const skladModel = require('../models/sklad.model');
const DostavchikModel = require('../models/dostavchik.model');
const producRegister =  require('../models/product_register.model');
const doctype = require('../utils/docTypes.utils');
const kassaRegister = require('../models/kassa_register.model')

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class VazvradPostavchikController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await VazvradPostavchikModel.findAll({
            include:[
                {model: vazvrad_postavchik_itemModel, as: 'vazvrad_postavchik_item'},
                {model: postavchikModel , as : 'postavchik'  },
                {model:  DostavchikModel, as : 'dostavchik'  },
                {model: valyutaModel , as : 'valyuta', required: false  },
                {model: skladModel , as : 'sklad'  },
                {model: agentModel , as : 'agent', required: false  }
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getFilter = async (req, res, next) => {
        let query = {};
        if (req.body.postavchik_id){
            query.postavchik_id = req.body.postavchik_id
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

        let modelList = await VazvradPostavchikModel.findAll({
            where:query,

            include:[
                {model: vazvrad_postavchik_itemModel, as: 'vazvrad_postavchik_item'},
                {model: postavchikModel , as : 'postavchik'  },
                {model: valyutaModel , as : 'valyuta', required: false  },
                {model: skladModel , as : 'sklad', required: false  },
                {model:  DostavchikModel, as : 'dostavchik'  },
                {model: agentModel , as : 'agent', required: false  }
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const user = await VazvradPostavchikModel.findOne({
            include:[
                {model: vazvrad_postavchik_itemModel, as: 'vazvrad_postavchik_item'}
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
        let { vazvrad_postavchik_item, ...data } = req.body;
        data.date = Math.floor(new Date().getTime()/1000)
        const model = await VazvradPostavchikModel.create(data);

        if (!model) {
            throw new HttpException(500, req.mf('VazvradPostavchik saqlashda xatolik'));
        }

        this.#vazvrad_postavchik_itemAdd(vazvrad_postavchik_item, model);

        res.status(201).send(model);
    };
    #vazvrad_postavchik_itemAdd = async(vazvrad_postavchik_item, model, insert = true) => {
        if(!insert){
            await  this.#deleteZakasItem(model.id)
        }
        for(let key of vazvrad_postavchik_item){
            let vazvrad_postavchik = {
            doc_id: model.id,
            tovar_id: key.tovar_id,
            // ostatka: key.ostatka,
            count: key.count,
            price: key.price,
            summa: key.summa,
            comment:key.comment
            }
            await vazvrad_postavchik_itemModel.create(vazvrad_postavchik)

            let producRegisteritem = {
                doc_id: model.id,
                product_id: key.tovar_id,
                seriya_id: 1,
                count: key.count,
                doc_type: doctype.chiqim,
                type: 0,
            }
            await producRegister.create(producRegisteritem)
            if(model.valyuta_id == 1){
                vazvrad_postavchik.pay_type = "sum"
            }
            else{
                vazvrad_postavchik.pay_type = "usd"
            }
            let date = Math.floor( new Date().getTime() / 1000)            
            let KassaRegister = {
                datetime:date,
                doc_id:model.id,
                doc_type: "Kirim", //kirim
                pay_type: vazvrad_postavchik.pay_type,
                pay_type_id:model.pay_type_id,
                summa:model.summa,
                record_type:1,
                sklad_id:model.sklad_id
            }
            await kassaRegister.create(KassaRegister);
        }
    }
    update = async (req, res, next) => {
        this.checkValidation(req);
        let { vazvrad_postavchik_item, ...data } = req.body;

        let { 
            name,
            date,
            postavchik_id,
            agent_id,
            sklad_id,
            dostavchik_id,
            valyuta_id,
            pay_type_id,
            summa
        } = req.body;

        const model = await VazvradPostavchikModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.name = name;
        model.date = date;
        model.postavchik_id = postavchik_id;
        model.agent_id = agent_id;
        model.sklad_id = sklad_id;
        model.dostavchik_id = dostavchik_id;
        model.valyuta_id = valyuta_id;
        model.pay_type_id = pay_type_id;
        model.summa = summa;
        model.save();
        this.#vazvrad_postavchik_itemAdd(vazvrad_postavchik_item, model, false);
        res.send(model);
    };


    #deleteZakasItem = async(doc_id) =>{
        await vazvrad_postavchik_itemModel.destroy({
            where:{doc_id: doc_id}
        })
    }
    delete = async (req, res, next) => {
        const model = await VazvradPostavchikModel.findOne({ where : { id: req.params.id } })
        
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
module.exports = new VazvradPostavchikController;