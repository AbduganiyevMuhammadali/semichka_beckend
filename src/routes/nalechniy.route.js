const express = require('express');
const router = express.Router();
const nalechniyController = require('../controllers/nalechniy.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { NalechniySchemas } = require('../middleware/validators/nalechniyValidator.middleware');


router.get('/', awaitHandlerFactory(nalechniyController.getAll));
router.post('/filter', awaitHandlerFactory(nalechniyController.getFilter));
router.get('/id/:id', awaitHandlerFactory(nalechniyController.getById));
router.post('/create', joiMiddleware(NalechniySchemas.create), awaitHandlerFactory(nalechniyController.create));
router.patch('/id/:id',  joiMiddleware(NalechniySchemas.update), awaitHandlerFactory(nalechniyController.update));
router.delete('/id/:id', awaitHandlerFactory(nalechniyController.delete));
router.post('/filter', awaitHandlerFactory(nalechniyController.getFilter));

module.exports = router;