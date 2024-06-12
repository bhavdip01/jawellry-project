const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const DB = require("../../models");
// const { constants.MESSAGE } = require("../../helpers/constant.helper");
const { response, constants } = require("../../helpers");
const categoryModel = require("../../models/category.model");
const subCategoryModel = require("../../models/subCategory.model");

const helpers = {};

const controllers = {
  create: async (req, res) => {
    //* check if product already exists by name
    const productExists = await DB.PRODUCT.findOne({ name: req.body.name });
    if (productExists)
      return response.DUPLICATE_VALUE({
        res,
        message: constants.MESSAGE.ALREADY_EXISTS,
        payload: { name: req.body.name },
      });

    //* create product
    await DB.PRODUCT.create(req.body);

    return response.OK({
      res,
      message: constants.MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  get: async (req, res) => {
    let query = { isActive: true };

    try {
      // Helper function to validate ObjectId
      const validateObjectId = (id, field) => {
        if (!ObjectId.isValid(id)) {
          throw new Error(`Invalid ${field}`);
        }
        return new ObjectId(id);
      };

      // Extract pagination parameters
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 10;
      const skip = (page - 1) * pageSize;
      console.log(page, pageSize, skip)
      // Filter by product ID
      if (req.query._id) {
        query._id = validateObjectId(req.query._id, "_id");
      }

      // Filter by category ID
      if (req.query.categoryId) {
        query.categoryIds = {
          $in: [validateObjectId(req.query.categoryId, "categoryId")],
        };
      }

      // Filter by sub-category ID
      if (req.query.subCategoryId) {
        query.subCategoryIds = {
          $in: [validateObjectId(req.query.subCategoryId, "subCategoryId")],
        };
      }

      // Filter by price range
      if (req.query.startPrice || req.query.endPrice) {
        query.price = {};
        if (req.query.startPrice)
          query.price.$gte = Number(req.query.startPrice);
        if (req.query.endPrice) query.price.$lte = Number(req.query.endPrice);
      }

      // Search by multiple fields
      if (req.query.search) {
        const searchRegex = { $regex: req.query.search, $options: "i" };
        query.$or = [
          { name: searchRegex },
          { tags: searchRegex },
          { subTitle: searchRegex },
          { description: searchRegex },
        ];

        // Fetch category and sub-category IDs for search
        const [categories, subCategories] = await Promise.all([
          categoryModel.find({ name: searchRegex }).select("_id"),
          subCategoryModel.find({ name: searchRegex }).select("_id"),
        ]);

        if (categories.length > 0) {
          query.$or.push({
            categoryIds: { $in: categories.map((cat) => cat._id) },
          });
        }

        if (subCategories.length > 0) {
          query.$or.push({
            subCategoryIds: { $in: subCategories.map((subCat) => subCat._id) },
          });
        }
      }

      console.log("Constructed query:", query);

      const totalItems = await DB.PRODUCT.countDocuments(query);
      const products = await DB.PRODUCT.find(query).skip(skip).limit(pageSize);

      console.log("Products found:", products);

      if (products.length === 0) {
        return response.NO_CONTENT_FOUND({
          res,
          message: constants.MESSAGE.NOT_FOUND,
          payload: {},
        });
      }

      return response.OK({
        res,
        message: constants.MESSAGE.SUCCESS,
        payload: {
          products,
          pagination: {
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
            pageSize,
          },
        },
      });
    } catch (error) {
      console.error("Error in get method:", error.message);
      return response.BAD_REQUEST({
        res,
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    //* check if product already exists by name

    const productExists = await DB.PRODUCT.findOneAndUpdate(
      { _id: req.query._id },
      { $set: req.body },
      { new: true }
    );
    if (!productExists)
      return response.NOT_FOUND({
        res,
        message: constants.MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create product
    // await DB.PRODUCT.create(req.body);

    return response.OK({
      res,
      message: constants.MESSAGE.SUCCESS,
      payload: productExists,
    });
  },

  delete: async (req, res) => {
    //* check if product already exists by name

    const productExists = await DB.PRODUCT.findOneAndUpdate(
      { _id: req.query._id },
      { $set: { isActive: false } },
      { new: true }
    );
    if (!productExists)
      return response.NOT_FOUND({
        res,
        message: constants.MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create product
    // await DB.PRODUCT.create(req.body);

    return response.OK({
      res,
      message: constants.MESSAGE.SUCCESS,
      payload: req.body,
    });
  },
};

module.exports = { helpers, controllers };
