const returnOrder = require("../../models/returnOrder.model")
const { MESSAGE } = require("../../helpers/constant.helper")


const createReturnOrder = async(req,res) => {
    try {
        const {productId, orderId, pickupAddressId, description} = req.body

        const payload = {
            productId:productId,
            orderId:orderId,
            pickupAddressId: pickupAddressId,
            description: description,
        }

        let returnOrderData = await returnOrder.create(payload)

        return res.status(200).send({
            message: MESSAGE.SUCCESS,
            payload:returnOrderData
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

const getReturnOrder = async(req,res) => {
    try {
        
        const {id,orderId,productId,status,page,limit} = req.query
        let skip = (page -1) * limit

        let query = {}
        if(id){
            query = { _id: id}
        }
        if(orderId){
            query = { orderId: orderId }
        }
        if(productId){
            query = { productId: productId }
        }
        if(status){
            query = { status: status }
        }

        let returnOrderData = await returnOrder.find(query).skip(skip).limit(limit)
        .populate({
            path: 'productId',
            model: 'Product'
        })
        .populate({
            path: 'orderId',
            model: 'Order'
        })
        .populate({
            path: 'pickupAddressId',
            model: 'address'
        })

        return res.status(200).send({
            message: MESSAGE.FETCH_SUCCESSFULLY,
            payload:returnOrderData
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

const updateReturnOrderStatus = async (req, res) => {
    try {
        const {id} = req.query

        let checkReturnOrder = await returnOrder.findOne({ _id: id})
        if(!checkReturnOrder){
            return res.status(404).send({message: MESSAGE.NOT_FOUND})
        }

        const payload = {
            status:req.body.status,
            reason:req.body.reason
        }

        let returnOrderStatus = await returnOrder.findOneAndUpdate(
            {_id:id},{$set:payload},{new:true}
        )

        return res.status(200).send({
            message: MESSAGE.UPDATED_SUCCESSFULLY,
            payload:returnOrderStatus
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

const deleteReturnOrder = async (req, res) => {
    try {
        const {id} = req.query

        let checkReturnOrder = await returnOrder.findOne({ _id: id})
        if(!checkReturnOrder){
            return res.status(404).send({message: MESSAGE.NOT_FOUND})
        }

        await returnOrder.findOneAndDelete({_id:id})

        return res.status(200).send({
            message: MESSAGE.DELETED_SUCCESSFULLY,
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

module.exports = {
    createReturnOrder,
    getReturnOrder,
    updateReturnOrderStatus,
    deleteReturnOrder,
}