const express = require("express");
const router = express.Router();

const wishList = require("../controllers/wishList/wishList.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    WISH_LIST: { VALIDATOR },
  } = require("../controllers");

router.route("/addWishList").post(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.createWishList,
  wishList.createWishList
);

router.route("/getWishList").get(
  auth({ usersAllowed: [ROLE.USER, ROLE.ADMIN] }),
  VALIDATOR.getWishList,
  wishList.getWishList
);

router.route("/deleteWishList").delete(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.deleteWishList,
  wishList.deleteWishList
);


module.exports = router