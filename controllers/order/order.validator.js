const Joi = require("joi");
const { create, update } = require("../addToCart/addToCart.validator");
const { query } = require("winston");
const validator = require("../../middleware/validator").validator;

module.exports = {
    addOrder:validator({
        body:Joi.object({
            userId: Joi.string(),
            productId: Joi.array().items(Joi.string()),
            addToCartId: Joi.string(),
            couponId: Joi.string(),
            addressId: Joi.string(),
            phoneNumber: Joi.number()
            // .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
            // .message('Invalid phone Number')
            // .required()
        }),
    }),
    getOrder:validator({
        query:Joi.object({
            id:Joi.string(),
            user_id:Joi.string(),
            search: Joi.string().trim(),
            orderStatus:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    updateOrder:validator({
        query:Joi.object({
            id:Joi.string(),
        }),
        body:Joi.object({
            orderStatus:Joi.string(),
        }),
    }),
}