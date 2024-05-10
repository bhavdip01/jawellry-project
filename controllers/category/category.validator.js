const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
  create: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim().required(),
      description: Joi.string().trim(),
    }),
  }),
  get: validator({
    query: Joi.object({
      name: Joi.string().lowercase().trim(),
      _id: Joi.string(),
    }),
  }),
  update: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
    body: Joi.object({
      name: Joi.string().lowercase().trim(),
      description: Joi.string().trim(),
      isMain: Joi.boolean(),
    }),
  }),
  delete: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
  }),
};
