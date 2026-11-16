const express = require('express');
const router = express.Router();
const prixodController = require('../controllers/prixod.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { PrixodSchemas } = require('../middleware/validators/prixodValidator.middleware');


router.get('/', awaitHandlerFactory(prixodController.getAll));
router.get('/id/:id', awaitHandlerFactory(prixodController.getById));
router.post('/create', joiMiddleware(PrixodSchemas.create), awaitHandlerFactory(prixodController.create));
router.patch('/id/:id',  joiMiddleware(PrixodSchemas.update), awaitHandlerFactory(prixodController.update));
router.post('/filter', awaitHandlerFactory(prixodController.getFilter));
router.delete('/id/:id', awaitHandlerFactory(prixodController.delete));

module.exports = router;