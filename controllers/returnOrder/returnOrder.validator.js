const Joi = require('joi');
const { query } = require('winston');
const validator = require("../../middleware/validator").validator;

module.exports = {
    createReturnOrder: validator({
        body: Joi.object({
            productId: Joi.string(),
            orderId: Joi.string(),
            pickupAddressId: Joi.string(),
            description: Joi.string(),
        }),
    }),
    getReturnOrder: validator({
        query: Joi.object({
            id: Joi.string(),
            orderId: Joi.string(),
            productId: Joi.string(),
            status: Joi.string(),
            page: Joi.number(),
            limit: Joi.number(),
        }),
    }),
    updateReturnOrderStatus: validator({
        query: Joi.object({
            id: Joi.string(),
        }),
        body: Joi.object({
            status:Joi.string().trim(),
            reason:Joi.string().trim()
        }),
    }),
    deleteReturnOrder: validator({
        query: Joi.object({
            id: Joi.string(),
        }),
    }),
}