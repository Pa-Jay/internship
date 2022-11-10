const User = require("../../Models/User");
const Joi = require("joi");
const { AgentService } = require("../../Models/AgentService");
const Schema = Joi.object({
    IDNumber: Joi.number().required(),
    services: Joi.array().required(),
    address: Joi.string().optional().allow(''),
    file: Joi.object().optional()    
});

const agentController=  async(req,res) => { 
  try {
      let {body} = req
      // const _id = req.user
      const _id = req.user._id
      const { error, value } = Schema.validate(body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }
    value.role ="agent"
    value.isAgent = "true"
    // value.isVerified = "true"
    value.IdCard = body.file.name
    value.utilityBillUpload = body.file.name
    const user = await User.findOne({_id})
  
    const agent = await User.findByIdAndUpdate({_id}, value,{ new:true})

    let agentService =  await AgentService.findOne({agent:_id})
    let newServices = value.services;

    if (agentService) {
      newServices.forEach(service => {
        const found = agentService.services.some(serv => {
          return serv.toString() === service
        });
        if (!found) {
          agentService.services.push(service)
        }
      });
      agentService.save();
    }else {
      agentService = await AgentService.create(
        {
          agent: user._id,
          services: value.services
        }
      );

    }
    return res.status(200).json({
      message: "Your request is pending approval",
      agent, 
      agentService
    })
  } catch (error) {
      return res.status(500).json(error.message)
  }
}

module.exports = agentController