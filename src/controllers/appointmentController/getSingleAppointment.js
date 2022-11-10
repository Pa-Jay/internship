
const Appointment = require("../../Models/appointment");


const getSingleAppointmentController = async(req,res) => { 
    try {

        const {id}  = req.params;
        console.log(req.params)
        const appointment = await Appointment.findById({_id: id})
        .populate('detailer')
        .populate('services');
        if(appointment){
            return res.status(200).json(appointment)
        }else{
            return res.status(400).json('no appointment found')
        }
    } catch (error) {
        // console.log(error.message)
        return res.status(500).json(error)
    }
}

module.exports = { getSingleAppointmentController }