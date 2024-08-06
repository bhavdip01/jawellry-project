const { query } = require("express");
const Joi = require("joi");
const { deleteBanner, updateBanner } = require("./banner.controller");
const { validate } = require("../../models/banner.model");
// const { celebrate, errors, Segments } = require('celebrate');
const validator = require("../../middleware/validator").validator;

module.exports = {
  createBanner: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim(),
      description: Joi.string().trim(),
      isMain: Joi.boolean(),
      isDeleted: Joi.boolean(),
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
        name: Joi.string().lowercase().trim(),
        description: Joi.string().trim(),
        isMain: Joi.boolean(),
    }),
  }),
  deleteBanner: validator({
    query: Joi.object({
      bannerId: Joi.string()
    }),
  }),
  addBanner: validator({
    body: Joi.object({
      name: Joi.string().lowercase().trim(),
    }),
  }),
  removeBannerimage: validator({
    query: Joi.object({
      _id: Joi.string().required(),
    }),
  })
};
