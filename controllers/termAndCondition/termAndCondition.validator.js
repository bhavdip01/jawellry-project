const Joi = require("joi");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    create:validator({
        body:Joi.object({
            name:Joi.string(),
            description:Joi.string(),
        }),
    }),
    get:validator({
        query:Joi.object({
            id:Joi.string(),
            name:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    update:validator({
        query:Joi.object({
            id:Joi.string(),
        }),
        body:Joi.object({
            name:Joi.string(),
            description:Joi.string(),
        }),
    }),
    delete: validator({
        query: Joi.object({
          id: Joi.string(),
      }),
    }),
}