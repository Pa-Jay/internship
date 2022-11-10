const User = require('../../Models/User')
const Joi = require('joi')

const schema = Joi.object({
    isVerified: Joi.string().valid("true","false").required()
})
const isVerifiedDetailer = async (req, res) =>{
    try{

        const{error,value} = schema.validate(req.body)
        if(error){
            res.status(400).json({
                error:{message:error.details[0].message}
            })
        }
        const _id = req.params.id
        const user = await User.findById ({_id})
        if(!user.isVerified){
            const verifiedUser = await User.findByIdAndUpdate(_id,{
                isVerified : value.isVerified
            },
            {new:true})

            res.status(200).json({message:"user verification successful", verifiedUser})
        }else{
            res.status(400).json({message:"user already verified"})
        }
    }catch(error){
        res.status(500).json(error.message)
    }
}

module.exports = isVerifiedDetailer