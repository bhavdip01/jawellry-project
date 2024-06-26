const mongoose = require("mongoose")
const wishList = require("../../models/wishList.model")

const createWishList = async(req,res,next)=>{

    try {
         
        const { productId,userId } = req.body

        const payload = {
            productId:productId,
            userId:userId,
        }

        let wishListData = await wishList.create(payload)

        return res.status(200).send({
            message:"wishList product successfully",
            payload:wishListData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

const getWishList = async(req,res,next)=>{

    try {
        const  { id,userid,page,limit} = req.query
        const skip = (page - 1) * limit;

        if(!mongoose.Types.ObjectId.isValid(id) && !mongoose.Types.ObjectId.isValid(userid)){
            return res.status(400).send({
                message:"Id is required"
            })
        }
        else if(id){
            let wishListData = await wishList.findOne({ _id: id})
            
            .populate({
                path: 'productId',
                model: 'Product'
            })
            .populate({
                path: 'userId',
                model: 'User'
            });

            return res.status(200).send({
                message:"wishList product successfully",
                payload:wishListData
            })

        }
        else if(userid){
            let wishListData = await wishList.find({ userId: userid}).skip(skip).limit(limit)
            .populate({
                path: 'productId',
                model: 'Product'
            })
            .populate({
                path: 'userId',
                model: 'User'
            });

            return res.status(200).send({
                message:"wishList product successfully",
                payload:wishListData
            })
        }
        
    } catch (error) {
        return res.status(200).send(error);
    }
}

const deleteWishList = async(req,res,next)=>{

    try {
        const {product_Id} = req.query
        await wishList.findOneAndDelete({
            productId : product_Id
        })

        return res.status(200).send({
            message:"product delete successfully",
            
        })

    } catch (error) {
        return res.status(200).send(error);
    }
}




module.exports = {createWishList,getWishList,deleteWishList}