const express = require('express');
const router = express.Router();
const skladController = require('../controllers/sklad.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { SkladSchemas } = require('../middleware/validators/skladValidator.middleware');


router.get('/', awaitHandlerFactory(skladController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(skladController.getById));
router.post('/create', joiMiddleware(SkladSchemas.create), awaitHandlerFactory(skladController.create));
router.patch('/id/:id',  joiMiddleware(SkladSchemas.update), awaitHandlerFactory(skladController.update));
router.delete('/id/:id', awaitHandlerFactory(skladController.delete));

module.exports = router;