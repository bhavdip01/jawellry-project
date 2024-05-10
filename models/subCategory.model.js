const { Schema, model } = require("mongoose");

const {
  ENUM: { ROLE },
} = require("../helpers/constant.helper");

let subCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      message:
        "please enter valid subCategory name or subCategory already exist",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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

let subCategoryModel = model("subCategory", subCategorySchema, "subCategory");

module.exports = subCategoryModel;
