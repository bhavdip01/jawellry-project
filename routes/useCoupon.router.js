const express = require("express");
const router = express.Router();

const useCoupon = require("../controllers/useCoupon/useCoupon.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/addUseCoupon").post(auth({ usersAllowed: [ROLE.USER] }),useCoupon.createUseCoupon);
router.route("/getUseCoupon").get(useCoupon.getUseCoupon)




module.exports = router