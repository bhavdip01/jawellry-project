const Joi = require("joi");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    createTermAndCondition:validator({
        body:Joi.object({
            name:Joi.string(),
            description:Joi.string(),
        }),
    }),
    getTermAndCondition:validator({
        query:Joi.object({
            id:Joi.string(),
            name:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    updateTermAndCondition:validator({
        query:Joi.object({
            id:Joi.string(),
        }),
        body:Joi.object({
            name:Joi.string(),
            description:Joi.string(),
        }),
    }),
    deleteTermAndCondition: validator({
        query: Joi.object({
          id: Joi.string(),
      }),
    }),
}