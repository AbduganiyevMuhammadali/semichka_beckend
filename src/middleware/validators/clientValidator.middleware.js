const Joi = require('joi'); 

exports.ClientSchemas = { 
  create: Joi.object({
    firma_name: Joi.string().required().min(3).max(50),
    lat: Joi.string().required().min(3).max(50),
    long: Joi.string().required().min(3).max(50),
    tel: Joi.string().min(3).max(14),
    name: Joi.string().required().min(3).max(50),
    inn: Joi.string().min(3).max(50).empty(''),
    mfo: Joi.string().min(3).max(50).empty(''),
    bank_card: Joi.string().min(3).max(50).empty(''),
  }),

  update: Joi.object({
    firma_name: Joi.string().required().min(3).max(50),
    lat: Joi.string().required().min(3).max(50),
    long: Joi.string().required().min(3).max(50),
    tel: Joi.string().min(3).max(14),
    name: Joi.string().required().min(3).max(50),
    inn: Joi.string().min(3).max(50),
    mfo: Joi.string().min(3).max(50),
    bank_card: Joi.string().min(3).max(50),
  }),

};