const User = require("../../Models/User");
const Joi = require("joi");
const Schema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phone: Joi.number().optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    LGA: Joi.string().optional(),
  
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    about: Joi.string().optional(),
    socialAccounts: Joi.object().optional()
  });

const updateUserController=  async(req,res) => { 
    try {
        let {body} = req
        // const _id = req.user
        const _id = req.params.id
        const { error, value } = Schema.validate(body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }
        const update = await User.findByIdAndUpdate({_id}, value,{ new:true})
          return res.status(200).json(update)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}

module.exports = updateUserController