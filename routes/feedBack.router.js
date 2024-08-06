const express = require('express');
const router = express.Router();


const feedBack = require("../controllers/feedBack/feedBack.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    FEED_BACK: { VALIDATOR },
  } = require("../controllers");

router.route("/").post(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.createFeedBack,
  feedBack.createFeedBack
);

router.route("/").get(
  auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
  VALIDATOR.getFeedBack,
  feedBack.getFeedBack
);

router.route("/").put(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.updateFeedBack,
  feedBack.updateFeedBack
);

router.route("/").delete(
  auth({ usersAllowed: [ROLE.USER] }),
  VALIDATOR.deleteFeedBack,
  feedBack.deleteFeedBack
);







module.exports = router;    