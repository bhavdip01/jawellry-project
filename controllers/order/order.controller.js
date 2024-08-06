const order = require("../../models/order.model")
const product = require("../../models/product.model")
const { MESSAGE } = require("../../helpers/constant.helper") 

const addOrder = async(req,res,next)=>{
    try {

        const {userId,productId,addToCartId,couponId,addressId,orderStatus,phoneNumber,Engraving} = req.body
            
        const checkUseCoupon = await order.findOne({usedId: userId, couponId: couponId})
        if(checkUseCoupon){
            return res.status(200).send({ message: MESSAGE.USE_COUPON})
        }
            
        const productdata = await product.findById(productId)

        const generateRandomNumber = () => {
            let randomNum = Math.floor(Math.random() * 100000000);
        
            while (randomNum < 10000000) {
                randomNum = Math.floor(Math.random() * 100000000);
            }
        
            return randomNum;
        }; 
        
       
        const payload = {
            userId:userId,
            productId:productId,
            addToCartId:addToCartId,
            couponId:couponId,
            addressId:addressId,
            orderStatus:orderStatus,
            randomOrderNumber:`Order_${generateRandomNumber()}`,
            phoneNumber:phoneNumber
        }

         if(productdata.isEngraving === true) {
            payload.Engraving = Engraving
         }
        
        let orderData = await order.create(payload)

        return res.status(200).send({
            message: MESSAGE.SUCCESS,
            payload:orderData
        })
    } catch (error) {
        return res.status(500).send(error);
    }
} 

const getOrder = async(req,res,next)=>{
    try {
        const {id,user_id,search,orderStatus,page,limit} = req.query
        let skip = (page -1) * limit
        
        let query = {}
        if(id){
            query = { _id: id}
        }
        if(user_id){
            query = { userId: user_id}
            
        }
        if(search){
            query = { randomOrderNumber : {$regex : search}}
        }
        if(orderStatus){
            query = { orderStatus : orderStatus}
        }
       
        let orderData = await order.find(query).skip(skip).limit(limit)
        .populate({
            path: 'productId',
            model: 'Product',
            select: "name quantity price -_id"
        })
        .populate({
            path:"userId",
            model:"User",
            select: "firstName lastName email -_id"
        })
        .populate({
            path: 'addToCartId',
            model: 'addToCart',
            select: "quantity -_id"
        })
        .populate({
            path:"couponId",
            model:"coupon",
            select: "couponName discountType couponCode amoount -_id"
        })
        .populate({
            path:"addressId",
            model:"address",
            select: "address addressType city pincode -_id"
        })

        return res.status(200).send({
            message: MESSAGE.FETCH_SUCCESSFULLY,
            payload:orderData
        })

     
    } catch (error) {
        return res.status(500).send(error)
    }
}

const updateOrder = async(req,res,next)=>{
    try {
        const {id} = req.query

        let checkOrder = await order.findOne({ _id: id})
        if(!checkOrder){
            return res.status(404).send({ message: MESSAGE.NOT_FOUND})
        }

        const payload = {
            orderStatus:req.body.orderStatus
        }

        let  orderData = await order.findOneAndUpdate(
            {
                _id : id
            },
            {
                $set : payload
            },
            {
                new: true
            }
        )

        return res.status(200).send({
            message: MESSAGE.UPDATED_SUCCESSFULLY,
            payload:orderData
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    addOrder,
    getOrder,
    updateOrder
}