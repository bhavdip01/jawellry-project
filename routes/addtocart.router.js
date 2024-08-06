const express = require("express");
const router = express.Router();

const addCart = require("../controllers/addToCart/addToCart.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    ADD_TO_CART : { VALIDATOR }
} = require("../controllers")

router.route("/addCart").post(
    auth({ usersAllowed: [ROLE.USER] }),
    VALIDATOR.createAddToCart,
    addCart.createAddToCart
);

router.route("/getCart").get(
    auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
    VALIDATOR.getAddToCart,
    addCart.getAddToCart
);

router.route("/updateCart").put(
    auth({ usersAllowed: [ROLE.USER] }),
    VALIDATOR.updateAddToCart,
    addCart.updateAddToCart
);

router.route("/deleteCart").delete(
    auth({ usersAllowed: [ROLE.USER] }),
    VALIDATOR.deleteAddToCart,
    addCart.deleteAddToCart
);


module.exports = router