const { Schema, model } = require('mongoose');
const { MESSAGE, ENUM } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require("mongoose");

const orderSchema = new Schema(
    {
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            }
        ],
        Engraving: {
            type: String,
        },
        addToCartId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "addToCart",
            required: true,
        },
        couponId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "coupon",
            required: true,
        },
        addressId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"address",
            required: true,
        },
        orderStatus: {
            type: String,
            ENUM : ["Pending","Completed","Dispatched","Rejected","Desing","inCompleted","Delivered"],
            default: "pending",

        },
        randomOrderNumber: {
            type: String,
        },
        phoneNumber: {
            type:Number
        }
    },
    {
        timestamps: true,
        versionKey: false,
    
    }
)


let orderModel = model("Order", orderSchema, "Order")

module.exports = orderModel


