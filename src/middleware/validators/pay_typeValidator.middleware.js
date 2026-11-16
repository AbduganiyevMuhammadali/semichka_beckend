const Joi = require('joi'); 

exports.Pay_typeSchemas = { 
  create: Joi.object({
    name: Joi.string().required().min(3).max(50),
  }),

  update: Joi.object({
    name: Joi.string().required().min(3).max(50)
  }),

};