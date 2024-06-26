    const { Schema, model } = require('mongoose');
    const { MESSAGE } = require('../helpers/constant.helper');
    const env = require('../config/env.config');
    const { logger } = require('../helpers');
    const { string, number, boolean, required } = require('joi');
    const mongoose = require("mongoose")

const addressSchema = new Schema(
    {
        address: {
            type: String,
            required: true,
        },
        addressType: {
            type: String,
            required: true,
        },
        city: {
            type:String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        }

    }
)

let addressModel = model("address", addressSchema, "address")

module.exports = addressModel