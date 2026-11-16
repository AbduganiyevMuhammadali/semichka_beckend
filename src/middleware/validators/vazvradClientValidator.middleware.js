const Joi = require('joi'); 

exports.VazvradClientSchemas = { 
  create: Joi.object({
    name: Joi.string().required().min(1).max(50),
    date: Joi.date().required(),
    sklad_id: Joi.required(),
    client_id: Joi.required(),
    agent_id: Joi.required(),
    dostavchik_id: Joi.required(),
    valyuta_id: Joi.required(),
    pay_type_id: Joi.required(),
    summa: Joi.number().required(),
    comment: Joi.string().empty(),
    vazvrad_client_item: Joi.array()
  }),

  update: Joi.object({
    name: Joi.string().required().min(1).max(50),
    date: Joi.date().required(),
    sklad_id: Joi.required(),
    client_id: Joi.required(),
    agent_id: Joi.required(),
    dostavchik_id: Joi.required(),
    valyuta_id: Joi.required(),
    pay_type_id: Joi.required(),
    summa: Joi.number().required(),
    comment: Joi.string().empty(),
    vazvrad_client_item: Joi.array()
  }),

};