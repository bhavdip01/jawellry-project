const privacyAndPolicy = require("../../models/privacyAndpolicy.model")


const createPrivacyAndPolicy = async(req,res,next)=>{

    try {
         
        const {name,description} = req.body

        const payload = {
            name:name,
            description:description
        }

        let privacyAndPolicyData = await privacyAndPolicy.create(payload)

        return res.status(200).send({
            message:"privacyAndPolicy Data successfully",
            payload:privacyAndPolicyData
        })

    } catch (error) {
        return res.status(200).send(error);
    }
}

const getPrivacyAndPolicy = async(req,res,next)=>{

    try {
        const  { id , name,page,limit} = req.query
        let privacyAndPolicyData
        let skip = (page -1) * limit

        if(id){
            privacyAndPolicyData = await privacyAndPolicy.findOne({ _id: id })
        }
        else if(name){
            privacyAndPolicyData = await privacyAndPolicy.find({name : name}).skip(skip).limit(limit)
        }
        return res.status(200).send({
            message:"privacyAndPolicy Data successfully",
            payload:privacyAndPolicyData
        })
        
    } catch (error) {
        return res.status(200).send(error);
    }
}

const updatePrivacyAndPolicy = async(req,res,next)=>{
    try {
        const {id} = req.query

        const payload = {
            name:req.body.name,
            description:req.body.description
        }

        let privacyAndPolicyData = await privacyAndPolicy.findOneAndUpdate(
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
            message:"privacyAndPolicy Data updated successfully",
            payload:privacyAndPolicyData
        })
    } catch (error) {
        return res.status(200).send(error);
    }
}

const deletePrivacyAndPolicy = async(req,res,next)=>{

    try {
        const {id} = req.query
        await privacyAndPolicy.findOneAndDelete({
            _id: id
        })

        return res.status(200).send({
            message:"privacyAndPolicy Data delete successfully",
            
        })

    } catch (error) {
        return res.status(200).send(error);
    }
}




module.exports = {createPrivacyAndPolicy,getPrivacyAndPolicy,updatePrivacyAndPolicy,deletePrivacyAndPolicy}