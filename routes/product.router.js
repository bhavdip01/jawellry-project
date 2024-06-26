const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  ENUM: { ROLE },
} = require("../helpers/constant.helper");

const {
  PRODUCT: { VALIDATOR, APIS },
} = require("../controllers");

router.post(
  "/",
  auth({ usersAllowed: [ROLE.ADMIN] }),
  uploads,
  VALIDATOR.create,
  APIS.create
);

router.get(
  "/",
  // auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.get,
  APIS.get
);

router.put(
  "/",
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.update,
  APIS.update,
);

router.put(
  "/addProductImage",
  uploads,
  VALIDATOR.update,
  APIS.addProductImage

)

router.delete(
  "/",
  auth({ usersAllowed: [ROLE.ADMIN] }),
  VALIDATOR.delete,
  APIS.delete
)

router.delete(
  "/removeImage",
  VALIDATOR.removeImage,
  APIS.removeImage,
)

router.get(
  "/getProduct",
  VALIDATOR.getProduct,
  APIS.getProduct,
)

module.exports = router;
