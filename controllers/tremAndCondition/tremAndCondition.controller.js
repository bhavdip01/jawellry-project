const termAndCondition = require("../../models/termAndCondition");

const createtermAndCondition = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const payload = {
      name: name,
      description: description,
    };

    let termAndConditionData = await termAndCondition.create(payload);

    return res.status(200).send({
      message: "termAndCondition Data successfully",
      payload: termAndConditionData,
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

const gettermAndCondition = async (req, res, next) => {
  try {
    const { id, name, page, limit } = req.query;
    let termAndConditionData;
    let skip = (page - 1) * limit;
    let query = {};
    if (id) {
      query = { _id: id };
    } else if (name) {
      query = { name: name };
    }
    termAndConditionData = await termAndCondition
      .find(query)
      .skip(skip)
      .limit(limit);
    return res.status(200).send({
      message: "termAndCondition Data successfully",
      payload: termAndConditionData,
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

const updatetermAndCondition = async (req, res, next) => {
  try {
    const { id } = req.query;

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
      message: "termAndCondition Data updated successfully",
      payload: termAndConditionData,
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

const deletetermAndCondition = async (req, res, next) => {
  try {
    const { id } = req.query;
    await termAndCondition.findOneAndDelete({
      _id: id,
    });

    return res.status(200).send({
      message: "termAndCondition Data delete successfully",
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

module.exports = {
  createtermAndCondition,
  gettermAndCondition,
  updatetermAndCondition,
  deletetermAndCondition,
};
