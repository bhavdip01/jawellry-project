const express = require('express');
const router = express.Router();

const uploads = require("../services/file/image.upload")
const banner = require("../controllers/banner/banner.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

router.route("/").post(auth({ usersAllowed: [ROLE.ADMIN] }),uploads,banner.createBanner);
router.route("/").get(banner.getBanner);
router.route("/updateBanner").put(auth({ usersAllowed: [ROLE.ADMIN] }),banner.updateBanner);
router.route("/").delete(auth({ usersAllowed: [ROLE.ADMIN] }),banner.deleteBanner);
router.route("/").put(auth({ usersAllowed: [ROLE.ADMIN] }),uploads,banner.addBanner);
router.route("/deleteBannerImage").delete(auth({ usersAllowed: [ROLE.ADMIN] }),banner.removeBannerimage); 




module.exports = router;    