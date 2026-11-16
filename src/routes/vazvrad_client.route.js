const express = require('express');
const router = express.Router();
const vazvrad_clientController = require('../controllers/vazvrad_client.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { VazvradClientSchemas } = require('../middleware/validators/vazvradClientValidator.middleware');


router.get('/', awaitHandlerFactory(vazvrad_clientController.getAll));
router.get('/id/:id', awaitHandlerFactory(vazvrad_clientController.getById));
router.post('/create', joiMiddleware(VazvradClientSchemas.create), awaitHandlerFactory(vazvrad_clientController.create));
router.patch('/id/:id',  joiMiddleware(VazvradClientSchemas.update), awaitHandlerFactory(vazvrad_clientController.update));
router.post('/filter', awaitHandlerFactory(vazvrad_clientController.getFilter));
router.delete('/id/:id', awaitHandlerFactory(vazvrad_clientController.delete));

module.exports = router;