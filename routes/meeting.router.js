const express = require('express');
const router = express.Router();

const meeting = require("../controllers/meeting/meeting.controller")

router.route("/").post(meeting.createMeeting);
router.route("/").get(meeting.getMeeting);
router.route("/").put(meeting.updateMetting);
router.route("/").delete(meeting.deleteMeeting);
router.route("/status").put(meeting.meetingStatusUpdate)


module.exports = router