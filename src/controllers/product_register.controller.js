const Product_registerModel = require('../models/product_register.model');
const ProductModel = require('../models/product.model');
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
class Product_registerController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await Product_registerModel.findAll({
            include:[
                {model: ProductModel , as : 'product'  },
                {model: SeriyaModel , as : 'seriya', required: false  }
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const user = await Product_registerModel.findOne({
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
            seriya_id,
            count,
            doc_id,
            type,
            doc_type        
        } = req.body;

        const model = await Product_registerModel.create({
            product_id,
            seriya_id,
            count,
            doc_id,
            type,
            doc_type 
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
            seriya_id,
            count,
            doc_id,
            type,
            doc_type 
        } = req.body;

        const model = await Product_registerModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.product_id = product_id;
        model.seriya_id = seriya_id;
        model.count = count;
        model.doc_id = doc_id;
        model.type = type;
        model.doc_type = doc_type;
        model.save();

        res.send(model);
    };

    delete = async (req, res, next) => {
        const model = await Product_registerModel.findOne({ where : { id: req.params.id } })
        
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
module.exports = new Product_registerController;