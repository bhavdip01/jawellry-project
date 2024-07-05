const express = require("express");
const router = express.Router();

const address = require("../controllers/address/address.controller")

const {auth} = require("../middleware/auth")
const {
    ENUM: { ROLE },
}= require("../helpers/constant.helper")


router.route("/addAddress").post(auth({ usersAllowed: [ROLE.USER] }),address.addAddress)
router.route("/getAddress").get(address.getAddress)
router.route("/updateAddress").put(auth({ usersAllowed: [ROLE.USER] }),address.updateAddress)
router.route("/deleteAddress").delete(auth({ usersAllowed: [ROLE.USER] }),address.deleteAddress)

module.exports = router