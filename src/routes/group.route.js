const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { GroupSchemas } = require('../middleware/validators/groupValidator.middleware');


router.get('/', awaitHandlerFactory(groupController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(groupController.getById));
router.post('/create', joiMiddleware(GroupSchemas.create), awaitHandlerFactory(groupController.create));
router.patch('/id/:id',  joiMiddleware(GroupSchemas.update), awaitHandlerFactory(groupController.update));
router.delete('/id/:id', awaitHandlerFactory(groupController.delete));

module.exports = router;