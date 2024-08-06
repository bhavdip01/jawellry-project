
const mongoose = require("mongoose")
const addCart = require("../../models/addtocart.model")
const {MESSAGE} = require("../../helpers/constant.helper")


const createAddToCart = async(req,res,next)=>{

    try {
         
        const {quantity,productId,userId} = req.body

        const payload = {
            quantity:quantity,
            productId:productId,
            userId:userId,
        }

        let cartData = await addCart.create(payload)

        return res.status(200).send({
            message: MESSAGE.SUCCESS,
            payload:cartData
        })

    } catch (error) {
        return res.status(500).send(error);
    }
}

const getAddToCart = async(req,res,next)=>{

    try {
        const  { id,userid,page,limit} = req.query
        let skip = (page - 1) * limit

        // if(!mongoose.Types.ObjectId.isValid(id) && !mongoose.Types.ObjectId.isValid(userid)){
        //     return res.status(400).send({
        //         message:"Id is required"
        //     })
        // }
        let query = {}
        if(id){
            query = { _id: id }
        }
        if(userid){
            query = { userId: userid }
        }

        let addToCartData = await addCart.find(query).skip(skip).limit(limit)
        .populate({
            path: 'productId',
            model: 'Product'
        })
        .populate({
            path: 'userId',
            model: 'User'
        })

        return res.status(200).send({
            message: MESSAGE.FETCH_SUCCESSFULLY,
            payload:addToCartData
        })
        
    } catch (error) {
        return res.status(500).send(error);
    }
}

const updateAddToCart = async(req,res,next)=>{
    try {
        const {user_id} = req.query

        const payload = {
            quantity:req.body.quantity
        }

        let cartData = await addCart.findOneAndUpdate(
            {
                userId : user_id
            },
            {
                $set: payload
            },
            {
                new:true
            }
        )
        return res.status(200).send({
            message: MESSAGE.UPDATED_SUCCESSFULLY,
            payload:cartData
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

const deleteAddToCart = async(req,res,next)=>{

    try {
        const {product_Id} = req.query
        await addCart.findOneAndDelete({
            productId : product_Id
        })

        return res.status(200).send({
            message: MESSAGE.DELETED_SUCCESSFULLY,
            
        })

    } catch (error) {
        return res.status(500).send(error);
    }
}



module.exports = {createAddToCart,getAddToCart,deleteAddToCart,updateAddToCart}