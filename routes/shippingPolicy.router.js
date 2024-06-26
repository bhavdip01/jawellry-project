const express = require('express');
const router = express.Router();


const shippingPolicy = require("../controllers/shippingPolicy/shippingPolicy.controller");

router.route("/").post(shippingPolicy.createShippingPolicy),
router.route("/").get(shippingPolicy.getShippingpolicy),
router.route("/").put(shippingPolicy.updateShippingpolicy)
router.route("/").delete(shippingPolicy.deleteShippingPolicy)






module.exports = router;    