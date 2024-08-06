const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');

const termAndConditionSchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
        
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

let  termAndConditionModel = model('termAndCondition' , termAndConditionSchema, 'termAndCondition')

module.exports = termAndConditionModel