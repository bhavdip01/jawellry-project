const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');

const couponSchema = new Schema(
    {
        couponName :{
            type: String,   
        },
        couponCode: {
            type: String,
        },
        discountType: {
            type: String,
        },
        amount: {
            type: Number,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        startDate: {
            type: Date,
         
        },
        endDate: {
            type: Date,
   
        },
        startTime: {
            type: String,
            default: true
        },
        endTime: {
            type: String,
            default: true
        }
    }
)


let couponModel = model('coupon', couponSchema , 'coupon')


module.exports = couponModel