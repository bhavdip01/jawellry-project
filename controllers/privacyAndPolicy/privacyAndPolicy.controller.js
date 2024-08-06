const privacyAndPolicy = require("../../models/privacyAndpolicy.model");
const product = require("../../models/product.model")
const { MESSAGE } = require("../../helpers/constant.helper")

const createPrivacyAndPolicy = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const payload = {
      name: name,
      description: description,
    };

    let privacyAndPolicyData = await privacyAndPolicy.create(payload);

    return res.status(200).send({
      message:  MESSAGE.SUCCESS,
      payload: privacyAndPolicyData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getPrivacyAndPolicy = async (req, res, next) => {
  try {
    const { id, name, page, limit } = req.query;
    let skip = (page - 1) * limit;

    let query = {isDeleted: false}
    if (id) {
      query = { _id: id };
    } 
    if (name) {
      query = { name: name };
    }

    let privacyAndPolicyData = await privacyAndPolicy
      .find(query)
      .skip(skip)
      .limit(limit);

    return res.status(200).send({
      message:  MESSAGE.FETCH_SUCCESSFULLY,
      payload: privacyAndPolicyData,
    });

  } catch (error) {
    return res.status(500).send(error);
  }
};

const updatePrivacyAndPolicy = async (req, res, next) => {
  try {
    const { id } = req.query;

    let checkprivacyAndPolicy = await privacyAndPolicy.findOne({ _id: id, isDeleted: false });
    if(!checkprivacyAndPolicy){
      return res.status(404).send({ message: MESSAGE.NOT_FOUND });
    }

    const payload = {
      name: req.body.name,
      description: req.body.description,
    };

    let privacyAndPolicyData = await privacyAndPolicy.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: payload,
      },
      {
        new: true,
      }
    );
    return res.status(200).send({
      message:  MESSAGE.UPDATED_SUCCESSFULLY,
      payload: privacyAndPolicyData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deletePrivacyAndPolicy = async (req, res, next) => {
  try {
    const { id } = req.query;

    let checkprivacyAndPolicy = await privacyAndPolicy.findOne({ _id: id, isDeleted: false });
    if(!checkprivacyAndPolicy){
      return res.status(404).send({ message:  MESSAGE.NOT_FOUND });
    }

    await product.updateMany(
      {privacyAndPolicyId : id},
      {$unset: { privacyAndPolicyId: ""}}
    );
    
    await privacyAndPolicy.findOneAndUpdate({_id: id}, {$set: { isDeleted: true}}, {new: true});

    return res.status(200).send({
      message: MESSAGE.DELETED_SUCCESSFULLY,
    });

  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createPrivacyAndPolicy,
  getPrivacyAndPolicy,
  updatePrivacyAndPolicy,
  deletePrivacyAndPolicy,
};
