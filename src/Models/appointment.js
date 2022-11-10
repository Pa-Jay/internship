const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema(
  {
    bookedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    price: {
      type: String,
    },
    status: {
        type: String,
        enum: ["declined", "pending", "accepted", "completed", "paid", "unpaid"],
        default: "pending",
    },
    services:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Service",
      required:true
    }],
    detailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }

  },
  {
    timestamps: true,
  }
);

const populateUser = function (next) {
    this.populate("bookedBy", "_id lastName firstName phone email"),
    next()
  };

  const populateDetailer = function (next) {
    this.populate("detailer", "_id lastName firstName phone email"),
    next()
  };

  const populateService = function (next) {
    this.populate("services", "_id name desc"),
    next()
  };
  
  AppointmentSchema.pre("find", populateUser, populateDetailer, populateService)
    .pre("findOne", populateUser, populateDetailer, populateService)
    .pre("findOneAndUpdate", populateUser, populateDetailer, populateService);
const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
