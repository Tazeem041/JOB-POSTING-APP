const Joi = require('joi');

exports.validateJobInput = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().required().max(1000),
    requirements: Joi.string().required().max(500),
    salary: Joi.string().required(),
    location: Joi.string().required()
  });

  return schema.validate(data);
};

exports.validateUserInput = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  });

  return schema.validate(data);
};