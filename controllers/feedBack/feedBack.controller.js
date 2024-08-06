
const feedback = require("../../models/feedback.model")
const { MESSAGE } = require("../../helpers/constant.helper")


const createFeedBack = async(req,res,next)=>{

    try {

        let feedBackData = await feedback.create(req.body)

        return res.status(200).send({
            message: MESSAGE.SUCCESS,
            payload:feedBackData
        })

    } catch (error) {
        return res.status(500).send(error);
    }
}

const getFeedBack = async(req,res,next)=>{
    try {
        const  {userid,productid,feedbackpoint,ismain,isshow,page,limit} = req.query
        let skip = (page - 1) * limit
        let feedBackData

        let query = { isDeleted: false}
        if(userid){
            query = { userId : userid}
            
        }
        if(productid){
            query = { productId : productid}
            
        }
        if(feedbackpoint){
            query = { feedbackPoint : parseInt(feedbackpoint)}
            
        }
        if(ismain){
            query = { isMain : ismain }
           
        }
        if(isshow){
            query = { isShow : isshow }
        }


        if(feedbackpoint || ismain || isshow){
            feedBackData = await feedback.aggregate([
                {$match: query},
                {$sample: {size: 10}},
                {$sort: {feedbackPoint: -1}}
            ])
        }else{
            feedBackData = await feedback.find(query).skip(skip).limit(limit)
            .populate({
                path: 'userId',
                model:'User'
            })
            .populate({
                path: 'productId',
                model:'Product'
            })
        }
     
        return res.status(200).send({
            message: MESSAGE.FETCH_SUCCESSFULLY,
            payload:feedBackData
        })
        
    } catch (error) {
        return res.status(500).send(error);
    }
}

const updateFeedBack = async(req,res,next)=>{
    try {
        const {id} = req.query

        let checkFeedback = await feedback.findOne({ _id: id, isDeleted: false})
        if(!checkFeedback){
            return res.status(404).send({ message: MESSAGE.NOT_FOUND})
        }

        let feedBackData = await feedback.findOneAndUpdate(
            {
                _id : id
            },
            {
                $set: req.body
            },
            {
                new:true
            }
        )
        return res.status(200).send({
            message: MESSAGE.UPDATED_SUCCESSFULLY,
            payload:feedBackData
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

const deleteFeedBack = async(req,res,next)=>{

    try {
        const {id} = req.query

        let checkFeedback = await feedback.findOne({ _id: id, isDeleted: false})
        if(!checkFeedback){
            return res.status(404).send({ message: MESSAGE.NOT_FOUND})
        }

        await feedback.findOneAndUpdate({_id : id},{$set: {isDeleted:true}},{new: true})

        return res.status(200).send({
            message: MESSAGE.DELETED_SUCCESSFULLY,
            
        })

    } catch (error) {
        return res.status(500).send(error);
    }
}



module.exports = {createFeedBack,getFeedBack,updateFeedBack,deleteFeedBack}