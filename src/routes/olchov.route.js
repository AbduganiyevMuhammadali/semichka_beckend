const express = require('express');
const router = express.Router();
const olchovController = require('../controllers/olchov.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { OlchovSchemas } = require('../middleware/validators/olchovValidator.middleware');


router.get('/', awaitHandlerFactory(olchovController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(olchovController.getById));
router.post('/create', joiMiddleware(OlchovSchemas.create), awaitHandlerFactory(olchovController.create));
router.patch('/id/:id',  joiMiddleware(OlchovSchemas.update), awaitHandlerFactory(olchovController.update));
router.delete('/id/:id', awaitHandlerFactory(olchovController.delete));

module.exports = router;