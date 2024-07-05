const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');


const privacyAndPolicySchema = new Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        
    }
)

let  privacyAndPolicyModel = model('privacyAndPolicy' , privacyAndPolicySchema, 'privacyAndPolicy')

module.exports = privacyAndPolicyModel