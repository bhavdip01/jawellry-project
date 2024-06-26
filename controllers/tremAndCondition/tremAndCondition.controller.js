const tremAndCondition = require("../../models/tremAndCondition")

const createTremAndCondition = async(req,res,next)=>{

    try {
         
        const {name,description} = req.body

        const payload = {
            name:name,
            description:description
        }

        let tremAndConditionData = await tremAndCondition.create(payload)

        return res.status(200).send({
            message:"tremAndCondition Data successfully",
            payload:tremAndConditionData
        })

    } catch (error) {

        return res.status(200).send(error);
    }
}

const getTremAndCondition = async(req,res,next)=>{

    try {
        const  { id, name,page,limit} = req.query
        let tremAndConditionData
        let skip = (page -1) * limit

            if(id){
                tremAndConditionData = await tremAndCondition.findOne({ _id: id })
            }
            else if(name){
                tremAndConditionData = await tremAndCondition.find({ name: name }).skip(skip).limit(limit)
            }

            return res.status(200).send({
                message:"tremAndCondition Data successfully",
                payload:tremAndConditionData
            })
        
    } catch (error) {
        return res.status(200).send(error);
    }
}

const updateTremAndCondition = async(req,res,next)=>{
    try {
        const {id} = req.query

        const payload = {
            name:req.body.name,
            description:req.body.description
        }

        let tremAndConditionData = await tremAndCondition.findOneAndUpdate(
            {
                _id : id
            },
            {
                $set: payload
            },
            {
                new:true
            }
        )
        return res.status(200).send({
            message:"tremAndCondition Data updated successfully",
            payload:tremAndConditionData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

const deleteTremAndCondition = async(req,res,next)=>{

    try {
        const {id} = req.query
        await tremAndCondition.findOneAndDelete({
            _id: id
        })

        return res.status(200).send({
            message:"tremAndCondition Data delete successfully",
            
        })

    } catch (error) {
        return res.status(200).send(error);
    }
}




module.exports = {createTremAndCondition,getTremAndCondition,updateTremAndCondition,deleteTremAndCondition}