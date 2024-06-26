const Joi = require("joi");
const { create, update } = require("../addToCart/addToCart.validator");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    create:validator({
        body:Joi.object({
            userId: Joi.array().items(Joi.string()).required(),
            productId: Joi.array().items(Joi.string()).required(),
            addToCartId: Joi.array().items(Joi.string()).required(),
            couponId: Joi.array().items(Joi.string()).required(),
            addressId: Joi.array().items(Joi.string()).required(),
            orderStatus: Joi.string(),
            phoneNumber: Joi.string()
            .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
            .message('Invalid phone Number')
            .required()
        }),
    }),
    get:validator({
        query:Joi.object({
            id:Joi.string(),
            user_id:Joi.string(),
            search: Joi.string().trim(),
            orderstatus:Joi.string().trim,
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    update:validator({
        query:Joi.object({
            id:Joi.string(),
        }),
        body:Joi.object({
            orderStatus:Joi.string(),
        }),
    }),
}