const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
    createFeedBack: validator({
    body: Joi.object({
      userId: Joi.string(),
      productId: Joi.string(),
      feedbackPoint: Joi.number(),
      description: Joi.string()
    }),
  }),
  getFeedBack: validator({
    query: Joi.object({
      userid: Joi.string(),
      productid: Joi.string(),
      feedbackpoint: Joi.number(),
      ismain: Joi.boolean(),
      isshow: Joi.boolean(),
      page:Joi.string(),
      limit:Joi.string(),
    }),
  }),
  updateFeedBack: validator({
    query: Joi.object({
      id: Joi.string(),
    }),
    body: Joi.object({
        userId: Joi.string(),
        productId: Joi.string(),
        feedbackPoint: Joi.number(),
        description: Joi.string()
    }),
  }),
  deleteFeedBack: validator({
    query: Joi.object({
      id: Joi.string(),
    }),
  }),
};

