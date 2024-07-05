const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');

const returnConditionSchema = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        }
    }
)

let returnConditionModel = model('ReturnCondition', returnConditionSchema, 'ReturnCondition');

module.exports = returnConditionModel;