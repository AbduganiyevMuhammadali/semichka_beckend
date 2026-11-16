const Joi = require('joi'); 

exports.SeriyaSchemas = { 
  create: Joi.object({
    datetime: Joi.required(),
    product_id: Joi.required(),
    narxi: Joi.number().required(),
  }),

  update: Joi.object({
    datetime: Joi.required(),
    product_id: Joi.required(),
    narxi: Joi.number().required(),
  }),

};