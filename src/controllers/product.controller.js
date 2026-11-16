const ProductModel = require('../models/product.model');
const GroupModel = require('../models/group.model');
const BrendModel = require('../models/brend.model');
const OlchovModel = require('../models/olchov.model');
const ProductTypeModel = require('../models/product_type.model');
const HarakterModel = require('../models/harakter.model');

const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');
const sequelize = require('../db/db-sequelize')
const ProductRegisterModel = require('../models/product_register.model');
/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class ProductController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await ProductModel.findAll({
            include:[
                {model: BrendModel , as : 'brend'  },
                {model: GroupModel , as : 'group', required: false  },
                {model: OlchovModel , as : 'olchov', required: false  },
                {model: ProductTypeModel , as : 'product_type', required: false  },
                {model: HarakterModel , as : 'harakter', required: false  }
            ],
            order: [
                ['id', 'ASC']
            ]
        });
        res.send(modelList);
    };
    tovarAll = async (req, res, next) => {
            const sql = `SELECT p.id, p.name, COALESCE(pr1.count, 0) AS count, z.price
            FROM product AS p
            LEFT JOIN zakaz_item z ON p.id = z.tovar
            LEFT JOIN (
                SELECT pr.product_id, SUM(CASE WHEN pr.type = true THEN pr.count ELSE (-1 * pr.count) END) AS count
                FROM product_register pr
                GROUP BY pr.product_id
            ) AS pr1 ON p.id = pr1.product_id
            GROUP BY p.id, p.name, z.price`
            const result = await sequelize.query(sql, {
                replacements: {},
                type: sequelize.QueryTypes.SELECT,
                raw: true
            })
        res.send(result)
    };
    getById = async (req, res, next) => {
        const user = await ProductModel.findOne({
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
            name,
            olchov_id,
            group_id,
            brend_id,
            product_type_id,
            harakter_id,
            shtrix,
            img,
            img2,
            minimal,
            kg
        } = req.body;

        const model = await ProductModel.create({
            name,
            olchov_id,
            brend_id,
            group_id,
            product_type_id,
            harakter_id,
            shtrix,
            img, 
            img2,
            minimal,
            kg
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
            olchov_id,
            brend_id,
            group_id,
            product_type_id,
            harakter_id,
            shtrix,
            img,
            img2,
            minimal,
            kg
        } = req.body;

        const model = await ProductModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        
        model.name = name;
        model.brend_id = brend_id;
        model.olchov_id = olchov_id;
        model.group_id = group_id;
        model.product_type_id = product_type_id;
        model.harakter_id = harakter_id;
        model.shtrix = shtrix;
        model.img = img;
        model.img2 = img2,
        model.minimal = minimal ,
        model.kg = kg
        model.save();

        res.send(model);
    };

    delete = async (req, res, next) => {
        const model = await ProductModel.findOne({ where : { id: req.params.id } })
        
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
module.exports = new ProductController;