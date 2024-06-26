const express = require('express');
const router = express.Router();


const feedBack = require("../controllers/feedBack/feedBack.controller");

router.route("/").post(feedBack.createFeedBack),
router.route("/").get(feedBack.getFeedBack),
router.route("/").put(feedBack.updateFeedBack),
router.route("/").delete(feedBack.deleteFeedBack)







module.exports = router;    