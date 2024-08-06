const express = require('express');
const router = express.Router();


const shippingPolicy = require("../controllers/shippingPolicy/shippingPolicy.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    SHIPPING_POLICY: { VALIDATOR },
  } = require("../controllers");

router.route("/").post(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.createShippingPolicy,
  shippingPolicy.createShippingPolicy
);

router.route("/").get(
  auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
  VALIDATOR.getShippingpolicy,
  shippingPolicy.getShippingpolicy
);

router.route("/").put(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.updateShippingpolicy,
  shippingPolicy.updateShippingpolicy
);

router.route("/").delete(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.deleteShippingPolicy,
  shippingPolicy.deleteShippingPolicy
);






module.exports = router;    