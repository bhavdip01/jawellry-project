const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
    create:validator({
        body:Joi.object({
          quantity: Joi.number(),
          productId: Joi.array().items(Joi.string()).required(),  
          userId: Joi.array().items(Joi.string()).required(),
        }),
    }),
    get: validator({
      query: Joi.object({
        id: Joi.string(),
        userid:Joi.string(),
        page:Joi.string(),
        limit:Joi.string(),
      }),
    }),
    update: validator({
      query: Joi.object({
        user_id: Joi.string(),
      }),
      body: Joi.object({
        quantity: Joi.number(),
      }),
    }),
    delete: validator({
      query: Joi.object({
        product_Id: Joi.string(),
      }),
    }),
}