const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    kind: {
      type: String,
      enum: ["detailer_payment", "car_hire"],
      default: "detailer_payment",
    },
    reference: {
      type: Object,
    },
    member: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.pre("validate", function (next) {
  if (this.name) {
    this.catSlug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }

  next();
});

const populateUser = function (next) {
  this.populate("member", "_id lastName firstName phone email userColor");

  next();
};

TransactionSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
