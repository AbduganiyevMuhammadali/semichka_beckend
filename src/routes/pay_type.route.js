const express = require('express');
const router = express.Router();
const pay_typeController = require('../controllers/pay_type.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { Pay_typeSchemas } = require('../middleware/validators/pay_typeValidator.middleware');


router.get('/', awaitHandlerFactory(pay_typeController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(pay_typeController.getById));
router.post('/create', joiMiddleware(Pay_typeSchemas.create), awaitHandlerFactory(pay_typeController.create));
router.patch('/id/:id',  joiMiddleware(Pay_typeSchemas.update), awaitHandlerFactory(pay_typeController.update));
router.delete('/id/:id', awaitHandlerFactory(pay_typeController.delete));

module.exports = router;