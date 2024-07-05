const Address = require("../../models/address.model");

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
      message: "address data successfully",
      payload: addressData,
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const { user_id, addresstype, city, page, limit } = req.query;
    let addressData;

    let skip = (page - 1) * limit;

    if (user_id) {
      addressData = await Address.find({ userId: user_id })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "userId",
          model: "User",
        });
    } else if (addresstype) {
      addressData = await Address.find({ addressType: addresstype })
        .populate({
          path: "userId",
          model: "User",
        })
        .skip(skip)
        .limit(limit);
    } else if (city) {
      addressData = await Address.find({ city: city })
        .populate({
          path: "userId",
          model: "User",
        })
        .skip(skip)
        .limit(limit);
    }

    return res.status(200).send({
      message: "addressData fetch successfully",
      payload: addressData,
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    console.log(req.query);
    const { id } = req.query;

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
      message: "address Data updated successfully",
      payload: addressData,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.query;
    await Address.findOneAndDelete({
      _id: id,
    });

    return res.status(200).send({
      message: "address deleted successfully",
    });
  } catch (error) {
    return res.status(200).send(error);
  }
};
module.exports = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
