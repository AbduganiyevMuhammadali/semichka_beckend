const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const UniqueStringGenerator = require('unique-string-generator');
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { ProductSchemas } = require('../middleware/validators/productValidator.middleware');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
           cb(null, 'uploads/product');
      },
      filename: function (req, file, cb) {
          const time = Math.floor(new Date().getTime());
          req.body.img = UniqueStringGenerator.UniqueString() + path.extname(file.originalname);
          console.log('leng ', req.body.img);
          
          cb(null, req.body.img);
      }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
        //return cb(new Error('Only images are allowed'))
    }
}

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('img');


router.get('/', awaitHandlerFactory(productController.getAll));
router.get('/tovarAll', awaitHandlerFactory(productController.tovarAll));
router.get('/id/:id',  awaitHandlerFactory(productController.getById));
router.post('/',  upload, awaitHandlerFactory(productController.create));
router.patch('/id/:id',  joiMiddleware(ProductSchemas.update), upload, awaitHandlerFactory(productController.update));
router.delete('/id/:id', awaitHandlerFactory(productController.delete));

module.exports = router;
