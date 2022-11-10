const Service = require('../../Models/Services')
const { AgentService } = require('../../Models/AgentService')
const User = require("../../Models/User");

const Joi = require("joi");
const Schema = Joi.object({
    desc: Joi.string().optional(),
    name: Joi.string().required()
});
const createService  = async(req, res) => {
    try {
        let { body } = req
        
        const { error, value } = Schema.validate(body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }

    const serviceExists = await Service.findOne({name: value.name});

    if (serviceExists) {
        return res.status(400).json({
            error: `Service ${value.name} already exists`,
        });
    }
    const service = await Service.create(value)
    return res.status(200).json(service)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }

}

const allServices = async (req, res) => {
    try {
        const {_id} = req.user;
        const user = await User.findById({_id:_id})
        if(user.role === "admin"){
            const services = await Service.find();
            return res.status(200).json(services)
        }
        if(user.role === "agent"){
            const services =  await AgentService.findOne({agent:_id})
                              .populate("services");
            return res.status(200).json(services.services)
        }
    } catch (error) {
        return res.status(500).json(error.message)   
    }
}


module.exports = { createService, allServices }