const express = require('express');
const router = express.Router();
const seriyaController = require('../controllers/seriya.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { SeriyaSchemas } = require('../middleware/validators/seriyaValidator.middleware');


router.get('/', awaitHandlerFactory(seriyaController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(seriyaController.getById));
router.post('/create', joiMiddleware(SeriyaSchemas.create), awaitHandlerFactory(seriyaController.create));
router.patch('/id/:id',  joiMiddleware(SeriyaSchemas.update), awaitHandlerFactory(seriyaController.update));
router.delete('/id/:id', awaitHandlerFactory(seriyaController.delete));

module.exports = router;