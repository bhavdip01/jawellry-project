const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
  createCoupon: validator({
    body: Joi.object({
      couponName: Joi.string().lowercase().trim().required(),
      couponCode: Joi.string().trim(),
      discountType:Joi.string().trim(),
      amount: Joi.number().required(),
      startDate:Joi.date(),
      endDate:Joi.date(),
      startTime:Joi.string().trim(),
      endTime:Joi.string().trim()
    }),
  }),
  getCoupon: validator({
    query: Joi.object({
      id: Joi.string(),
      couponname: Joi.string(),
      page:Joi.string(),
      limit:Joi.string(),
    }),
  }),
  updateCoupon: validator({
    query: Joi.object({
      id: Joi.string(),
    }),
    body: Joi.object({
      amount: Joi.number(),
      startDate:Joi.date(),
      endDate:Joi.date(),
      startTime:Joi.string().trim(),
      endTime:Joi.string().trim()
    }),
  }),
  deleteCoupon: validator({
    query: Joi.object({
      id: Joi.string(),
    }),
  }),
};

