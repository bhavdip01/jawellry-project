const express = require("express");
const router = express.Router();

const order = require("../controllers/order/order.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    ORDER : { VALIDATOR }
} = require("../controllers")


router.route("/addOrder").post(
    auth({ usersAllowed: [ROLE.USER] }),
    VALIDATOR.addOrder,
    order.addOrder
);

router.route("/getOrder").get(
    auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
    VALIDATOR.getOrder,
    order.getOrder
);

router.route("/updateOrder").put(
    auth({ usersAllowed: [ROLE.ADMIN] }),
    VALIDATOR.updateOrder,
    order.updateOrder
);


module.exports = router