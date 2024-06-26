const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean } = require('joi');

const wishListSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
    }
)

let wishListModel = model('wishList' , wishListSchema, 'wishList')

module.exports = wishListModel