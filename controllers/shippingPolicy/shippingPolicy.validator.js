const Joi = require("joi");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    createShippingPolicy:validator({
        body:Joi.object({
            title:Joi.string(),
            manufacturDay:Joi.number(),
            countryShippingPrice:Joi.array(),
        }),
    }),
    getShippingpolicy:validator({
        query:Joi.object({
            id:Joi.string(),
            title:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    updateShippingpolicy:validator({
        query:Joi.object({
            id:Joi.string(),
        }),
        body:Joi.object({
            title:Joi.string(),
            manufacturDay:Joi.number(),
            countryShippingPrice:Joi.array(),
        }),
    }),
    deleteShippingPolicy: validator({
        query: Joi.object({
          id: Joi.string(),
      }),
    }),
}