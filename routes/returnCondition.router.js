const express = require("express");
const router = express.Router();

const returnCondition = require("../controllers/returnCondition/returnCondition.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/").post(auth({ usersAllowed: [ROLE.ADMIN] }),returnCondition.createReturnCondition);
router.route("/").get(returnCondition.getReturnCondition);
router.route("/").put(auth({ usersAllowed: [ROLE.ADMIN] }),returnCondition.updateReturnCondition);
router.route("/").delete(auth({ usersAllowed: [ROLE.ADMIN] }),returnCondition.deleteReturnCondition);

module.exports = router;