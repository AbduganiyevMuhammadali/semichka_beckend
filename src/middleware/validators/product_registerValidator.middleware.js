const Joi = require('joi'); 

exports.Product_registerSchemas = { 
  create: Joi.object({
    product_id: Joi.required(),
    seriya_id: Joi.required(),
    count:Joi.required(),
    doc_id: Joi.required(),
    type: Joi.required(),
    doc_type: Joi.required(),
  }),

  update: Joi.object({
    product_id: Joi.required(),
    seriya_id: Joi.required(),
    count:Joi.required(),
    doc_id: Joi.required(),
    type: Joi.required(),
    doc_type: Joi.required(),
  }),
};