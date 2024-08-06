const DB = require("../../models");
const { MESSAGE } = require("../../helpers/constant.helper");
const { response } = require("../../helpers");

const helpers = {};

const controllers = {
  create: async (req, res) => {
    const subCategoryExists = await DB.SUB_CATEGORY.findOne({ name: req.body.name });
    if (subCategoryExists)
      return response.DUPLICATE_VALUE({
        res,
        message: MESSAGE.ALREADY_EXISTS,
        payload: { name: req.body.name },
      });
    
    const category = await DB.CATEGORY.findOne({ _id: req.body.categoryId, isActive: true})
    if(!category) {
      return res.status(400).send({
          code:400,
          success: false,
          message: MESSAGE.NOT_FOUND,
          data: {}
      })
    }
      
    //* create subCategory
    await DB.SUB_CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  get: async (req, res) => {
    //* check if subCategory already exists by name
    let query = { isActive: true };

    let page = req.query.page;
    let limit = req.query.limit;
    let skip = (page - 1) * limit;

    if (req.query._id) {
      query = { _id: req.query._id };
    }
    if (req.query.name) {
      query = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.categoryId) {
      query = {categoryId:req.query.categoryId}
    }
    const subCategoryExists = await DB.SUB_CATEGORY.find(query).skip(skip).limit(limit)
    .populate({
      path:"categoryId",
      model:"Category"
    });
    if (!subCategoryExists)
      return response.NO_CONTENT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: subCategoryExists,
    });
  },

  update: async (req, res) => {
    //* check if subCategory already exists by name

    const subCategoryExists = await DB.SUB_CATEGORY.findOneAndUpdate(
      { _id: req.query._id },
      { $set: req.body },
      { new: true }
    );
    if (!subCategoryExists)
      return response.NOT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create subCategory
    // await DB.SUB_CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  delete: async (req, res) => {
    //* check if subCategory already exists by name

    const subCategoryExists = await DB.SUB_CATEGORY.findOneAndUpdate(
      { _id: req.query._id },
      { $set: { isActive: false } },
      { new: true }
    );
    if (!subCategoryExists)
      return response.NOT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create subCategory
    // await DB.SUB_CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },
};

module.exports = { helpers, controllers };
