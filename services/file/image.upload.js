
const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    const productname = req.body.name;
    const dir = path.join(__dirname, '../../Public/Image',productname)
    // console.log("dir=========>",dir)

    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir,{recursive : true})  
    }
    cb(null, dir); 

  },
  filename: function (req, file, cb) {
   
    cb(null,Date.now() +'_'+(file.originalname))
  }
});
const upload = multer({ storage: storage }).array('image',10);



module.exports = upload;
