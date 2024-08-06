const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require('mongoose');

const returnOrderSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true, 
        },
        pickupAddressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        description: {
            type: String,
        },
        reason: {
            type: String,
        },
        status: {
            type: String,
            default: "approvalPending",
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

let returnOrderModel = model('returnOrder', returnOrderSchema, 'returnOrder'); 

module.exports = returnOrderModel;