const express = require("express");
const router = express.Router();

const termAndCondition  = require("../controllers/termAndCondition/termAndCondition.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    TERM_AND_CONDITION: { VALIDATOR },
  } = require("../controllers");

router.route("/addtermAndCondition").post(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.createTermAndCondition,
  termAndCondition.createTermAndCondition
);

router.route("/gettermAndCondition").get(
  auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
  VALIDATOR.getTermAndCondition,
  termAndCondition.getTermAndCondition
);

router.route("/updatetermAndCondition").put(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.updateTermAndCondition,
  termAndCondition.updateTermAndCondition
);

router.route("/deletetermAndCondition").delete(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.deleteTermAndCondition,
  termAndCondition.deleteTermAndCondition
);

module.exports = router