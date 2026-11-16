const Joi = require('joi'); 

exports.AgentSchemas = { 
  create: Joi.object({
    name: Joi.string().required().min(3).max(50)
  }),

  update: Joi.object({
    name: Joi.string().required().min(3).max(50)
  }),

};