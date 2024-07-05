const express  = require("express")
const router = express.Router();

const coupon = require("../controllers/coupon/coupon.controller")

const {auth} = require("../middleware/auth")
const {
    ENUM: { ROLE },
}= require("../helpers/constant.helper")

router.route("/addCoupon").post(auth({ usersAllowed: [ROLE.ADMIN]}),coupon.createCoupon);
router.route("/getCoupon").get(coupon.getCoupon);
router.route("/updateCoupon").put(auth({ usersAllowed: [ROLE.ADMIN]}),coupon.updateCoupon);
router.route("/deleteCoupon").delete(auth({ usersAllowed: [ROLE.ADMIN]}),coupon.deleteCoupon)


module.exports = router