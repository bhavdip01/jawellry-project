const useCoupon = require("../../models/useCoupon.model")

const createUseCoupon = async(req,res,next)=>{
    try {
        const {couponId,userId} = req.body
        
        const payload = {
            couponId:couponId,
            userId:userId
        }
        
        let useCouponData = await useCoupon.create(payload)

        return res.status(200).send({
            message:"useCoupon Data create successfuly",
            payload:useCouponData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

const getUseCoupon = async(req,res,next)=>{
    try {
        
        const { id } = req.query

        let useCouponData = await useCoupon.findOne({_id : id})
        // .populate({
        //     path: 'couponId',
        //     model: 'coupon'
        // })
        // .populate({
        //     path: 'userId',
        //     model: 'User'
        // });
        
        return res.status(200).send({
            message:"useCouponData fetch successfully",
            payload:useCouponData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

module.exports = {
    createUseCoupon,
    getUseCoupon
}