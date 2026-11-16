const express = require('express');
const router = express.Router();
const product_registerController = require('../controllers/product_register.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { Product_registerSchemas } = require('../middleware/validators/product_registerValidator.middleware');


router.get('/', awaitHandlerFactory(product_registerController.getAll));
router.get('/id/:id',  awaitHandlerFactory(product_registerController.getById));
router.post('/create', joiMiddleware(Product_registerSchemas.create), awaitHandlerFactory(product_registerController.create));
router.patch('/id/:id',  joiMiddleware(Product_registerSchemas.update), awaitHandlerFactory(product_registerController.update));
router.delete('/id/:id', awaitHandlerFactory(product_registerController.delete));

module.exports = router;