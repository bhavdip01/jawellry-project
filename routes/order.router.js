const express = require("express");
const router = express.Router();

const order = require("../controllers/order/order.controller")


router.route("/addOrder").post(order.addOrder)
router.route("/getOrder").get(order.getOrder)
router.route("/updateOrder").put(order.updateOrder)


module.exports = router