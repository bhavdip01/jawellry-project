const Joi = require("joi");
const { create, update } = require("../addToCart/addToCart.validator");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    create:validator({
        body:Joi.object({
            address:Joi.string(),
            addressType:Joi.string(),
            city:Joi.string(),
            state:Joi.string(),
            country:Joi.string(),
            pinCode:Joi.number().required(),
            userId: Joi.array().items(Joi.string()).required()
        }),
    }),
    get:validator({
        query:Joi.object({
            user_id:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    update:validator({
        query:Joi.object({
            id:Joi.string(),
        }),
        body:Joi.object({
            address:Joi.string(),
            addressType:Joi.string(),
            city:Joi.string(),
            state:Joi.string(),
            country:Joi.string(),
            pinCode:Joi.number().required()
        }),
    }),
    delete: validator({
        query: Joi.object({
          id: Joi.string(),
      }),
    }),
}