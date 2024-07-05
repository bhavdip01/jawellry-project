const { Schema, model } = require("mongoose");

const {
  ENUM: { ROLE },
} = require("../helpers/constant.helper");
const { required } = require("joi");
const mongoose = require("mongoose")

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    subCategoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
        required: true,
      },
    ],
    imageIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true,
      },
    ],
    shippingPolicyId: {
      type: Schema.Types.ObjectId,
      ref: "ShippingPolicy",
      required: true,
    },
    privacyAndPolicyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "privacyAndPolicy",
      required: true,
    },
    termAndConditionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "termAndCondition",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEngraving: {
      type: Boolean,
      default: false,
    },
    isGift: {
      type: Boolean,
      default: false,
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
