const { Schema, model } = require('mongoose');
const { MESSAGE, ENUM } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require("mongoose");

const shippingPolicySchema = new Schema(
    {
        tital: {
            type: String,
        },
        manufacturDay: {
            type: Number,
        },
        countryShippingPrice: [
           {
                country: {
                    type: String,
                },
                price: {
                    type: Number,
                },
                deliveryDay: {
                    type: Number,
                }
            },
        ]
    }
)


let shippingPolicyModel = model("ShippingPolicy", shippingPolicySchema, "ShippingPolicy")

module.exports = shippingPolicyModel


