const Appointment = require("../../Models/appointment");
const deleteAppointment = async(req,res) => { 
    try {
            const appointmentFound = await Appointment.findById(req.params.id)
             if(appointmentFound){
             await Appointment.findByIdAndDelete(req.params.id)
             return res.status(200).json(`Appointment deleted`)
      }else{
        res.status(401).json('Appointment not found')
     }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}

module.exports = deleteAppointment 