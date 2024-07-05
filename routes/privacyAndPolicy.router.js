const express = require("express");
const router = express.Router();

const privacyAndPolicy = require("../controllers/privacyAndPolicy/privacyAndPolicy.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE }
} = require("../helpers/constant.helper")


router.route("/addPrivacyAndPolicy").post(auth({ usersAllowed: [ROLE.ADMIN] }),privacyAndPolicy.createPrivacyAndPolicy)
router.route("/getPrivacyAndPolicy").get(privacyAndPolicy.getPrivacyAndPolicy)
router.route("/updatePrivacyAndpolicy").put(auth({ usersAllowed: [ROLE.ADMIN] }),privacyAndPolicy.updatePrivacyAndPolicy)
router.route("/deletePrivacyAndPolicy").delete(auth({ usersAllowed: [ROLE.ADMIN] }),privacyAndPolicy.deletePrivacyAndPolicy)


module.exports = router