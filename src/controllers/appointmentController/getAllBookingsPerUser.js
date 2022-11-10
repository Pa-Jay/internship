
const Appointment = require("../../Models/appointment");


const getAllBookingsPerUser = async(req,res) => { 
    try {
        
          let limit = 1
    
        //   page = 1
        // }: { page?: number; limit?: number } = req.query;
        // page = page || 1;
        // const skip: number = page ? (page - 1) * limit : 0;

        const option = { _id: req.user._id };
        console.log(option);
    
        const count = await Appointment.find(option).countDocuments();
        // const pages = count>0?Math.ceil(count / limit)?Math.ceil(count / limit): 1;
        // let pages = 0;
        // if (count > 0) {
        //   if (limit) {
        //     pages = Math.ceil(count / limit);
        //   } else {
        //     pages = 1;
        //   }
        // }
    
        // // const result: { next?: object; previous?: object } = {};
        // // limit = limit - 0;
    
        // if (page * 1 < pages) {
        //   result.next = { limit, page: page * 1 + 1 };
        // }
        // if (page * 1 <= pages && page - 1 != 0) {
        //   result.previous = { limit, page: page - 1 };
        // }
    
        const appointment = await Appointment.find(option)
          .limit(limit * 1)
          .skip(skip);
        return res
          .status(200)
          .json({ status: "success", data: { count, appointment } });
      } catch (error) {
        next(error)
      }
}

const appointmentsPerUser = async (req, res) => {
  try {
    const { _id } = req.user; 
      const appointment = await Appointment.find({bookedBy:_id})
      // .populate('bookedBy')
      .populate('detailer')
      .populate('services');

      return res.status(200).json(appointment)

  } catch (error) {
      console.log(error.message)
      return res.status(500).json(error.message)   
  }
}



module.exports = { getAllBookingsPerUser, appointmentsPerUser }

