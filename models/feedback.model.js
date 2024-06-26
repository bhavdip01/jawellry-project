const { Schema, model } = require('mongoose');
const { MESSAGE, ENUM } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require("mongoose");

const feedBackSchema = new Schema(
    {
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        feedbackPoint: {
            type: Number
        },
        description: {
            type: String,
        },
        isShow: {
            type: Boolean,
            default: true,
        },
        isMain: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }        
    }
)


let feedBackModel = model("FeedBack", feedBackSchema, "FeedBack")

module.exports = feedBackModel