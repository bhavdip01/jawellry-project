const Joi = require("joi");
const { create, update } = require("../addToCart/addToCart.validator");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    addAddress:validator({
        body:Joi.object({
            address:Joi.string(),
            addressType:Joi.string(),
            city:Joi.string(),
            state:Joi.string(),
            country:Joi.string(),
            pinCode:Joi.number().required(),
            userId: Joi.string(),
        }),
    }),
    getAddress:validator({
        query:Joi.object({
            user_id:Joi.string(),
            addresstype:Joi.string(),
            city:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    updateAddress:validator({
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
    deleteAddress: validator({
        query: Joi.object({
          id: Joi.string(),
      }),
    }),
}