const { query } = require("express");
const Joi = require("joi");
const { deleteBanner, updateBanner } = require("./banner.controller");
const { validate } = require("../../models/banner.model");
// const { celebrate, errors, Segments } = require('celebrate');
const validator = require("../../middleware/validator").validator;

module.exports = {
  create: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim().required(),
      description: Joi.string().trim(),
      isMain: Joi.boolean(),
      isDeleted: Joi.boolean(),
      imageId: Joi.array().items(Joi.string()).required(),
    }),
  }),
  getBanner: validator({
    query:Joi.object({
        id:Joi.string(),
        name:Joi.string(),
        ismain:Joi.boolean(),
        page:Joi.string(),
        limit:Joi.string(),
    }),
  }),
  updateBanner:validator({
    query:Joi.object({
        id:Joi.string(),
    }),
    body:Joi.object({
        name: Joi.string().lowercase().trim().required(),
        description: Joi.string().trim(),
        isMain: Joi.boolean(),
    }),
  }),
  deleteBanner: validator({
    query: Joi.object({
      id: Joi.string().required(),
    }),
  }),
};
