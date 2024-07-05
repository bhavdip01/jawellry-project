const express = require('express');
const router = express.Router();


const feedBack = require("../controllers/feedBack/feedBack.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/").post(auth({ usersAllowed: [ROLE.USER] }),feedBack.createFeedBack),
router.route("/").get(feedBack.getFeedBack),
router.route("/").put(auth({ usersAllowed: [ROLE.USER] }),feedBack.updateFeedBack),
router.route("/").delete(auth({ usersAllowed: [ROLE.USER] }),feedBack.deleteFeedBack)







module.exports = router;    