const SeriyaModel = require('../models/seriya.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const moment = require('moment');
const ProductModel = require('../models/product.model.js');
/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class SeriyaController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await SeriyaModel.findAll({
            include:[
                {model: ProductModel , as : 'product'  },
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const user = await SeriyaModel.findOne({
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
            product_id,
            narxi,
            datetime
        } = req.body;

        const model = await SeriyaModel.create({
            product_id,
            narxi,
            datetime
        });

        if (!model) {
            throw new HttpException(500, req.mf('Something went wrong'));
        }

        res.status(201).send(model);
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        let { 
            product_id,
            narxi,
            datetime
        } = req.body;

        const model = await SeriyaModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.product_id = product_id;
        model.narxi = narxi;
        model.datetime = datetime;
        model.save();
        res.send(model);
    };

    delete = async (req, res, next) => {
        const model = await SeriyaModel.findOne({ where : { id: req.params.id } })
        
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
module.exports = new SeriyaController;