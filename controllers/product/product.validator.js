const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
  create: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim().required(),
      description: Joi.string().trim(),
      price: Joi.number().required(),
      categoryIds: Joi.array().items(Joi.string()).required(),
      subCategoryIds: Joi.array().items(Joi.string()).required(),
      sku: Joi.string(),
      personalization: Joi.string(),
      subTitle: Joi.string(),
      tags: Joi.string(),
      quantity: Joi.number(),
    }),
  }),
  get: validator({
    query: Joi.object({
      search: Joi.string().lowercase().trim(),
      _id: Joi.string(),
      categoryId: Joi.string(),
      subCategoryId: Joi.string(),
      startPrice: Joi.string(),
      endPrice: Joi.string(),
      page:Joi.string(),
      pageSize:Joi.string(),
    }),
  }),
  update: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
    body: Joi.object({
      name: Joi.string().lowercase().trim(),
      description: Joi.string().trim(),
      price: Joi.number(),
      categoryId: Joi.array().items(Joi.string()),
      subCategoryIds: Joi.array().items(Joi.string()),
      sku: Joi.string(),
      personalization: Joi.string(),
      subTitle: Joi.string(),
      tags: Joi.string(),
      quantity: Joi.number(),
    }),
  }),
  delete: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
  }),
};
