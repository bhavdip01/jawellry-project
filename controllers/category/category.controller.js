const DB = require("../../models");
const { MESSAGE } = require("../../helpers/constant.helper");
const { response } = require("../../helpers");

const helpers = {};

const controllers = {
  create: async (req, res) => {
    //* check if category already exists by name


    const categoryExists = await DB.CATEGORY.findOne({ name: req.body.name });
    if (categoryExists)
      return response.DUPLICATE_VALUE({
        res,
        message: MESSAGE.ALREADY_EXISTS,
        payload: { name: req.body.name },
      });

    //* create category
    await DB.CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  get: async (req, res) => {
    //* check if category already exists by name
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
    const categoryExists = await DB.CATEGORY.find(query).skip(skip).limit(limit);
    if (!categoryExists)
      return response.NO_CONTENT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: categoryExists,
    });
  },

  update: async (req, res) => {
    //* check if category already exists by name

    const categoryExists = await DB.CATEGORY.findOneAndUpdate(
      { _id: req.query._id },
      { $set: req.body },
      { new: true }
    );
    if (!categoryExists)
      return response.NOT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create category
    // await DB.CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  delete: async (req, res) => {
    //* check if category already exists by name

    const categoryExists = await DB.CATEGORY.findOneAndUpdate(
      { _id: req.query._id },
      { $set: { isActive: false } },
      { new: true }
    );
    if (!categoryExists)
      return response.NOT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create category
    // await DB.CATEGORY.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },
};

module.exports = { helpers, controllers };
