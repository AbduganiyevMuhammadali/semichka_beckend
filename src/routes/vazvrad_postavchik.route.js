const express = require('express');
const router = express.Router();
const vazvrad_postavchikController = require('../controllers/vazvrad_postavchik.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { VazvradPostavchikSchemas } = require('../middleware/validators/vazvradPostavchikValidator.middleware');


router.get('/', awaitHandlerFactory(vazvrad_postavchikController.getAll));
router.get('/id/:id', awaitHandlerFactory(vazvrad_postavchikController.getById));
router.post('/create', joiMiddleware(VazvradPostavchikSchemas.create), awaitHandlerFactory(vazvrad_postavchikController.create));
router.patch('/id/:id',  joiMiddleware(VazvradPostavchikSchemas.update), awaitHandlerFactory(vazvrad_postavchikController.update));
router.post('/filter', awaitHandlerFactory(vazvrad_postavchikController.getFilter));
router.delete('/id/:id', awaitHandlerFactory(vazvrad_postavchikController.delete));

module.exports = router;