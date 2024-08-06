const { response } = require("../../helpers");
const banner = require("../../models/banner.model")
const image = require("../../models/image.model")
const { MESSAGE } = require("../../helpers/constant.helper")
const fs = require("fs");
const port = process.env.PORT


const createBanner = async (req, res) => {
    try {

        const bannerExists = await banner.findOne({ name: req.body.name })
        if (bannerExists) {
            return res.send({ message: MESSAGE.ALREADY_EXISTS })
        }
        const imagesData = await Promise.all(req.files.map(async (file) => {
            const { size, mimetype, path, filename } = file
            const publicIndex = path.indexOf('/Public');
            let imagePath = path.substring(publicIndex);

            const payload = {
                image: `https://localhost:${port}${imagePath}`,
                imageName: filename,
                mimetype: mimetype,
                size: size,
                path: path
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
            message: MESSAGE.SUCCESS,
            payload: bannerData
        })
    } catch (error) {
        return res.status(500).send({ error })
    }
}

const getBanner = async (req, res) => {
    try {
        const { id, name, ismain, page, limit } = req.query
        let skip = (page - 1) * limit

        let query = { isDeleted: false }
        if (id) {
            query = { _id: id }
        }
        else if (name) {
            query = { name: name }
        }
        else if (ismain) {
            query = { isMain: ismain }
        }

        let bannerdata = await banner.find(query).skip(skip).limit(limit)

        return res.status(200).send({
            message: MESSAGE.FETCH_SUCCESSFULLY,
            payload: bannerdata
        })
    } catch (error) {
        return res.status(500).send({ error })
    }

}

const updateBanner = async (req, res) => {
    try {
        const { id } = req.query

        let checkBanner = await banner.findOne({ _id: id })
        if (!checkBanner) {
            return res.status(404).send({ message: MESSAGE.NOT_FOUND })
        }

        const payload = {
            name: req.body.name,
            description: req.body.description,
            isMain: req.body.isMain
        }

        let bannerData = await banner.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: payload
            },
            {
                new: true
            }
        )

        return res.status(200).send({
            message: MESSAGE.UPDATED_SUCCESSFULLY,
            payload: bannerData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error })
    }
}

const deleteBanner = async (req, res) => {
    const { bannerId } = req.query;

    try {

        const banners = await banner.findOne({ _id: bannerId });
        const imageId = banners.imageId;


        const images = await image.findById(imageId);
        const imagePath = images.path;

        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        await image.findOneAndDelete(imageId);

        await banner.findOneAndDelete(bannerId);

        return res.status(200).send({
            message: MESSAGE.DELETED_SUCCESSFULLY,
        });

    } catch (error) {
        return res.status(500).send({ error });
    }

}

const addBanner = async (req, res) => {
    try {
        let bannerdata = await banner.findOne({ name: req.body.name });

        const imagesData = await Promise.all(req.files.map(async (file) => {
            const { size, mimetype, path, filename } = file
            const publicIndex = path.indexOf('/Public');
            let imagePath = path.substring(publicIndex)

            const payload = {
                image: `https://localhost:${port}${imagePath}`,
                imageName: filename,
                mimetype: mimetype,
                size: size,
                path: path,
            }

            const createbanner = await image.create(payload)
            return createbanner._id
        }));

        const imageIds = imagesData.map((img) => img._id);

        await banner.updateOne(
            { _id: bannerdata._id },
            { $set: { imageId: imageIds } },
        );

        bannerdata = await banner.findOne({ _id: banner._id });

        return res.status(200).send({
            message: MESSAGE.SUCCESS,
            payload: bannerdata
        })
    } catch (error) {
        return res.status(500).send({ error })
    }
}

const removeBannerimage = async (req, res) => {
    try {
        const { _id } = req.query
        const images = await image.findOne({ _id })

        const imagePath = images.path


        await image.findOneAndDelete({ _id })
        await banner.updateMany(
            { imageId: _id },
            { $unset: { imageId: _id } },
        )

        if (fs.existsSync(imagePath)) {

            fs.unlink(imagePath, (err) => {

                console.log(err)
            })
        }
        return res.status(200).send({
            message: MESSAGE.SUCCESS,
        })
    } catch (error) {
        return res.status(500).send({ error })
    }

}



module.exports = {
    createBanner,
    getBanner,
    updateBanner,
    addBanner,
    removeBannerimage,
    deleteBanner
}