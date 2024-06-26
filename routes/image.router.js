const express = require("express");
const router = express.Router();
const uploads = require("../services/file/image.upload")

// const images = require("../controllers/image/image.controller")
// const upload = multer({
//     storage:multer.diskStorage({
//       destination:function(req,file,cb)
//       {
//         cb(null,"IMAGE")
//       },
//       filename:function(req,file,cb)
//       {
//         cb(null,file.filename+"-"+Date.now()+".jpg")
//       }
//     })
//   }).single("image")



router.route("/imageupload").post(uploads)

module.exports = router;