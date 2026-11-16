const PastavchikModel = require('../models/pastavchik.model');
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
class PastavchikController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await PastavchikModel.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const user = await PastavchikModel.findOne({
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
            tel,
            name,
            inn,
            mfo,
            bank_card
        } = req.body;

        const model = await PastavchikModel.create({
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
            tel,
            name,
            inn,
            mfo,
            bank_card
        } = req.body;

        const model = await PastavchikModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.tel = tel;
        model.name = name;
        model.inn = inn;
        model.mfo = mfo;
        model.bank_card = bank_card;
        model.save();

        res.send(model);
    };

    delete = async (req, res, next) => {
        const model = await PastavchikModel.findOne({ where : { id: req.params.id } })
        
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
module.exports = new PastavchikController;