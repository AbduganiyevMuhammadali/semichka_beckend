const express = require('express');
const router = express.Router();
const pastavchikController = require('../controllers/pastavchik.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { PastavchikSchemas } = require('../middleware/validators/pastavchikValidator.middleware');


router.get('/', awaitHandlerFactory(pastavchikController.getAll));
router.get('/id/:id', awaitHandlerFactory(pastavchikController.getById));
router.post('/create', joiMiddleware(PastavchikSchemas.create), awaitHandlerFactory(pastavchikController.create));
router.patch('/id/:id',  joiMiddleware(PastavchikSchemas.update), awaitHandlerFactory(pastavchikController.update));
router.delete('/id/:id', awaitHandlerFactory(pastavchikController.delete));

module.exports = router;