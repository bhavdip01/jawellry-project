const { Schema, model } = require("mongoose");

const {
  ENUM: { ROLE },
} = require("../helpers/constant.helper");
const { required } = require("joi");

let productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      message: "please enter valid product name or product already exist",
    },
    price: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let productModel = model("Product", productSchema, "Product");

module.exports = productModel;
