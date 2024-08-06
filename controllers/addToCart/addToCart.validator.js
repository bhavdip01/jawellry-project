const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
    createAddToCart: validator({
        body:Joi.object({
          quantity: Joi.number(),
          productId: Joi.string(),  
          userId: Joi.string(),
        }),
    }),
    getAddToCart: validator({
      query: Joi.object({
        id: Joi.string(),
        userid:Joi.string(),
        page:Joi.string(),
        limit:Joi.string(),
      }),
    }),
    updateAddToCart: validator({
      query: Joi.object({
        user_id: Joi.string(),
      }),
      body: Joi.object({
        quantity: Joi.number(),
      }),
    }),
    deleteAddToCart: validator({
      query: Joi.object({
        product_Id: Joi.string(),
      }),
    }),
}