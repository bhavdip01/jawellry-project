const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
  create: validator({
    body: Joi.object({
      couponName: Joi.string().lowercase().trim().required(),
      couponCode: Joi.string().trim(),
      discountType:Joi.string().trim(),
      amount: Joi.number().required(),
      startDate:Joi.date().iso(),
      endDate:Joi.date().iso(),
      startTime:Joi.string().trim(),
      endTime:Joi.string().trim()
    }),
  }),
  get: validator({
    query: Joi.object({
      _id: Joi.string(),
      page:Joi.string(),
      limit:Joi.string(),
    }),
  }),
  update: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
    body: Joi.object({
      amount: Joi.number(),
      startDate:Joi.date().iso(),
      endADate:Joi.date().iso(),
      startTime:Joi.string().trim(),
      endTime:Joi.string().trim()
    }),
  }),
  delete: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
  }),
};

