const Joi = require('joi');

module.exports = {
  body: {
    telefone: Joi.string().required(),
    password: Joi.string().required(),
  },
};
