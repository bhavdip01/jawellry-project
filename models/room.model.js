const { Schema, model } = require('mongoose');
const { MESSAGE } = require('../helpers/constant.helper');
const env = require('../config/env.config');
const { logger } = require('../helpers');
const { string, number, boolean, required } = require('joi');
const mongoose = require('mongoose');


let roomSchema = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: "string",
        },
        isDeleted: {    
            type: Boolean,
            default: false,
        }
    }
)

let roomModel = model("Room", roomSchema, "Room");

module.exports = roomModel