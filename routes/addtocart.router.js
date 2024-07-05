const express = require("express");
const router = express.Router();

const addCart = require("../controllers/addToCart/addToCart.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/addCart").post(auth({ usersAllowed: [ROLE.USER] }),addCart.createAddToCart)
router.route("/getCart").get(addCart.getAddToCart)
router.route("/updateCart").put(auth({ usersAllowed: [ROLE.USER] }),addCart.updateAddToCart)
router.route("/deleteCart").delete(auth({ usersAllowed: [ROLE.USER] }),addCart.deleteAddToCart)


module.exports = router