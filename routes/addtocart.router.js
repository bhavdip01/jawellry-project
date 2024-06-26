const express = require("express");
const router = express.Router();

const addCart = require("../controllers/addToCart/addToCart.controller")


router.route("/addCart").post(addCart.createAddToCart)
router.route("/getCart").get(addCart.getAddToCart)
router.route("/updateCart").put(addCart.updateAddToCart)
router.route("/deleteCart").delete(addCart.deleteAddToCart)


module.exports = router