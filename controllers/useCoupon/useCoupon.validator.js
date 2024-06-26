const Joi = require("joi");
const { create } = require("../addToCart/addToCart.validator");

const validator = require("../../middleware/validator").validator;

module.exports = {
    create:validator({
        body:Joi.object({
            couponId: Joi.array().items(Joi.string()).required(),  
            userId: Joi.array().items(Joi.string()).required(),
        }),
    }),
    get:validator({
    query: Joi.object({
            id: Joi.string(),
        }),
    }),
}