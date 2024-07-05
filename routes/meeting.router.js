const express = require('express');
const router = express.Router();

const meeting = require("../controllers/meeting/meeting.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/").post(auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),meeting.createMeeting);
router.route("/").get(meeting.getMeeting);
router.route("/").put(auth({ usersAllowed: [ROLE.USER] }),meeting.updateMetting);
router.route("/").delete(auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),meeting.deleteMeeting);
router.route("/status").put(auth({ usersAllowed: [ROLE.ADMIN] }),meeting.meetingStatusUpdate)


module.exports = router