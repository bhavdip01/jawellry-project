const meeting = require("../../models/meeting.model")


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
            message:"meetingData create successfully",
            payload:couponData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }
}

const getMeeting = async(req,res) =>{
    try {
        
        const {id,userid,startDate,endDate,page,limit} = req.query
        let meetingData
        let skip = (page -1) * limit

        if(id){
            meetingData = await meeting.findOne({_id:id})
        }
        else if(userid){
            meetingData = await meeting.find({userId:userid}).skip(skip).limit(limit)
        }
        else if(startDate, endDate){
            meetingData = await meeting.find({$or: 
                [{startDate:startDate},
                {endDate:endDate}]}).skip(skip).limit(limit)
        }
        else{
            meetingData = await meeting.find().skip(skip).limit(limit)
        }

        return res.status(200).send({
            message:"meetingData fetch successfully",
            payload:meetingData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }
}

const updateMetting = async(req,res) =>{
    try {
        const {id} = req.query
        
        const status = await meeting.find({status:"Rejected"})
     

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
                message:"meetingData updated successfully",
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

        await meeting.findOneAndDelete({
            _id:id}
        )

        return res.status(200).send({
            message:"meetingData deleted successfully"
        })

    } catch (error) {
        return res.status(500).send({error})
    }
}

const meetingStatusUpdate = async(req, res) => {
    try {
        const {id} = req.query
        const payload = {
            status:req.body.status,
            reason:req.body.reason
        }
    
        let meetingStatus = await meeting.findOneAndUpdate(
            {_id:id},{$set:payload},{new:true}
        )

        return res.status(200).send({
            message:"meetingData updated successfully",
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