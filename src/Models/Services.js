const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    // applyBy:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    // },
    desc: {
      type: String,
      default: null
    },
    name: {
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: ["approved", "pending"],
        default: "approved",
      },
  },
  {
    timestamps: true,
  }
);

// const populateUser = function (next) {
//     this.populate("applyBy"),
//     next()
//   };
  
//   serviceSchema.pre("find", populateUser)
//     .pre("findOne", populateUser)
//     .pre("findOneAndUpdate", populateUser);
const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
