const express = require("express");
const router = express.Router();

const address = require("../controllers/address/address.controller")


router.route("/addAddress").post(address.addAddress)
router.route("/getAddress").get(address.getAddress)
router.route("/updateAddress").put(address.updateAddress)
router.route("/deleteAddress").delete(address.deleteAddress)

module.exports = router