const Joi = require('joi'); 

exports.BrendSchemas = { 
  create: Joi.object({
    name: Joi.string().required().min(1).max(50),
  }),

  update: Joi.object({
    name: Joi.string().required().min(1).max(50)
  }),

};