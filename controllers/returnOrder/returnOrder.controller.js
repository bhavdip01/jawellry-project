const returnOrder = require("../../models/returnOrder.model")


const createReturnOrder = async(req,res) => {
    try {
        const {productId, orderId, pickupAddressId, description,status} = req.body

        const payload = {
            productId:productId,
            orderId:orderId,
            pickupAddressId: pickupAddressId,
            description: description,
            status: status
        }

        let returnOrderData = await returnOrder.create(payload)

        return res.status(200).send({
            message:"returnOrderData creates successfully",
            payload:returnOrderData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }
}

const getReturnOrder = async(req,res) => {
    try {
        
        const {id,orderid,productid,status,page,limit} = req.query
        let returnOrderData
        let skip = (page -1) * limit

        if(id){
            returnOrderData = await returnOrder.findOne({_id:id})
        }
        else if(orderid){
            returnOrderData = await returnOrder.find({orderId:orderid})
            .populate({
                path:"orderId",
                model:"Order"
            })
        }
        else if(productid){
            returnOrderData = await returnOrder.find({productId:productid})
            .populate({
                path:"productId",
                model:"Product"
            }).skip(skip).limit(limit)
        }
        else if(status){
            returnOrderData = await returnOrder.find({status:status}).skip(skip).limit(limit)
        }
        else{
            returnOrderData = await returnOrder.find().skip(skip).limit(limit)
        }

        return res.status(200).send({
            message:"returnOrderData get successfully",
            payload:returnOrderData
        })
    } catch (error) {
        
    }
}

const returnOrderStatusUpdate = async (req, res) => {
    try {
        const {id} = req.query

        const payload = {
            status:req.body.status,
            reason:req.body.reason
        }

        let returnOrderStatus = await returnOrder.findOneAndUpdate(
            {_id:id},{$set:payload},{new:true}
        )

        return res.status(200).send({
            message:"returnOrderData updated successfully",
            payload:returnOrderStatus
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

const deleteReturnOrder = async (req, res) => {
    try {
        const {id} = req.query

        await returnOrder.findOneAndDelete({
            _id:id}
        )

        return res.status(200).send({
            message:"returnOrderData deleted successfully"
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

module.exports = {
    createReturnOrder,
    getReturnOrder,
    returnOrderStatusUpdate,
    deleteReturnOrder,
}