const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { ClientSchemas } = require('../middleware/validators/clientValidator.middleware');


router.get('/', awaitHandlerFactory(clientController.getAll));
router.get('/id/:id', awaitHandlerFactory(clientController.getById));
router.post('/', joiMiddleware(ClientSchemas.create), awaitHandlerFactory(clientController.create));
router.patch('/id/:id',  joiMiddleware(ClientSchemas.update), awaitHandlerFactory(clientController.update));
router.delete('/id/:id', awaitHandlerFactory(clientController.delete));

module.exports = router;