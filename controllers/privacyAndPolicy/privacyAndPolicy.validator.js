const Joi = require("joi");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    createPrivacyAndPolicy:validator({
        body:Joi.object({
            name:Joi.string(),
            description:Joi.string(),
        }),
    }),
    getPrivacyAndPolicy:validator({
        query:Joi.object({
            id:Joi.string(),
            name:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    updatePrivacyAndPolicy:validator({
        query:Joi.object({
            id:Joi.string(),
        }),
        body:Joi.object({
            name:Joi.string(),
            description:Joi.string(),
        }),
    }),
    deletePrivacyAndPolicy: validator({
        query: Joi.object({
          id: Joi.string(),
      }),
    }),
}