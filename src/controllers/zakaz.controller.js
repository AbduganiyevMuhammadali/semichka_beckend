const ZakazModel = require('../models/zakaz.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const moment = require('moment');
const zakaz_itemModel = require('../models/zakaz_item.model');
const clientModel = require('../models/client.model');
const valyutaModel = require('../models/valyuta.model');
const agentModel = require('../models/agent.model');
const skladModel = require('../models/sklad.model');
const producRegister =  require('../models/product_register.model');
const doctype = require('../utils/docTypes.utils');
const kassaRegister = require('../models/kassa_register.model');
const ClientModel = require('../models/client.model');
const AgentModel = require('../models/agent.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class ZakazController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await ZakazModel.findAll({
            include:[
                {model: zakaz_itemModel, as: 'zakaz_item'},
                {model: clientModel , as : 'client'  },
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

    getById = async (req, res, next) => {
        const user = await ZakazModel.findOne({
            include:[
                {model: zakaz_itemModel, as: 'zakaz_item'}
            ],
            where:{ id: req.params.id }
        });

        if (!user) {
            throw new HttpException(404, req.mf('data not found'));
        }

        res.send(user);
    };
    getFilter = async (req, res, next) => {
        let query = {};
        if (req.body.client_id){
            query.client_id = req.body.client_id
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

        let modelList = await ZakazModel.findAll({
            where:query,

            include:[
                {model: ClientModel , as : 'client'  },
                {model: AgentModel , as : 'agent'  },
                {model: valyutaModel , as : 'valyuta', required: false  },
                {model: skladModel , as : 'sklad', required: false  },
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    create = async (req, res, next) => {
        this.checkValidation(req);
        let { zakaz_item, ...data } = req.body;
        data.date = Math.floor(new Date().getTime()/1000)
        const model = await ZakazModel.create(data);

        if (!model) {
            throw new HttpException(500, req.mf('Zakaz saqlashda xatolik'));
        }

        this.#zakaz_itemAdd(zakaz_item, model);

        res.status(201).send(model);
    };
    #zakaz_itemAdd = async(zakaz_item, model, insert = true) => {
        if(!insert){
            await  this.#deleteZakasItem(model.id)
        }
        for(let key of zakaz_item){
            let zakaz = {
            doc_id: model.id,
            tovar: key.tovar,
            // ostatka: key.ostatka,
            count: key.count,
            price: key.price,
            skidka: key.skidka,
            summa: key.summa
            }
            await zakaz_itemModel.create(zakaz)

            let producRegisteritem = {
                doc_id: model.id,
                product_id: key.tovar,
                seriya_id: 1,
                count: key.count,
                doc_type: doctype.chiqim,
                type: 0,
              }
            await producRegister.create(producRegisteritem)
            if(model.valyuta_id == 1){
                zakaz.pay_type = "sum"
            }
            else{
                zakaz.pay_type = "usd"
            }
            let date = Math.floor( new Date().getTime() / 1000)            
            let KassaRegister = {
                datetime:date,
                doc_id:model.id,
                doc_type: "Kirim", //kirim
                pay_type: zakaz.pay_type,
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
        let { zakaz_item, ...data } = req.body;

        let { 
            name,
            date,
            client_id,
            agent_id,
            sklad_id,
            valyuta_id,
            pay_type_id,
            jammi_summa,
            jammi_skidka
        } = req.body;

        const model = await ZakazModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.name = name;
        model.date = date;
        model.client_id = client_id;
        model.agent_id = agent_id;
        model.sklad_id = sklad_id;
        model.valyuta_id = valyuta_id;
        model.pay_type_id = pay_type_id;
        model.jammi_summa = jammi_summa;
        model.jammi_skidka = jammi_skidka;
        model.save();
        this.#zakaz_itemAdd(zakaz_item, model, false);
        res.send(model);
    };


    #deleteZakasItem = async(doc_id) =>{
        await zakaz_itemModel.destroy({
            where:{doc_id: doc_id}
        })
    }
    delete = async (req, res, next) => {
        const model = await ZakazModel.findOne({ where : { id: req.params.id } })
        
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
module.exports = new ZakazController;