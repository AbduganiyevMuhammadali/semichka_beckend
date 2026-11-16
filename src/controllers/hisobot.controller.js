const HisobotModel = require('../models/zakaz.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op, QueryTypes } = require('sequelize');
const moment = require('moment');
const clientModel = require('../models/client.model');
const valyutaModel = require('../models/valyuta.model');
const agentModel = require('../models/agent.model');
const skladModel = require('../models/sklad.model');
const producRegister =  require('../models/product_register.model');
const doctype = require('../utils/docTypes.utils');
const kassaRegister = require('../models/kassa_register.model');
const KassaRegisterModel = require('../models/kassa_register.model');
const sequelize = require('../db/db-sequelize');
/******************************************************************************
 *                              User Controller 
 ******************************************************************************/  
class HisobotController extends BaseController {
    kassaSverka = async (req , res , next) =>{
        let query = {}, body = req.body, queryx;
        query.datetime = { 
            [Op.gte]: body.datetime1,
            [Op.lte]: body.datetime2
        }
        let datetime1 = body.datetime1,
        datetime2 = body.datetime2;
        if(body.sklad_id != null){
            query.sklad_id = {[Op.eq]: body.sklad_id}
            // queryx.id = {[Op.eq]: body.sklad_id}
        }
        const KassaRegister = await KassaRegisterModel.findAll({
            attributes:['datetime','doc_type','pay_type','summa','kassa_id','sklad_id',
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime < " + datetime1 + " THEN kassa_register.summa * power(-1, 'type') ELSE 0 END)"), 'begin_total'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime >= " + datetime1 + " and kassa_register.datetime <= " + datetime2 + " AND kassa_register.doc_type = 'Kirim' and kassa_register.pay_type = 'sum' and kassa_register.pay_type_id = 1 THEN kassa_register.summa ELSE 0 END)"), 'kirim_naqd_sum'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime >= " + datetime1 + " and kassa_register.datetime <= " + datetime2 + " AND kassa_register.doc_type = 'Kirim' and kassa_register.pay_type = 'usd' and kassa_register.pay_type_id = 1 THEN kassa_register.summa ELSE 0 END)"), 'kirim_naqd_usd'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime >= " + datetime1 + " and kassa_register.datetime <= " + datetime2 + " AND kassa_register.doc_type = 'Chiqim' and kassa_register.pay_type = 'sum' and kassa_register.pay_type_id = 1 THEN kassa_register.summa ELSE 0 END)"), 'chiqim_naqd_sum'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime >= " + datetime1 + " and kassa_register.datetime <= " + datetime2 + " AND kassa_register.doc_type = 'Chiqim' and kassa_register.pay_type = 'usd' and kassa_register.pay_type_id = 1 THEN kassa_register.summa ELSE 0 END)"), 'chiqim_naqd_usd'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime >= " + datetime1 + " and kassa_register.datetime <= " + datetime2 + " AND kassa_register.doc_type = 'Chiqim' and kassa_register.pay_type = 'sum' and kassa_register.pay_type_id = 2 THEN kassa_register.summa ELSE 0 END)"), 'chiqim_plas_sum'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime >= " + datetime1 + " and kassa_register.datetime <= " + datetime2 + " AND kassa_register.doc_type = 'Kirim' and kassa_register.pay_type = 'sum' and kassa_register.pay_type_id = 2 THEN kassa_register.summa ELSE 0 END)"), 'kirim_plas_sum'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime >= " + datetime1 + " and kassa_register.datetime <= " + datetime2 + " AND kassa_register.doc_type = 'Chiqim' and kassa_register.pay_type = 'usd' and kassa_register.pay_type_id = 1 THEN kassa_register.summa ELSE 0 END)"), 'kirim_usd'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime >= " + datetime1 + " and kassa_register.datetime <= " + datetime2 + " AND kassa_register.doc_type = 'Kirim' and kassa_register.pay_type = 'usd' and kassa_register.pay_type_id = 1 THEN kassa_register.summa ELSE 0 END)"), 'chiqim_usd'],
            [sequelize.literal("SUM(CASE WHEN kassa_register.datetime < " + datetime2 + " THEN kassa_register.summa * power(-1, 'type') ELSE 0 END)"), 'end_total'],
            ],
            where: query,   
            group:['id','doc_id']
            })
        res.send(KassaRegister)
    }
    productRegister = async (req,res,next) => {
        const model = await sequelize.query('SELECT * FROM `product` INNER JOIN (SELECT `product_register`.`product_id`, SUM(CASE WHEN `product_register`.`type`=1 THEN `product_register`.`count` WHEN `product_register`.`type`=0 THEN -`product_register`.`count` ELSE 0 END) as `qoldiq` FROM `product_register` GROUP BY `product_register`.`product_id`) as `register` ON `product`.`id` = `register`.`product_id` AND `register`.`qoldiq` <= `product`.`minimal`', {raw: true, type: QueryTypes.SELECT })
        res.send(model)
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new HisobotController;