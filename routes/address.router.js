const express = require("express");
const router = express.Router();

const address = require("../controllers/address/address.controller")

const {auth} = require("../middleware/auth")
const {
    ENUM: { ROLE },
}= require("../helpers/constant.helper")

const {
    ADDRESS: { VALIDATOR },
  } = require("../controllers");


router.route("/addAddress").post(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.addAddress,
  address.addAddress
);

router.route("/getAddress").get(
  auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
  VALIDATOR.getAddress, address.getAddress
);

router.route("/updateAddress").put(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.updateAddress,
  address.updateAddress
);

router.route("/deleteAddress").delete(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.deleteAddress,
  address.deleteAddress
);



module.exports = router