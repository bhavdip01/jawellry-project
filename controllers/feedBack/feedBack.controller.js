
const feedback = require("../../models/feedback.model")


const createFeedBack = async(req,res,next)=>{

    try {

        let feedBackData = await feedback.create(req.body)

        return res.status(200).send({
            message:"feedBack create successfully",
            payload:feedBackData
        })

    } catch (error) {
        return res.status(200).send(error);
    }
}

const getFeedBack = async(req,res,next)=>{
    try {
        const  {userid,productid,feedbackpoint,ismain,isshow,page,limit} = req.query
        let skip = (page - 1) * limit
        let feedBackData 

        if(userid){

            feedBackData = await feedback.find({ userId: userid }).skip(skip).limit(limit)
        }
        else if(productid){

            feedBackData = await feedback.find({ productId: productid}).skip(skip).limit(limit)
        }
        else if(feedbackpoint){
            feedBackData = await feedback.aggregate([
                {$match: {feedbackPoint: parseInt(feedbackpoint)}},
                {$sample: { size : 10}}
            ])
        }
        else if(ismain){
            feedBackData = await feedback.aggregate([
                { $match: { isMain: ismain === 'true' } },  
                { $sample: { size : 10}},
                { $sort: { feedbackPoint: -1 } }
            ])
        }
        else if(isshow){
            feedBackData = await feedback.aggregate([
                { $match: { isShow: isshow === 'true' } },   
                { $sample: { size : 10}},
                { $sort: { feedbackPoint: -1 } }
            ])
        }
        return res.status(200).send({
            message:"feedBackData get successfully",
            payload:feedBackData
        })
        
    } catch (error) {
        console.error(error)
        return res.status(200).send(error);
    }
}

const updateFeedBack = async(req,res,next)=>{
    try {
        const {id} = req.query

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
            message:"feedBadkData updated successfully",
            payload:feedBackData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

const deleteFeedBack = async(req,res,next)=>{

    try {
        const {id} = req.query
        await feedback.findOneAndDelete({
            _id : id
        })

        return res.status(200).send({
            message:"feedback delete successfully",
            
        })

    } catch (error) {
        return res.status(200).send(error);
    }
}



module.exports = {createFeedBack,getFeedBack,updateFeedBack,deleteFeedBack}