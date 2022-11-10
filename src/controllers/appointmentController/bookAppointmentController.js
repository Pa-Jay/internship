const Joi = require("joi");
const Appointment = require("../../Models/appointment");
const User = require("../../Models/User");

const Schema = Joi.object({
  // message: Joi.string().required(),
  detailer: Joi.string().required(),
  services: Joi.array().required(),
  date: Joi.string().required(),
  time: Joi.string().optional(),
  price: Joi.string().optional().default(1000)
});

const bookAppointment = async(req, res)=>{
  try {
    const { error, value } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }
    value.bookedBy = req.user._id;
    // const findAgent =  await User.find({role:"agent"})
    // if (findAgent){
    //   value.detailer = { 
    //     firstname: findAgent.firstName,
    //     lastname: findAgent.lastName,
    //     phone: findAgent.phone,
    //   }
    // }else{
    //   return res.status(400).json("no agent available")
    // }
    

  
    const booking = await Appointment.create(value);
    return res.status(201).json({ status: "success", data: booking });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}

module.exports = bookAppointment
