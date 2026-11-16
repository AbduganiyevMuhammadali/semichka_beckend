const Joi = require('joi'); 

exports.Kassa_registerSchemas = { 
  create: Joi.object({
    datetime: Joi.required(),
    doc_id: Joi.required(),
    doc_type:Joi.required(),
    doc_id: Joi.required(),
    pay_type: Joi.required(),
    pay_type_id: Joi.required(),
    summa: Joi.required(),
    record_type: Joi.required(),
    sklad_id: Joi.required(),
  }), 
  update: Joi.object({
    datetime: Joi.required(),
    doc_id: Joi.required(),
    doc_type:Joi.required(),
    doc_id: Joi.required(),
    pay_type: Joi.required(),
    pay_type_id: Joi.required(),
    summa: Joi.required(),
    record_type: Joi.required(),
    sklad_id: Joi.required(),
  }),
};