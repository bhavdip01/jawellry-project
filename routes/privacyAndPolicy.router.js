const express = require("express");
const router = express.Router();

const privacyAndPolicy = require("../controllers/privacyAndPolicy/privacyAndPolicy.controller")


router.route("/addPrivacyAndPolicy").post(privacyAndPolicy.createPrivacyAndPolicy)
router.route("/getPrivacyAndPolicy").get(privacyAndPolicy.getPrivacyAndPolicy)
router.route("/updatePrivacyAndpolicy").put(privacyAndPolicy.updatePrivacyAndPolicy)
router.route("/deletePrivacyAndPolicy").delete(privacyAndPolicy.deletePrivacyAndPolicy)


module.exports = router