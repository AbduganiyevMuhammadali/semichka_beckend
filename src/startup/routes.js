const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser')
const i18n = require('./i18n.config')
const errorMiddleware = require('../middleware/error.middleware');
const userRouter = require('../routes/user.route');
const ClientRouter = require('../routes/client.route');
const ProductRouter = require('../routes/product.route');
const ZakazRouter = require('../routes/zakaz.route');
const PrixodRouter = require('../routes/prixod.route');
const SkladRouter = require('../routes/sklad.route');
const AgentRouter = require('../routes/agent.route');
const ValyutaRouter = require('../routes/valyuta.route');
const OlchovRouter = require('../routes/olchov.route');
const BrendRouter = require('../routes/brend.route');
const GroupRouter = require('../routes/group.route');
const SeriyaRouter = require('../routes/seriya.route');
const ProductRegisterRouter = require('../routes/product_register.route');
const PastavchikRouter = require('../routes/pastavchik.route');
const NalechniyRouter = require('../routes/nalechniy.route');
const ProductTypeRouter = require('../routes/product_type.route');
const HarakterRouter = require('../routes/harakter.route');
const PayTypeRouter = require('../routes/pay_type.route');
const DostavchikRouter = require('../routes/dostavchik.route');
const HisobotRouter = require('../routes/hisobot.route');
const VazvradClientRouter = require('../routes/vazvrad_client.route');
const HisobotKunlikRouter = require('../routes/hisobot_kunlik.route');
const VazvradPostavchikRouter = require('../routes/vazvrad_postavchik.route');

const HttpException = require('../utils/HttpException.utils');

module.exports = async function(app){
     // parse requests of content-type: application/json
        // parses incoming requests with JSON payloads
        app.use(express.json());
        // enabling cors for all requests by using cors middleware
        app.use(cors());
        // Enable pre-flight
        app.options("*", cors());
        app.use(express.static(path.join(__dirname, '../../dist')));
        // i18n.setLocale('uz');
        app.use(cookieParser());
        app.use(i18n.init)

        app.use(`/api/v1/users`, userRouter);
        app.use(`/api/v1/client`, ClientRouter);
        app.use(`/api/v1/product`, ProductRouter);
        app.use(`/api/v1/zakaz`, ZakazRouter);
        app.use(`/api/v1/prixod`,PrixodRouter);
        app.use(`/api/v1/sklad`, SkladRouter);
        app.use(`/api/v1/agent`, AgentRouter);
        app.use(`/api/v1/valyuta`, ValyutaRouter);
        app.use(`/api/v1/olchov`, OlchovRouter);
        app.use(`/api/v1/group`, GroupRouter);
        app.use(`/api/v1/brend`, BrendRouter);
        app.use(`/api/v1/seriya`,SeriyaRouter);
        app.use(`/api/v1/pastavchik`, PastavchikRouter);
        app.use(`/api/v1/product_register`, ProductRegisterRouter); 
        app.use(`/api/v1/nalechniy`, NalechniyRouter);
        app.use(`/api/v1/product_type`, ProductTypeRouter);
        app.use(`/api/v1/harakter`, HarakterRouter);
        app.use(`/api/v1/pay_type`, PayTypeRouter);
        app.use(`/api/v1/hisobot`, HisobotRouter);
        app.use(`/api/v1/dostavchik`, DostavchikRouter);
        app.use(`/api/v1/vazvrad_client`, VazvradClientRouter);
        app.use(`/api/v1/vazvrad_postavchik`, VazvradPostavchikRouter );
        app.use(`/api/v1/hisobot_kunlik`, HisobotKunlikRouter);
        app.use(`/api/v1/image`, express.static('uploads/product'));
        // 404 error
        app.all('*', (req, res, next) => {
            const err = new HttpException(404, req.mf('Endpoint not found'));
            next(err);
        });

        app.use(errorMiddleware);
}