const HarakterModel = require('../models/harakter.model');
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
class HarakterController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await HarakterModel.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const user = await HarakterModel.findOne({
            where:{ id: req.params.id }
        });
        console.log("aaaa",user , req.params.id)

        if (!user) {
            throw new HttpException(404, req.mf('data not found'));
        }
        res.send({
            data:user
        });
    };

    create = async (req, res, next) => {
        this.checkValidation(req);

        let { 
            name
        } = req.body;

        const model = await HarakterModel.create({
            name
        });

        if (!model) {
            throw new HttpException(500, req.mf('Something went wrong'));
        }

        res.status(201).send(model);
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        let { 
            name,
        } = req.body;

        const model = await HarakterModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.name = name;
        model.save();
        res.send(model);
    };

    delete = async (req, res, next) => {
        const model = await HarakterModel.findOne({ where : { id: req.params.id } })
        
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
module.exports = new HarakterController;