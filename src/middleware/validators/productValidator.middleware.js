const Joi = require('joi'); 

exports.ProductSchemas = { 
  create: Joi.object({
    name: Joi.string().required().min(3).max(50),
    olchov_id: Joi.required(),
    brend_id: Joi.required(),
    group_id: Joi.required(),
    shtrix: Joi.string().required().min(3).max(50),
    img: Joi.string().required().min(2).max(150).empty(''),
    img2: Joi.string().required().min(2).max(50),
    kg: Joi.number().empty(''),
    minimal: Joi.number().empty(''),
  }),

  update: Joi.object({
    name: Joi.string().required().min(3).max(50),
    olchov_id: Joi.required(),
    brend_id: Joi.required(),
    group_id: Joi.required(),
    shtrix: Joi.string().required().min(3).max(50),
    img: Joi.string().required().min(3).max(150).empty(''),
    img2: Joi.string().min(2).max(50),
    kg: Joi.number().empty(''),
    minimal: Joi.number().empty(''),
  }),
};