const express = require("express");
const router = express.Router();

const tremAndCondition  = require("../controllers/tremAndCondition/tremAndCondition.controller")


router.route("/addTremAndCondition").post(tremAndCondition.createTremAndCondition)
router.route("/getTremAndCondition").get(tremAndCondition.getTremAndCondition)
router.route("/updateTremAndCondition").put(tremAndCondition.updateTremAndCondition)
router.route("/deleteTremAndCondition").delete(tremAndCondition.deleteTremAndCondition)

module.exports = router