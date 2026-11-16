const Joi = require('joi'); 

exports.PrixodSchemas = { 
  create: Joi.object({
    name: Joi.string().required().min(3).max(50),
    date: Joi.required(),
    pastavchik_id: Joi.required(),
    sklad_id: Joi.required(),
    valyuta_id: Joi.required(),
    pay_type_id: Joi.required(),
    jammi_summa: Joi.number().required(),
    jammi_skidka: Joi.number().required(),
    rasxod: Joi.number().empty(),
    prixod_item: Joi.array()
  }),

  update: Joi.object({
    name: Joi.string().required().min(3).max(50),
    date: Joi.required(),
    pastavchik_id: Joi.required(),
    sklad_id: Joi.required(),
    pay_type_id: Joi.required(),
    valyuta_id: Joi.required(),
    jammi_summa: Joi.number().required(),
    jammi_skidka: Joi.number().required(),
    rasxod: Joi.number().empty(),
    prixod_item: Joi.array()
  }),

};