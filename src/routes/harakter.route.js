const express = require('express');
const router = express.Router();
const harakterController = require('../controllers/harakter.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { HarakterSchemas } = require('../middleware/validators/harakterValidator.middleware');

router.get('/', awaitHandlerFactory(harakterController.getAll));
router.get('/id/:id',auth(), awaitHandlerFactory(harakterController.getById));
router.post('/create', joiMiddleware(HarakterSchemas.create), awaitHandlerFactory(harakterController.create));
router.patch('/id/:id',  joiMiddleware(HarakterSchemas.update), awaitHandlerFactory(harakterController.update));
router.delete('/id/:id', awaitHandlerFactory(harakterController.delete));

module.exports = router;