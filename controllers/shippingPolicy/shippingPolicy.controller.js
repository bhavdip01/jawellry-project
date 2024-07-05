const shippingPolicy = require("../../models/shippingPolicy.model");

const createShippingPolicy = async (req, res) => {
  try {
    let shippingPolicyData = await shippingPolicy.create(req.body);

    return res.status(200).send({
      message: "shippingPolicy create successfully",
      payload: shippingPolicyData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const getShippingpolicy = async (req, res) => {
  try {
    const { id, title, page, limit } = req.query;
    let skip = (page - 1) * limit;
    let shippingPolicyData;
    let query;

    if (id) {
      query = { _id: id };
    } else if (title) {
      query = { title: title };
    }
    shippingPolicyData = await shippingPolicy
      .find(query)
      .skip(skip)
      .limit(limit);

    return res.status(200).send({
      message: "shippingPolicy get successfully",
      payload: shippingPolicyData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const updateShippingpolicy = async (req, res, next) => {
  try {
    const { id } = req.query;

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
      message: "shippingPolicy update successfully",
      payload: shippingPolicyData,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send(error);
  }
};

const deleteShippingPolicy = async (req, res, next) => {
  try {
    const { id } = req.query;
    await shippingPolicy.findOneAndDelete({
      _id: id,
    });

    return res.status(200).send({
      message: "shippingPolicy delete successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send(error);
  }
};

module.exports = {
  createShippingPolicy,
  getShippingpolicy,
  updateShippingpolicy,
  deleteShippingPolicy,
};
