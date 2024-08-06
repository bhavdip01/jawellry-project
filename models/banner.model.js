const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require("mongoose")


let bannerSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        isMain: {
            type: Boolean,
            default: true,
        },
        isDeleted: {    
            type: Boolean,
            default: false,
        },
        imageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

let bannerModel = model("Banner", bannerSchema, "Banner");

module.exports = bannerModel