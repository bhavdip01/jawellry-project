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
    sku: {
      type: String,
    },
    personalization: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
      default: 0,
    },
    categoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    subCategoryIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "subCategory",
        required: true,
      },
    ],
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
