const express = require("express");
const router = express.Router();

const wishList = require("../controllers/wishList/wishList.controller")


router.route("/addWishList").post(wishList.createWishList)
router.route("/getWishList").get(wishList.getWishList)
router.route("/deleteWishList").delete(wishList.deleteWishList)


module.exports = router