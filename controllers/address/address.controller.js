const Address = require("../../models/address.model");
const {MESSAGE} = require("../../helpers/constant.helper")

const addAddress = async (req, res, next) => {
  try {
    const { address, addressType, city, state, country, pinCode, userId } =
      req.body;

    const payload = {
      address: address,
      addressType: addressType,
      city: city,
      state: state,
      country: country,
      pinCode: pinCode,
      userId: userId,
    };

    let addressData = await Address.create(payload);

    return res.status(200).send({
      message: MESSAGE.SUCCESS,
      payload: addressData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const { user_id, addresstype, city, page, limit } = req.query;
    let skip = (page - 1) * limit;

    let query = {isDeleted: false}
    if (user_id) {
      query = { userId: user_id}
    }
    if (addresstype) {
      query = { addressType: addresstype}

    }
    if (city) {
      query = { city: city}

    }

    let addressData = await Address.find(query).skip(skip).limit(limit)
    .populate({
      path: 'userId',
      model: 'User'
    })

    return res.status(200).send({
      message:  MESSAGE.FETCH_SUCCESSFULLY,
      payload: addressData,
    });

  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.query;

    const checkAddress = await Address.findOne({_id: id})
    if (!checkAddress) {
      return res.status(404).send({
        message: MESSAGE.NOT_FOUND
      });
    }

    const payload = {
      address: req.body.address,
      addressType: req.body.addressType,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pinCode: req.body.pinCode,
    };
    let addressData = await Address.findOneAndUpdate(
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
      payload: addressData,
    });

  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.query;

    const checkAddress = await Address.findOne({_id: id, isDeleted: false})
    if (!checkAddress) {
      return res.status(404).send({
        message: MESSAGE.NOT_FOUND
      });
    }
    await Address.findOneAndUpdate({_id: id},{$set: {isDeleted: true}},{new: true});

    return res.status(200).send({
      message:  MESSAGE.DELETED_SUCCESSFULLY,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
module.exports = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
