const express = require('express');
const router = express.Router();
const kassa_registerController = require('../controllers/kassa_register.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { Kassa_registerSchemas } = require('../middleware/validators/kassa_registerValidator.middleware');


router.get('/', awaitHandlerFactory(kassa_registerController.getAll));
router.get('/id/:id',  awaitHandlerFactory(kassa_registerController.getById));
router.post('/create', joiMiddleware(Kassa_registerSchemas.create), awaitHandlerFactory(kassa_registerController.create));
router.patch('/id/:id',  joiMiddleware(Kassa_registerSchemas.update), awaitHandlerFactory(kassa_registerController.update));
router.delete('/id/:id', awaitHandlerFactory(kassa_registerController.delete));

module.exports = router;