const express = require("express");
const router = express.Router();

const useCoupon = require("../controllers/useCoupon/useCoupon.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    USE_COUPON: { VALIDATOR },
  } = require("../controllers");

router.route("/addUseCoupon").post(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.createUseCoupon,
  useCoupon.createUseCoupon
);

router.route("/getUseCoupon").get(
  auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
  VALIDATOR.getUseCoupon,
  useCoupon.getUseCoupon
);




module.exports = router