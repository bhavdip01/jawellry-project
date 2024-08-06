const returnCondition = require("../../models/returnCondition.model");
const { MESSAGE } = require("../../helpers/constant.helper")

const createReturnCondition = async (req, res) => {
  try {
    const { title, description } = req.body;

    const payload = {
      title: title,
      description: description,
    };

    let returnConditionData = await returnCondition.create(payload);

    return res.status(200).send({
      message: MESSAGE.SUCCESS,
      payload: returnConditionData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getReturnCondition = async (req, res) => {
  try {
    const { id, title, page, limit } = req.query;
    let skip = (page - 1) * limit;

    let query = {isDeleted: false};
    if (id) {
      query = { _id: id };
    } 
    if (title) {
      query = { title: title };
    }

    let returnConditionData = await returnCondition
      .find(query)
      .skip(skip)
      .limit(limit);

    return res.status(200).send({
      message: MESSAGE.FETCH_SUCCESSFULLY,
      payload: returnConditionData,
    });

  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateReturnCondition = async (req, res) => {
  try {
    const { id } = req.query;

    let checkReturnCondition = await returnCondition.findOne({_id: id, isDeleted: false});
    if (!checkReturnCondition) {
      return res.status(404).send({ message: MESSAGE.NOT_FOUND });
    }

    const payload = {
      title: req.body.title,
      description: req.body.description,
    };

    let returnConditionData = await returnCondition.findOneAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true }
    );

    return res.status(200).send({
      message: MESSAGE.UPDATED_SUCCESSFULLY,
      payload: returnConditionData,
    });

  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteReturnCondition = async (req, res) => {
  try {
    const { id } = req.query;

    let checkReturnCondition = await returnCondition.findOne({_id: id, isDeleted: false});
    if (!checkReturnCondition) {
      return res.status(404).send({ message: MESSAGE.NOT_FOUND });
    }

    await returnCondition.findOneAndUpdate({_id: id},{$set: {isDeleted: true}},{new: true});

    return res.status(200).send({
      message: MESSAGE.DELETED_SUCCESSFULLY,
    });
  } catch (error) {
    return res.status(500).send(errq);
  }
};

module.exports = {
  createReturnCondition,
  getReturnCondition,
  updateReturnCondition,
  deleteReturnCondition,
};
