const coupon = require("../../models/coupon.model")
const useCoupon = require("../../models/useCoupon.model")


const createCoupon = async(req,res,next)=>{
    try {
    
        const { couponName,couponCode,discountType,amount,isActive,isDeleted,startDate,endDate,startTime,endTime } = req.body

        let checkCouponCode = await coupon.findOne({couponCode:couponCode})
        if(checkCouponCode){
            return res.send("couponCode already exists!")
        }

        const payload = {
            couponName:couponName,
            couponCode:couponCode,
            discountType:discountType,
            amount:amount,  
            isActive:isActive,
            isDeleted:isDeleted,
            startDate:startDate,
            endDate:endDate,
            startTime:startTime,
            endTime:endTime
        }
 

        let couponData = await coupon.create(payload)

         return res.status(200).send({
            message:"coupon Data create successfully",
            payload:couponData
         })

    } catch (error) {
        console.log(error)
        return res.status(200).send(error);
    }
}

const getCoupon = async(req,res,next)=>{
    try {
        const {id,couponname,page,limit} = req.query
        let couponData
        let skip = (page -1) * limit

        checkCoupon = await useCoupon.findOne({couponId:id})
        if(checkCoupon){
            return res.send("user already use coupon")
        }

        if(id){
            couponData = await coupon.findOne({_id : id})
        }
        else if(couponname){
            couponData = await coupon.find({couponName : couponname}).skip(skip).limit(limit)
        }
           

        return res.status(200).send({
            message:"couponData fetch successfully",
            payload:couponData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

const updateCoupon = async (req,res,next)=>{
    try {
        const {id} = req.query

        const payload = {
            amount:req.body.amount,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            startTime:req.body.startTime,
            endTime:req.body.endTime
        }

        let couponData = await coupon.findOneAndUpdate(
            {
                _id : id
            },
            {
                $set:payload
            },
            {
                new:true
            }
        )

        return res.status(200).send({
            message:"couponData updated successfully",
            payload:couponData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

const deleteCoupon = async (req,res,next)=>{
    try {
        const {id} = req.query

        await coupon.findOneAndDelete({
            _id : id
        })

        return res.status(200).send({
            message:"coupon deleted succesfully",
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

module.exports = {
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}