const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { AgentSchemas } = require('../middleware/validators/agentValidator.middleware');


router.get('/', awaitHandlerFactory(agentController.getAll));
router.get('/id/:id', awaitHandlerFactory(agentController.getById));
router.post('/', joiMiddleware(AgentSchemas.create), awaitHandlerFactory(agentController.create));
router.patch('/id/:id',  joiMiddleware(AgentSchemas.update), awaitHandlerFactory(agentController.update));
router.delete('/id/:id', awaitHandlerFactory(agentController.delete));

module.exports = router;