const useCoupon = require("../../models/useCoupon.model")
const { MESSAGE } = require("../../helpers/constant.helper")

const createUseCoupon = async(req,res,next)=>{
    try {
        const {couponId,userId} = req.body
        
        const payload = {
            couponId:couponId,
            userId:userId
        }
        
        let useCouponData = await useCoupon.create(payload)

        return res.status(200).send({
            message: MESSAGE.SUCCESS,
            payload:useCouponData
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getUseCoupon = async(req,res,next)=>{
    try {
        
        const { id,page,limit} = req.query
        let skip = (page -1) * limit

        let query = {}
        if(id){
            query = {_id:id}
        }

        let useCouponData = await useCoupon.find(query).skip(skip).limit(limit)
        .populate({
            path: 'couponId',
            model: 'coupon'
        })
        .populate({
            path: 'userId',
            model: 'User'
        });
        
        return res.status(200).send({
            message: MESSAGE.FETCH_SUCCESSFULLY,
            payload:useCouponData
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    createUseCoupon,
    getUseCoupon
}