const { Schema, model } = require("mongoose");

const {
  ENUM: { ROLE },
} = require("../helpers/constant.helper");

let productCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      message: "please enter valid productCategory name or productCategory already exist",
    },
    description: {
      type: String,
    },
    isMain: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
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

let productCategoryModel = model("productCategory", productCategorySchema, "productCategory");

module.exports = productCategoryModel;
