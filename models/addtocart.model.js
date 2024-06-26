const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require("mongoose")

const addToCartSchema = new Schema(
    {
        quantity: {
            type: Number,
            default: 0,
        },
        productId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
    }
)

let addToCartModel = model('addToCart' , addToCartSchema, 'addToCart')

module.exports = addToCartModel