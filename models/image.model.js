
const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean } = require('joi');




const imageSchema = new Schema(
    {
        image:{ 
            type:String
        },
        imageName:{
            type:String,
        },
        mimeType:{
            type:String,
        },
        size:{
            type:String,
        },
        path:{
            type:String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        deleted:{
            type:Boolean,
            default:false,
        }
    }
)


let imageModel = model('Image', imageSchema, 'Image');
module.exports = imageModel
