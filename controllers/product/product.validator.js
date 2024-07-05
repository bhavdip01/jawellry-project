const { query } = require("express");
const Joi = require("joi");
// const { celebrate, errors, Segments } = require('celebrate');
const validator = require("../../middleware/validator").validator;

module.exports = {
  create: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim().required(),
      description: Joi.string().trim(),
      price: Joi.number().required(),
      categoryIds: Joi.array().items(Joi.string()).required(),  
      subCategoryIds: Joi.array().items(Joi.string()).required(),
      shippingPolicyId: Joi.string().required(),
      privacyAndPolicyId: Joi.string().required(),
      termAndConditionId: Joi.string().required(),
      sku: Joi.string(),
      personalization: Joi.string(),
      subTitle: Joi.string(),
      tags: Joi.string(),
      quantity: Joi.number(),
      isEngraving: Joi.boolean(),
    }),
  }),
  get: validator({
    query: Joi.object({
      search: Joi.string().lowercase().trim(),
      _id: Joi.string(),
      categoryIds: Joi.string(),
      subCategoryIds: Joi.string(),
      shippingPolicyId: Joi.string(),
      startPrice: Joi.string(),
      endPrice: Joi.string(),
      page:Joi.string(),
      limit:Joi.string(),
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
  addProductImage: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim(),
    })
  }),
  delete: validator({
    query: Joi.object({
      productId: Joi.string(),
      _id: Joi.string(),
    }),
  }),
  removeImage: validator({
    query: Joi.object({
      _id: Joi.string(),
    }),
  }),
  getProduct: validator({
    query: Joi.object({
      productId: Joi.string(),
    }),
  })
};
