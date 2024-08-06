const express = require("express");
const router = express.Router();

const returnCondition = require("../controllers/returnCondition/returnCondition.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    RETURN_CONDITION: { VALIDATOR },
  } = require("../controllers");

router.route("/").post(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.createReturnCondition,
  returnCondition.createReturnCondition
);

router.route("/").get(
  auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
  VALIDATOR.getReturnCondition,
  returnCondition.getReturnCondition
);

router.route("/").put(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.updateReturnCondition,
  returnCondition.updateReturnCondition
);

router.route("/").delete(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.deleteReturnCondition,
  returnCondition.deleteReturnCondition
);

module.exports = router;