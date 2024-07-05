const express = require('express');
const router = express.Router();

const returnOrder = require("../controllers/returnOrder/returnOrder.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/").post(auth({ usersAllowed: [ROLE.ADMIN,ROLE.USER] }),returnOrder.createReturnOrder);
router.route("/").get(returnOrder.getReturnOrder);
router.route("/").put(auth({ usersAllowed: [ROLE.ADMIN] }),returnOrder.returnOrderStatusUpdate);
router.route("/").delete(auth({ usersAllowed: [ROLE.ADMIN,ROLE.USER] }),returnOrder.deleteReturnOrder);



module.exports = router;