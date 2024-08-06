const Joi = require("joi");
const { create } = require("../addToCart/addToCart.validator");

const validator = require("../../middleware/validator").validator;

module.exports = {
    createWishList:validator({
        body:Joi.object({
            productId: Joi.string(),  
            userId: Joi.string(),
        }),
    }),
    getWishList:validator({
    query: Joi.object({
            id: Joi.string(),
            userid:Joi.string(),
            page:Joi.string(),
            limit:Joi.string(),
        }),
    }),
    deleteWishList: validator({
    query: Joi.object({
            product_Id: Joi.string(),
        }),
    }),
}