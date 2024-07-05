const express = require("express");
const router = express.Router();

const order = require("../controllers/order/order.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/addOrder").post(auth({ usersAllowed: [ROLE.USER] }),order.addOrder)
router.route("/getOrder").get(order.getOrder)
router.route("/updateOrder").put(auth({ usersAllowed: [ROLE.ADMIN] }),order.updateOrder)


module.exports = router