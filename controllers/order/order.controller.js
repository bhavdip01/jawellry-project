const order = require("../../models/order.model")

const addOrder = async(req,res,next)=>{
    try {
        const {userId,productId,addToCartId,couponId,addressId,orderStatus,phoneNumber} = req.body

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
        let orderData = await order.create(payload)

        return res.status(200).send({
            message:"oeder created successfully",
            payload:orderData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

const getOrder = async(req,res,next)=>{
    try {
        const {id,user_id,search,orderStatus,page,limit} = req.query
        let orderData
        let skip = (page -1) * limit
        
        if(id){
            orderData = await order.findOne({_id : id})
            .populate({
                path: 'productId',
                model: 'Product'
            })
            .populate({
                path:"userId",
                model:"User"
            })
            .populate({
                path: 'addToCartId',
                model: 'addToCart'
            })
            .populate({
                path:"couponId",
                model:"coupon"
            })
            .populate({
                path:"addressId",
                model:"address"
            })
        }
        else if(user_id){
            orderData = await order.find({userId : user_id}).skip(skip).limit(limit)
            .populate({
                path: 'productId',
                model: 'Product'
            })
            .populate({
                path:"userId",
                model:"User"
            })
            .populate({
                path: 'addToCartId',
                model: 'addToCart'
            })
            .populate({
                path:"couponId",
                model:"coupon"
            })
            .populate({
                path:"addressId",
                model:"address"
            })
        }
        else if(search && search != ''){ 

            orderData = await order.find({randomOrderNumber : {$regex : search}}).skip(skip).limit(limit)
        }
        else if(orderStatus){
            orderData = await order.find({orderStatus : orderStatus}).skip(skip).limit(limit)
        }
        return res.status(200).send({
            message:"orderData fetch successfully",
            payload:orderData
        })

     
    } catch (error) {
        return res.status(200).send(error)
    }
}

const updateOrder = async(req,res,next)=>{
    try {
        const {id} = req.query

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
            message:"order updated successfully",
            payload:orderData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

module.exports = {
    addOrder,
    getOrder,
    updateOrder
}