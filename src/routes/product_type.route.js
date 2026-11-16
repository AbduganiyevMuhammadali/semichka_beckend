const express = require('express');
const router = express.Router();
const ProductTypeController = require('../controllers/product_type.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { ProductTypeSchemas } = require('../middleware/validators/product_typeValidator.middleware');


router.get('/', awaitHandlerFactory(ProductTypeController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(ProductTypeController.getById));
router.post('/create', joiMiddleware(ProductTypeSchemas.create), awaitHandlerFactory(ProductTypeController.create));
router.patch('/id/:id',  joiMiddleware(ProductTypeSchemas.update), awaitHandlerFactory(ProductTypeController.update));
router.delete('/id/:id', awaitHandlerFactory(ProductTypeController.delete));

module.exports = router;