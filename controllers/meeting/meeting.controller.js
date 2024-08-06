const { query } = require("winston")
const meeting = require("../../models/meeting.model")
const { MESSAGE } = require("../../helpers/constant.helper")


const createMeeting = async(req,res)=>{
    
    try {
     
        const {userId,title,description,startDate,endDate,startTime,endTime} = req.body

        const payload = {
            userId:userId,
            title:title,
            description:description,
            startDate:startDate,
            endDate:endDate,
            startTime:startTime,
            endTime:endTime
        }
     
        let couponData = await meeting.create(payload)

        return res.status(200).send({
            message: MESSAGE.SUCCESS,
            payload:couponData
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

const getMeeting = async(req,res) =>{
    try {
        
        const {id,userid,startDate,endDate,page,limit} = req.query
        let skip = (page -1) * limit

        let query = {isDeleted: false}
        if(id){
            query = { _id: id}
        }
        if(userid){
            query = {userId: userid}
        }
        if(startDate, endDate){
            query = {startDate:{$gte:startDate}, endDate:{$lte:endDate}}
        }

        let meetingData = await meeting.find(query).skip(skip).limit(limit)
        .populate({
            path: 'userId',
            model: 'User'
        })

        return res.status(200).send({
            message: MESSAGE.FETCH_SUCCESSFULLY,
            payload:meetingData
        })
    } catch (error) {
        return res.status(500).send({error})
    }
}

const updateMetting = async(req,res) =>{
    try {
        const {id} = req.query
     
        let checkMeeting = await meeting.findOne({ _id: id, isDeleted: false })
        if(!checkMeeting){
            return res.status(404).send({message: MESSAGE.NOT_FOUND})
        }

        const status = await meeting.findOne({status:"Rejected"})
        
        const payload = {
            title:req.body.title,
            description:req.body.description,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            startTime:req.body.startTime,
            endTime:req.body.endTime
        }
        if(status){
            payload.reason = ""
        }

        if(payload.status != "pending"){
            let meetingData = await meeting.findOneAndUpdate(
                {_id:id},{$set:payload, status:"pending"},{new:true}
            )
        
            return res.status(200).send({
                message: MESSAGE.UPDATED_SUCCESSFULLY,
                payload:meetingData
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }
}

const deleteMeeting = async(req,res) =>{
    try {
        const {id} = req.query

        let checkMeeting = await meeting.findOne({ _id: id, isDeleted: false })
        if(!checkMeeting){
            return res.status(404).send({message: MESSAGE.NOT_FOUND})
        }

        await meeting.findOneAndUpdate({_id:id},{$set: {isDeleted:true}}, {new: true})

        return res.status(200).send({
            message: MESSAGE.DELETED_SUCCESSFULLY,
        })

    } catch (error) {
        return res.status(500).send({error})
    }
}

const meetingStatusUpdate = async(req, res) => {
    try {
        const {id} = req.query

        let checkMeeting = await meeting.findOne({ _id: id, isDeleted: false })
        if(!checkMeeting){
            return res.status(404).send({message: MESSAGE.NOT_FOUND})
        }

        const payload = {
            status:req.body.status,
            reason:req.body.reason
        }
    
        let meetingStatus = await meeting.findOneAndUpdate(
            {_id:id},{$set:payload},{new:true}
        )

        return res.status(200).send({
            message: MESSAGE.UPDATED_SUCCESSFULLY,
            payload:meetingStatus
        })
    } catch (error) {
        return res.status(500).send({error})
    }

}



module.exports = {
    createMeeting,
    getMeeting,
    updateMetting,
    deleteMeeting,
    meetingStatusUpdate,
}