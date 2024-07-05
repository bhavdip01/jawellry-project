const express = require("express");
const router = express.Router();

const wishList = require("../controllers/wishList/wishList.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/addWishList").post(auth({ usersAllowed: [ROLE.USER] }),wishList.createWishList)
router.route("/getWishList").get(wishList.getWishList)
router.route("/deleteWishList").delete(auth({ usersAllowed: [ROLE.USER] }),wishList.deleteWishList)


module.exports = router