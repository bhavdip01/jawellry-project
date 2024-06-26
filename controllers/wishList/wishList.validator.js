const Joi = require("joi");
const { create } = require("../addToCart/addToCart.validator");

const validator = require("../../middleware/validator").validator;

module.exports = {
    create:validator({
        body:Joi.object({
            productId: Joi.array().items(Joi.string()).required(),  
            userId: Joi.array().items(Joi.string()).required(),
        }),
    }),
    get:validator({
    query: Joi.object({
            id: Joi.string(),
            userid:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    delete: validator({
    query: Joi.object({
            product_Id: Joi.string(),
        }),
    }),
}