const Joi = require('joi'); 

exports.ZakazSchemas = { 
  create: Joi.object({
    name: Joi.string().required().min(3).max(50),
    date: Joi.date().required(),
    client_id: Joi.required(),
    agent_id: Joi.required(),
    sklad_id: Joi.required(),
    valyuta_id: Joi.required(),
    pay_type_id: Joi.required(),
    jammi_summa: Joi.number().required(),
    jammi_skidka: Joi.number().required(),
    zakaz_item: Joi.array()
  }),

  update: Joi.object({
    name: Joi.string().required().min(3).max(50),
    date: Joi.date().required(),
    client_id: Joi.required(),
    agent_id: Joi.required(),
    sklad_id: Joi.required(),
    valyuta_id: Joi.required(),
    pay_type_id: Joi.required(),
    jammi_summa: Joi.number().required(),
    jammi_skidka: Joi.number().required(),
    zakaz_item: Joi.array()
  }),

};