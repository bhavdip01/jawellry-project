const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const DB = require("../../models");
const { MESSAGE } = require("../../helpers/constant.helper");
const { response } = require("../../helpers");
const categoryModel = require("../../models/category.model");
const subCategoryModel = require("../../models/subCategory.model");
const shippingPolicy = require("../../models/shippingPolicy.model")
const image = require("../../models/image.model")
const fs = require("fs");
const path = require('path')
const port = process.env.PORT


const helpers = {};

const controllers = {

  create: async (req, res) => {
    // console.log("==========>",req.body)
    const productExists = await DB.PRODUCT.findOne({ name: req.body.name });
    if (productExists)
      return response.DUPLICATE_VALUE({
        res,
        message: MESSAGE.ALREADY_EXISTS,
        payload: { name: req.body.name },
      });


    // console.log("===============>111",req.files)

    const imagesData = await Promise.all(req.files.map(async (file) => {
      const { size, mimetype, path, filename } = file
      const publicIndex = path.indexOf('/Public');
      let imagePath = path.substring(publicIndex);

      // console.log("imagePath===>", imagePath)

      const payload = {
        image: `http://localhost:${port}${imagePath}`,
        imageName: filename,
        mimeType: mimetype,
        size: size,
        path: path,
        isactive: true,
        deleted: false
      }

      return await image.create(payload)
    }));

    //* check if product already exists by name

    const imageIds = imagesData.map((img) => img._id);
    req.body.imageIds = imageIds;

    //* create product
    const createdProduct = await DB.PRODUCT.create(req.body);
    //  const populatedProduct = await DB.PRODUCT.findById(createdProduct._id).populate('imageId');

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: createdProduct,
    });
  },

  get: async (req, res) => {
    let query = { isActive: true };

    let page = req.query.page;
    let limit = req.query.limit;
    let skip = (page - 1) * limit;

    console.log("req.query", req.query)
    try {
      // Helper function to validate ObjectId
      const validateObjectId = (id, field) => {
        if (!ObjectId.isValid(id)) {
          throw new Error(`Invalid ${field}`);
        }
        return new ObjectId(id);
      };

      // Filter by product ID
      if (req.query._id) {
        query._id = validateObjectId(req.query._id, "_id")
        
        
      }

      // Filter by product name
      // if (req.query.name) {
      //   query.name = { $regex: req.query.name, $options: "i" };
      // }

      // Filter by category ID
      if (req.query.categoryIds) {
        const categoryId = req.query.categoryIds.split(",").map(id => validateObjectId(id.trim(), "categoryId"))
        query.categoryIds = {
          $in: categoryId,
        };

        // query.categoryIds = {
        //   $in: [validateObjectId(req.query.categoryId, "categoryId")],
        // };
      }

      // Filter by sub-category ID
      if (req.query.subCategoryIds) {
        const subCategoryIds = req.query.subCategoryIds.split(",").map(id => validateObjectId(id.trim(), "subcategoryId"))
        query.subCategoryIds = {
          $in: subCategoryIds,
        };

        // query.subCategoryIds = {
        //   $in: [validateObjectId(req.query.subCategoryId, "subCategoryId")],
        // };
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

      const products = await DB.PRODUCT.find(query)
      .populate({
          path:"shippingPolicyId",
          model:"ShippingPolicy"
      })
      console.log("Products found:", products);

      if (products.length === 0) {
        return response.NO_CONTENT_FOUND({
          res,
          message: MESSAGE.NOT_FOUND,
          payload: {},
        });
      }

      return response.OK({
        res,
        message: MESSAGE.SUCCESS,
        payload: products,
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

  addProductImage: async (req, res) => {

    let product = await DB.PRODUCT.findOne({ name: req.body.name });

    const imagesData = await Promise.all(req.files.map(async (file) => {
      const { size, mimetype, path, filename } = file
      const publicIndex = path.indexOf('/Public');
      let imagePath = path.substring(publicIndex);


      const payload = {
        image: `http://localhost:${port}${imagePath}`,
        imageName: filename,
        mimeType: mimetype,
        size: size,
        path: path,
        isactive: true,
        deleted: false
      }

      const createdImage = await image.create(payload);
      return createdImage._id;

    }));
    const imageIds = imagesData.map((img) => img._id)

    // console.log("======================>im",imageIds)

    await DB.PRODUCT.updateOne(
      { _id: product._id },
      { $push: { imageIds: imageIds } }
    );

    product = await DB.PRODUCT.findOne({ _id: product._id })

    // console.log("=============>PP",product)
    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: product
    });

  },

  delete: async (req, res) => {
    //* check if product already exists by name

    const { productId } = req.query
    if (productId) {
      const products = await DB.PRODUCT.findById(productId)
      const imageId = products.imageIds
      // console.log("===========>11",imageId)

      if (imageId.length > 0) {
        const images = await image.find({ _id: { $in: imageId } })
        const imagePath = images.map(img => img.path)
        // console.log("===========>22", imagePath);

        for (const imagepaths of imagePath) {
          if (fs.existsSync(imagepaths)) {
            fs.unlink(imagepaths, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        }

        let aas = await image.deleteMany({ _id: { $in: imageId } })
        // console.log("======>23", aas)

      }

      let vgc = await DB.PRODUCT.findOneAndDelete(productId)
      // console.log("======>23", vgc)


      return res.status(200).send({
        message: "delete successfully"
      })
    }
    else {
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
    }
  },

  removeImage: async (req, res) => {

    const { _id } = req.query

    const images = await image.findOne({ _id })
    const imagePath = images.path
    // console.log("=============>",imagePath)

    await image.findOneAndDelete({ _id })
    await DB.PRODUCT.updateMany(
      { imageIds: _id },
      { $pull: { imageIds: _id } },
    )
    // console.log("===============>fs",fs.existsSync(imagePath))
    // console.log("===============>11",fs.unlinkSync(imagePath))

    if (fs.existsSync(imagePath)) {

      fs.unlink(imagePath, (err) => {

        console.log(err)
      })
    }
    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
    })
  },

  getProduct: async (req, res) => {

    const { productId } = req.query
    const product = await DB.PRODUCT.findOne({ _id: productId }).distinct("subCategoryIds");

    // const productData = await DB.PRODUCT.find({subCategoryIds : {$in : product}})
    const productData = await DB.PRODUCT.aggregate([{ $match: { subCategoryIds: { $in: product } } }, { $sample: { size: 10 } }])
    console.log("===========>22", productData)

    return response.OK({
      res,
      message: MESSAGE.SUCCESS,
      payload: productData,
    });
  }

};

module.exports = { helpers, controllers };

