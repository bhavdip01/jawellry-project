const termAndCondition = require("../../models/termAndCondition");
const product = require("../../models/product.model")
const { MESSAGE } = require("../../helpers/constant.helper")

const createTermAndCondition = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const payload = {
      name: name,
      description: description,
    };

    let termAndConditionData = await termAndCondition.create(payload);

    return res.status(200).send({
      message: MESSAGE.SUCCESS,
      payload: termAndConditionData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getTermAndCondition = async (req, res, next) => {
  try {
    const { id, name, page, limit } = req.query;
    let skip = (page - 1) * limit;

    let query = {isDeleted: false};
    if (id) {
      query = { _id: id };
    }
    if (name) {
      query = { name: name };
    }
    
    let termAndConditionData = await termAndCondition
      .find(query)
      .skip(skip)
      .limit(limit);
    
    return res.status(200).send({
      message: MESSAGE.FETCH_SUCCESSFULLY,
      payload: termAndConditionData,
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

const updateTermAndCondition = async (req, res, next) => {
  try {
    const { id } = req.query;

    let checkTermAndCondition = await termAndCondition.findOne({ _id: id, isDeleted: false });
    if(!checkTermAndCondition){
      return res.status(404).send({ message: MESSAGE.NOT_FOUND });
    }

    const payload = {
      name: req.body.name,
      description: req.body.description,
    };

    let termAndConditionData = await termAndCondition.findOneAndUpdate(
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
      message: MESSAGE.UPDATED_SUCCESSFULLY,
      payload: termAndConditionData,
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

const deleteTermAndCondition = async (req, res, next) => {
  try {
    const { id } = req.query;

    let checkTermAndCondition = await termAndCondition.findOne({ _id: id, isDeleted: false });
    if(!checkTermAndCondition){
      return res.status(404).send({ message: MESSAGE.NOT_FOUND });
    }
    
    await product.updateMany(
      {termAndConditionId : id},
      {$unset: { termAndConditionId: ""}}
    );

    await termAndCondition.findOneAndUpdate({_id:id}, {$set: {isDeleted: true}},{new: true});

    return res.status(200).send({
      message: MESSAGE.DELETED_SUCCESSFULLY,
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

module.exports = {
  createTermAndCondition,
  getTermAndCondition,
  updateTermAndCondition,
  deleteTermAndCondition,
};
