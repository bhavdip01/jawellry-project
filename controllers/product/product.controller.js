const DB = require("../../models");
const { MESSAGE } = require("../../helpers/constant.helper");
const { response } = require("../../helpers");

const helpers = {};

const controllers = {
  create: async (req, res) => {
    //* check if product already exists by name
    const productExists = await DB.PRODUCT.findOne({ name: req.body.name });
    if (productExists)
      return response.DUPLICATE_VALUE({
        res,
        message: MESSAGE.ALREADY_EXISTS,
        payload: { name: req.body.name },
      });

    //* create product
    await DB.PRODUCT.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },

  get: async (req, res) => {
    //* check if product already exists by name
    let query = { isActive: true };

    if (req.query._id) {
      query = { _id: req.query._id, isActive: true };
    }
    if (req.query.name) {
      query = { $regex: req.query.name, $options: "i", isActive: true };
    }
    console.log(req.query);
    const productExists = await DB.PRODUCT.find(query);
    if (!productExists)
      return response.NO_CONTENT_FOUND({
        res,
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create product
    // await DB.PRODUCT.create(req.body);
    // console.log()

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: productExists,
    });
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
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create product
    // await DB.PRODUCT.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
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
        message: MESSAGE.NOT_FOUND,
        payload: {},
      });

    //* create product
    // await DB.PRODUCT.create(req.body);

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: req.body,
    });
  },
};

module.exports = { helpers, controllers };
