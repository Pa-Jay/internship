const Appointment = require("../../Models/appointment");
const Joi = require("joi");
const Schema = Joi.object({
    detailer: Joi.string().optional(),
    services: Joi.array().optional(),
    date: Joi.string().optional(),
    time: Joi.string().optional(),
    price: Joi.string().optional(),
    status: Joi.string().required()
  });

const updateAppointmentController=  async(req,res) => { 
    try {
        let {body} = req
        // const _id = req.Appointment
        const _id = req.params.id
        const { error, value } = Schema.validate(body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }
        const update = await Appointment.findByIdAndUpdate({_id}, value,{ new:true})
          return res.status(200).json(update)
        
    } catch (error) {
        // console.log(error.message)
        return res.status(500).json(error)
    }
}

module.exports = { updateAppointmentController }