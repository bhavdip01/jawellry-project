const returnCondition = require("../../models/returnCondition.model");

const createReturnCondition = async (req, res) => {
  try {
    const { title, description } = req.body;

    const payload = {
      title: title,
      description: description,
    };

    let returnConditionData = await returnCondition.create(payload);

    return res.status(200).send({
      message: "returnConditionData created successfully",
      payload: returnConditionData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getReturnCondition = async (req, res) => {
  try {
    const { id, title, page, limit } = req.query;
    let returnConditionData;
    let skip = (page - 1) * limit;
    let query = {};
    if (id) {
      query = { _id: id };
    } else if (title) {
      query = { title: title };
    }
    returnConditionData = await returnCondition
      .find(query)
      .skip(skip)
      .limit(limit);

    return res.status(200).send({
      message: "returnConditionData fetched successfully",
      payload: returnConditionData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateReturnCondition = async (req, res) => {
  try {
    const { id } = req.query;

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
      message: "returnConditionData updated successfully",
      payload: returnConditionData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteReturnCondition = async (req, res) => {
  try {
    const { id } = req.query;

    await returnCondition.findOneAndDelete({
      _id: id,
    });

    return res.status(200).send({
      message: "returnConditionData deleted successfully",
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
