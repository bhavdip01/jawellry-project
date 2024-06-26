const express  = require("express")
const router = express.Router();

const coupon = require("../controllers/coupon/coupon.controller")

router.route("/addCoupon").post(coupon.createCoupon);
router.route("/getCoupon").get(coupon.getCoupon);
router.route("/updateCoupon").put(coupon.updateCoupon);
router.route("/deleteCoupon").delete(coupon.deleteCoupon)


module.exports = router