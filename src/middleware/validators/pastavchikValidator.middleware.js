const Joi = require('joi'); 

exports.PastavchikSchemas = { 
  create: Joi.object({
    tel: Joi.string().min(3).max(14),
    name: Joi.string().required().min(3).max(50),
    inn: Joi.string().empty(''),
    mfo: Joi.string().empty(''),
    bank_card: Joi.string().empty(''),
  }),

  update: Joi.object({
    tel: Joi.string().min(3).max(14),
    name: Joi.string().required().min(3).max(50),
    inn: Joi.string().empty(''),
    mfo: Joi.string().empty(''),  
    bank_card: Joi.string().empty(''),
  }),

};