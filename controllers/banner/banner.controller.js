const { response } = require("../../helpers");
const banner = require("../../models/banner.model")
const image = require("../../models/image.model")
const fs = require("fs");
const port = process.env.PORT


const createBanner = async (req,res) => {
    try {

        const bannerExists = await banner.findOne({ name: req.body.name})
        if(bannerExists) {
            return res.send("banner already exists!")
        }
        const imagesData = await Promise.all(req.files.map(async (file) =>{
        const {size,mimetype,path,filename} = file
        const publicIndex = path.indexOf('/Public');
        let imagePath = path.substring(publicIndex);

        const payload = {
            image:`https://localhost:9003${imagePath}`,
            imageName:filename,
            mimetype:mimetype,
            size:size,
            path:path
        }
            return await image.create(payload)
        }));

        const imageIds = imagesData.map((img) => img._id);
        req.body.imageId = imageIds;

        // let {name,description} = req.body
        // const payload = {
        //     name:name,
        //     description:description
        // }
        
        let bannerData = await banner.create(req.body);

        return res.status(200).send({
            message:"bannerData create successfully",
            payload:bannerData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }   
}

const getBanner = async (req, res) => {
    try {
        const {id,name,ismain,page,limit} = req.query
        let bannerdata
        let skip = (page -1) * limit

        if(id){     
            bannerdata = await banner.findOne({
                _id:id
            })
        }
        else if(name){
            bannerdata = await banner.findOne({
                name:name
            }).skip(skip).limit(limit)
        }
        else if(ismain){
            bannerdata = await banner.find({
                isMain:ismain
            }).skip(skip).limit(limit)
        }
        
        return res.status(200).send({
            message:"bannerData create successfully",
            payload:bannerdata
        })
    } catch (error) {
        return res.status(500).send({error})
    }
    
}

const updateBanner = async (req, res) => {
    try {
        const {id} = req.query

        const payload = {
            name:req.body.name,
            description:req.body.description,
            isMain:req.body.isMain
        }

        let bannerData = await banner.findOneAndUpdate(
            {
                _id:id
            },
            {
                $set : payload
            },
            {
                new:true
            }
        )

        return res.status(200).send({
            message:"bannerData create successfully",
            payload:bannerData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }
}

const deleteBanner = async (req, res) => {
    const { bannerId } = req.query;

    try {

        const banners = await banner.findById(bannerId);
        const imageId = banners.imageId;
        // console.log("======>11",imageId)


        const images = await image.findById(imageId);
        const imagePath = images.path;
        // console.log("======>22",imagePath)

        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

            await image.findOneAndDelete(imageId);
        // console.log("======>23",aas)

    
            await banner.findOneAndDelete(bannerId);
        // console.log("======>23",vgc)

        return res.status(200).send({
            message: "Deleted successfully",
        });
    } catch (error) {
        return res.status(500).send({error});
    }

}

const addBanner = async (req, res) => {
    try {
        let bannerdata = await banner.findOne({ name: req.body.name});

        const imagesData = await Promise.all(req.files.map(async (file) =>{
            const {size,mimetype,path,filename} = file
            const publicIndex = path.indexOf('/Public');
            let imagePath = path.substring(publicIndex)

            const payload = {
                image:`https://localhost:9003${imagePath}`,
                imageName:filename,
                mimetype:mimetype,
                size:size,
                path:path,
            }

            const createbanner = await image.create(payload)
            return createbanner._id
        }));

        const imageIds = imagesData.map((img) => img._id);
        console.log(imageIds);

        await banner.updateOne(
            {_id:bannerdata._id},
            {$set: {imageId :imageIds}}
        );

        bannerdata = await banner.findOne({_id:banner._id});

        return res.status(200).send({
            message:"bannerData create successfully",
            payload:bannerdata
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({error})
    }
}

const removeBannerimage = async(req, res) => {
    const { _id } = req.query
    const images = await image.findOne({ _id })
   
    const imagePath = images.path


    await image.findOneAndDelete({_id})
    await banner.updateMany(
      {imageId: _id},   
      {$unset : {imageId : _id}},
    )

    if(fs.existsSync(imagePath)){
     
      fs.unlink(imagePath , (err)=>{
       
        console.log(err)
      })
    }
    return res.status(200).send({
        message:"deleted successfully",
    })
}



module.exports = {
    createBanner,
    getBanner,
    updateBanner,
    addBanner,
    removeBannerimage,
    deleteBanner
}