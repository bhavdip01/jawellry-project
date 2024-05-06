const { Schema, model } = require("mongoose");

const {
  ENUM: { ROLE },
} = require("../helpers/constant.helper");

let categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      message: "please enter valid category name or category already exist",
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

let categoryModel = model("Category", categorySchema, "Category");

module.exports = categoryModel;
