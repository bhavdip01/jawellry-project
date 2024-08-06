const express = require('express');
const router = express.Router();

const uploads = require("../services/file/image.upload")
const banner = require("../controllers/banner/banner.controller");

const { auth } = require("../middleware/auth");
const {
    ENUM: { ROLE },
} = require("../helpers/constant.helper")

const {
    BANNER: { VALIDATOR },
} = require("../controllers")

router.route("/").post(
    auth({ usersAllowed: [ROLE.ADMIN] }),
    uploads,
    VALIDATOR.createBanner, 
    banner.createBanner
);

router.route("/").get(
    auth({ usersAllowed: [ROLE.USER , ROLE.ADMIN] }),
    VALIDATOR.getBanner,
    banner.getBanner
);

router.route("/updateBanner").put(
    auth({ usersAllowed: [ROLE.ADMIN] }),
    VALIDATOR.updateBanner,
    banner.updateBanner
);

router.route("/").delete(
    auth({ usersAllowed: [ROLE.ADMIN] }),
    VALIDATOR.deleteBanner,
    banner.deleteBanner
);

router.route("/").put(
    auth({ usersAllowed: [ROLE.ADMIN] }),
    uploads,
    VALIDATOR.addBanner,
    banner.addBanner
);

router.route("/deleteBannerImage").delete(
    auth({ usersAllowed: [ROLE.ADMIN] }),
    VALIDATOR.removeBannerimage,
    banner.removeBannerimage
); 




module.exports = router;    