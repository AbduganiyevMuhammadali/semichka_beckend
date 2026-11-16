const Kassa_registerModel = require('../models/kassa_register.model');
const SeriyaModel = require('../models/seriya.model');

const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const moment = require('moment');
/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class Kassa_registerController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await Kassa_registerModel.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const user = await Kassa_registerModel.findOne({
            where:{ id: req.params.id }
        });

        if (!user) {
            throw new HttpException(404, req.mf('data not found'));
        }

        res.send(user);
    };

    create = async (req, res, next) => {
        this.checkValidation(req);

        let { 
            datetime,
            doc_id,
            doc_type,
            pay_type,
            pay_type_id,
            summa,
            record_type,
            sklad_id,
            comment        
        } = req.body;

        const model = await Kassa_registerModel.create({
            datetime,
            doc_id,
            doc_type,
            pay_type,
            pay_type_id,
            summa,
            record_type,
            sklad_id,
            comment   
        });

        if (!model) {
            throw new HttpException(500, req.mf('Something went wrong'));
        }

        res.status(201).send(model);
    };

    update = async (req, res, next) => {
        this.checkValidation(req);

        let { 
            datetime,
            doc_id,
            doc_type,
            pay_type,
            pay_type_id,
            summa,
            record_type,
            sklad_id,
            comment   
        } = req.body;

        const model = await Kassa_registerModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        model.datetime = datetime;
        model.doc_id = doc_id;
        model.doc_type = doc_type;
        model.doc_id = doc_id;
        model.pay_type = pay_type;
        model. pay_type_id =  pay_type_id;
        model.summa = summa;
        model.record_type = record_type;
        model.sklad_id =  sklad_id;
        model.comment =  comment;
        model.save();

        res.send(model);
    };

    delete = async (req, res, next) => {
        const model = await Kassa_registerModel.findOne({ where : { id: req.params.id } })
        
        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
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
module.exports = new Kassa_registerController;