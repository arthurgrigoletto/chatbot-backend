const Joi = require('joi');

module.exports = {
  body: {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string().required(),
  },
};
