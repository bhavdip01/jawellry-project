const express = require("express");
const router = express.Router();

const privacyAndPolicy = require("../controllers/privacyAndPolicy/privacyAndPolicy.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE }
} = require("../helpers/constant.helper")

const {
    PRIVACY_AND_POLICY: { VALIDATOR },
  } = require("../controllers");

router.route("/addPrivacyAndPolicy").post(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.createPrivacyAndPolicy,
  privacyAndPolicy.createPrivacyAndPolicy
);

router.route("/getPrivacyAndPolicy").get(
  auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
  VALIDATOR.getPrivacyAndPolicy,
  privacyAndPolicy.getPrivacyAndPolicy
);

router.route("/updatePrivacyAndpolicy").put(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.updatePrivacyAndPolicy,
  privacyAndPolicy.updatePrivacyAndPolicy
);

router.route("/deletePrivacyAndPolicy").delete(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.deletePrivacyAndPolicy,
  privacyAndPolicy.deletePrivacyAndPolicy
);


module.exports = router