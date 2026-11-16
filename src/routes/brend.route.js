const express = require('express');
const router = express.Router();
const brendController = require('../controllers/brend.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { BrendSchemas } = require('../middleware/validators/brendValidator.middleware');


router.get('/', awaitHandlerFactory(brendController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(brendController.getById));
router.post('/create', joiMiddleware(BrendSchemas.create), awaitHandlerFactory(brendController.create));
router.patch('/id/:id',  joiMiddleware(BrendSchemas.update), awaitHandlerFactory(brendController.update));
router.delete('/id/:id', awaitHandlerFactory(brendController.delete));

module.exports = router;