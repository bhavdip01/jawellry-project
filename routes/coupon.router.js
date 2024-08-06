const express  = require("express")
const router = express.Router();

const coupon = require("../controllers/coupon/coupon.controller")

const {auth} = require("../middleware/auth")
const {
    ENUM: { ROLE },
}= require("../helpers/constant.helper")

const {
    COUPON : { VALIDATOR }
} = require("../controllers")

router.route("/addCoupon").post(
    auth({ usersAllowed: [ROLE.ADMIN]}),
    VALIDATOR.createCoupon,
    coupon.createCoupon
);

router.route("/getCoupon").get(
    auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
    VALIDATOR.getCoupon,
    coupon.getCoupon
);

router.route("/updateCoupon").put(
    auth({ usersAllowed: [ROLE.ADMIN]}),
    VALIDATOR.updateCoupon,
    coupon.updateCoupon
);

router.route("/deleteCoupon").delete(
    auth({ usersAllowed: [ROLE.ADMIN]}),
    VALIDATOR.deleteCoupon,
    coupon.deleteCoupon
);


module.exports = router