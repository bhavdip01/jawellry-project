const express = require("express");
const router = express.Router();

const termAndCondition  = require("../controllers/termAndCondition/termAndCondition.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/addtermAndCondition").post(auth({ usersAllowed: [ROLE.ADMIN] }),termAndCondition.createtermAndCondition)
router.route("/gettermAndCondition").get(termAndCondition.gettermAndCondition)
router.route("/updatetermAndCondition").put(auth({ usersAllowed: [ROLE.ADMIN] }),termAndCondition.updatetermAndCondition)
router.route("/deletetermAndCondition").delete(auth({ usersAllowed: [ROLE.ADMIN] }),termAndCondition.deletetermAndCondition)

module.exports = router