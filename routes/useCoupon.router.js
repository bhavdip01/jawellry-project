const express = require("express");
const router = express.Router();

const useCoupon = require("../controllers/useCoupon/useCoupon.controller")

router.route("/addUseCoupon").post(useCoupon.createUseCoupon);
router.route("/getUseCoupon").get(useCoupon.getUseCoupon)




module.exports = router