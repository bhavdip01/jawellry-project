const shippingPolicy = require("../../models/shippingPolicy.model");
const { MESSAGE } = require("../../helpers/constant.helper");

const createShippingPolicy = async (req, res) => {
  try {
    let shippingPolicyData = await shippingPolicy.create(req.body);

    return res.status(200).send({
      message:  MESSAGE.SUCCESS,
      payload: shippingPolicyData,
    });

  } catch (error) {
    return res.status(500).send({ error });
  }
};

const getShippingpolicy = async (req, res) => {
  try {
    const { id, title, page, limit } = req.query;
    let skip = (page - 1) * limit;

    let query = {isDeleted: false}

    if (id) {
      query = { _id: id };
    }
    if (title) {
      query = { title: title };
    }

    let shippingPolicyData = await shippingPolicy
      .find(query)
      .skip(skip)
      .limit(limit);

    return res.status(200).send({
      message:  MESSAGE.FETCH_SUCCESSFULLY,
      payload: shippingPolicyData,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const updateShippingpolicy = async (req, res, next) => {
  try {
    const { id } = req.query;

    const checkShippingPolicy = await shippingPolicy.findOne({ _id: id , isDeleted: false });
    if(!checkShippingPolicy){
      return res.status(404).send({
        message: MESSAGE.NOT_FOUND,
      });
    }

    let shippingPolicyData = await shippingPolicy.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).send({
      message: MESSAGE.UPDATED_SUCCESSFULLY,
      payload: shippingPolicyData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteShippingPolicy = async (req, res, next) => {
  try {
    const { id } = req.query;

    const checkShippingPolicy = await shippingPolicy.findOne({ _id: id, isDeleted: false});
    if(!checkShippingPolicy){
      return res.status(404).send({
        message: MESSAGE.NOT_FOUND,
      });
    }

    await shippingPolicy.findOneAndUpdate({_id: id},{$set : {isDeleted: true}}, {new: true});

    return res.status(200).send({
      message: MESSAGE.DELETED_SUCCESSFULLY,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createShippingPolicy,
  getShippingpolicy,
  updateShippingpolicy,
  deleteShippingPolicy,
};
