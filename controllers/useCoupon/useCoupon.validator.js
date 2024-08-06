const Joi = require("joi");

const validator = require("../../middleware/validator").validator;

module.exports = {
    createUseCoupon:validator({
        body:Joi.object({
            couponId: Joi.string(),  
            userId: Joi.string(),
        }),
    }),
    getUseCoupon:validator({
    query: Joi.object({
            id: Joi.string(),
            page: Joi.number(),
            limit: Joi.number(),
        }),
    }),
}