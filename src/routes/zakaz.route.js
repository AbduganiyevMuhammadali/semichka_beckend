const express = require('express');
const router = express.Router();
const zakazController = require('../controllers/zakaz.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { ZakazSchemas } = require('../middleware/validators/zakazValidator.middleware');

router.get('/', awaitHandlerFactory(zakazController.getAll));
router.get('/id/:id', awaitHandlerFactory(zakazController.getById));
router.post('/create', joiMiddleware(ZakazSchemas.create), awaitHandlerFactory(zakazController.create));
router.patch('/id/:id',  joiMiddleware(ZakazSchemas.update), awaitHandlerFactory(zakazController.update));
router.delete('/id/:id', awaitHandlerFactory(zakazController.delete));
router.post('/filter', awaitHandlerFactory(zakazController.getFilter));

module.exports = router;