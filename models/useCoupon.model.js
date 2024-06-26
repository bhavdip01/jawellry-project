const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require("mongoose")


const useCouponSchema = new Schema(
    {
        couponId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "coupon",
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
)


let useCouponModel = model("UseCoupon",useCouponSchema,"UseCoupon")

module.exports = useCouponModel