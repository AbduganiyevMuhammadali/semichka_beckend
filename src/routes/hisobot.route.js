const express = require('express');
const router = express.Router();
const hisobotController = require('../controllers/hisobot.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');

router.post('/kassa', awaitHandlerFactory(hisobotController.kassaSverka));
router.get('/product', awaitHandlerFactory(hisobotController.productRegister));

module.exports = router;