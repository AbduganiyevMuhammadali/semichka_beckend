const HisobotKunlikModel = require('../models/zakaz.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const moment = require('moment');
const clientModel = require('../models/client.model');
const valyutaModel = require('../models/valyuta.model');
const agentModel = require('../models/agent.model');
const skladModel = require('../models/sklad.model');
const producRegister = require('../models/product_register.model');
const doctype = require('../utils/docTypes.utils');
const KassaRegisterModel = require('../models/kassa_register.model');
const sequelize = require('../db/db-sequelize');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class HisobotKunlikController extends BaseController {
    kassaSverka = async (req, res, next) => {
        let query = {}, body = req.body, queryx;
        let date = new Date() ;
        let datetime1 = moment(date).startOf('day').unix();
        let datetime2 = moment(date).endOf('day').unix();
        query.datetime = {
            [Op.gte]: datetime1,
            [Op.lte]: datetime2
        }
        const KassaRegister = await KassaRegisterModel.findAll({
            attributes: ['datetime', 'doc_type', 'pay_type', 'summa', 'kassa_id', 'sklad_id',
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
            group: ['id', 'doc_id']
        })
        res.send(KassaRegister)
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new HisobotKunlikController;
