const Joi = require("joi");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    createReturnCondition:validator({
        body:Joi.object({
            title:Joi.string(),
            description:Joi.string(),
        }),
    }),
    getReturnCondition:validator({
        query:Joi.object({
            id:Joi.string(),
            title:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    updateReturnCondition:validator({
        query:Joi.object({
            id:Joi.string(),
        }),
        body:Joi.object({
            title:Joi.string(),
            description:Joi.string(),
        }),
    }),
    deleteReturnCondition: validator({
        query: Joi.object({
          id: Joi.string(),
      }),
    }),
}