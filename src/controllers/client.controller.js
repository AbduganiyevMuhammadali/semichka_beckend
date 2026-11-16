const ClientModel = require('../models/client.model');
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
class ClientController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await ClientModel.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const user = await ClientModel.findOne({
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
            firma_name,
            lat,
            long,
            tel,
            name,
            inn,
            mfo,
            bank_card
        } = req.body;

        const model = await ClientModel.create({
            firma_name,
            lat,
            long,
            tel,
            name,
            inn,
            mfo,
            bank_card
        });

        if (!model) {
            throw new HttpException(500, req.mf('Something went wrong'));
        }

        res.status(201).send(model);
    };

    update = async (req, res, next) => {
        this.checkValidation(req);

        let { 
            firma_name,
            lat,
            long,
            tel,
            name,
            inn,
            mfo,
            bank_card
        } = req.body;

        const model = await ClientModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.firma_name = firma_name;
        model.lat = lat;
        model.long = long;
        model.tel = tel;
        model.name = name;
        model.inn = inn;
        model.mfo = mfo;
        model.bank_card = bank_card;
        model.save();

        res.send(model);
    };

    delete = async (req, res, next) => {
        const model = await ClientModel.findOne({ where : { id: req.params.id } })
        
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
module.exports = new ClientController;