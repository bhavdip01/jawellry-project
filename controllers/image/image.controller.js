// const image = require("../../models/image.model")

// const BASE_URL = 'http://localhost:3000';

// const imageupload = async (req,res,next) =>{
//     try {
      
//       const fullImageUrl = `${BASE_URL}/${req.file.path.replace(/\\/g, '/')}`;
      
//       const {originalname,size,mimetype} = req.file
      
//       // console.log("==============>",req.file)

//         const payload ={
//           image:fullImageUrl,
//           imageName:originalname,
//           mimeType:mimetype,
//           size:size,
//           isactive:true,
//           deleted:false
//         }
//         // console.log("=================>123",payload)

//         let tempVar = await image.create(payload)

//         res.status(200).json({
//           error: false,
//           message: "user created successfully",
//           data: tempVar
//         })
    


//     } catch (error) {
//       console.log(error)
//       return res.status(200).send(error);
//     }
// }


// module.exports = {
//   imageupload
//   };