const express = require('express');
const router = express.Router();

const meeting = require("../controllers/meeting/meeting.controller")

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")


const {
    MEETING : { VALIDATOR }
} = require("../controllers")

router.route("/").post(
    auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
    VALIDATOR.createMeeting,
    meeting.createMeeting
);

router.route("/").get(
    auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
    VALIDATOR.getMeeting,
    meeting.getMeeting
);

router.route("/").put(
    auth({ usersAllowed: [ROLE.USER] }),
    VALIDATOR.updateMeeting,
    meeting.updateMetting
);

router.route("/").delete(
    auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
    VALIDATOR.deleteMeeting,
    meeting.deleteMeeting
);

router.route("/status").put(
    auth({ usersAllowed: [ROLE.ADMIN] }),
    VALIDATOR.meetingStatusUpdate,
    meeting.meetingStatusUpdate
);


module.exports = router