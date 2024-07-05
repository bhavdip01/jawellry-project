const Joi = require('joi');
const { query } = require('winston');
const validator = require("../../middleware/validator").validator;

module.exports = {
    createReturnOrder: validator({
        body: Joi.object({
            productId: Joi.string().required(),
            orderId: Joi.string().required(),
            pickupAddressId: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.string().required()
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
    returnOrderStatusUpdate: validator({
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