const express = require('express');
const router = express.Router();
const valyutaController = require('../controllers/valyuta.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { ValyutaSchemas } = require('../middleware/validators/valyutaValidator.middleware');


router.get('/', awaitHandlerFactory(valyutaController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(valyutaController.getById));
router.post('/create', joiMiddleware(ValyutaSchemas.create), awaitHandlerFactory(valyutaController.create));
router.patch('/id/:id',  joiMiddleware(ValyutaSchemas.update), awaitHandlerFactory(valyutaController.update));
router.delete('/id/:id', awaitHandlerFactory(valyutaController.delete));

module.exports = router;