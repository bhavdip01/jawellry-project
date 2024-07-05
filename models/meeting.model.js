const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require('mongoose');

const meetingSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
        },
        description: {
            type: String
        },
        status: {
            type: String,
            default: "pending",
            ENUM: ["pending", "approved", "disApproved"]
        },
        reason: {
            type: String
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


let meetingModel = model('Meeting', meetingSchema , 'Meeting')


module.exports = meetingModel