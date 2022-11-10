const mongoose = require("mongoose");
const AgentSchema = new mongoose.Schema(
  {
    applyBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message: {
      type: String,
      required:true
    },
    service: {
        type: String,
        required:true
      },
    status: {
        type: String,
        enum: ["cancel", "pending", "success"],
        default: "pending",
      },

  },
  {
    timestamps: true,
  }
);

const populateUser = function (next) {
    this.populate("applyBy"),
    next()
  };
  
  AgentSchema.pre("find", populateUser)
    .pre("findOne", populateUser)
    .pre("findOneAndUpdate", populateUser);
const Agent = mongoose.model("Agent", AgentSchema);
module.exports = Agent;
