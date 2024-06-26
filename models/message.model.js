const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require('mongoose');


let messageSchema = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
        },
        messageType: {
            type: Number,   // 0-Text , 1-image , 2-video , 3-audio , 4-pdf
        },
        isDeleted: {    
            type: Boolean,
            default: false,
        }
    }
)

let messageModel = model("Message", messageSchema, "Message");

module.exports = messageModel;