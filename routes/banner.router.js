const express = require('express');
const router = express.Router();

const uploads = require("../services/file/image.upload")
const banner = require("../controllers/banner/banner.controller");
// const { remove } = require('winston');

router.route("/").post(uploads,banner.createBanner);
router.route("/").get(banner.getBanner);
router.route("/updateBanner").put(banner.updateBanner);
router.route("/").delete(banner.deleteBanner);
router.route("/").put(uploads,banner.addBanner);
router.route("/deleteBannerImage").delete(banner.removeBannerimage); 




module.exports = router;    