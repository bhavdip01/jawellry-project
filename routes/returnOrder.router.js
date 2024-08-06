const express = require('express');
const router = express.Router();

const returnOrder = require("../controllers/returnOrder/returnOrder.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")


const {
    RETURN_ORDER: { VALIDATOR },
  } = require("../controllers");

router.route("/").post(
  auth({ usersAllowed: [ROLE.ADMIN,ROLE.USER] }),
  VALIDATOR.createReturnOrder,
  returnOrder.createReturnOrder
);

router.route("/").get(
  auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
  VALIDATOR.getReturnOrder,
  returnOrder.getReturnOrder
);

router.route("/").put(
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.updateReturnOrderStatus,
  returnOrder.updateReturnOrderStatus
);

router.route("/").delete(
  auth({ usersAllowed: [ROLE.ADMIN,ROLE.USER] }),
  VALIDATOR.deleteReturnOrder,
  returnOrder.deleteReturnOrder
);



module.exports = router;