const express = require('express');
const router = express.Router();


const shippingPolicy = require("../controllers/shippingPolicy/shippingPolicy.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/").post(auth({ usersAllowed: [ROLE.ADMIN] }),shippingPolicy.createShippingPolicy),
router.route("/").get(shippingPolicy.getShippingpolicy),
router.route("/").put(auth({ usersAllowed: [ROLE.ADMIN] }),shippingPolicy.updateShippingpolicy)
router.route("/").delete(auth({ usersAllowed: [ROLE.ADMIN] }),shippingPolicy.deleteShippingPolicy)






module.exports = router;    