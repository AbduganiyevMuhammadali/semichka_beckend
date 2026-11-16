const express = require('express');
const router = express.Router();
const dostavchikController = require('../controllers/dostavchik.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { DostavchikSchemas } = require('../middleware/validators/dostavchikValidator.middleware');


router.get('/', awaitHandlerFactory(dostavchikController.getAll));
router.get('/id/:id', awaitHandlerFactory(dostavchikController.getById));
router.post('/', joiMiddleware(DostavchikSchemas.create), awaitHandlerFactory(dostavchikController.create));
router.patch('/id/:id',  joiMiddleware(DostavchikSchemas.update), awaitHandlerFactory(dostavchikController.update));
router.delete('/id/:id', awaitHandlerFactory(dostavchikController.delete));

module.exports = router;