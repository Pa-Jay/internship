const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String
    },
    phone: {
      type: String,
      required: true,
    },
    TandC:{
      type: Boolean,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    address:{
      type: String,
    },
    city: {
      type: String
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    IdNumber: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    about: {
      type: String
    },
    isActivated: {
      type: Boolean,
      default: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    isAgent: {
      type: Boolean,
      default: false
    },
    isCompany: {
      type: Boolean,
      default: false
    },
    socialAccounts: {
      type: Object,
      default: {}
    },
    role: {
      type: String,
      enum: ["company","deactivate", "agent", "user", "admin",],
      default: "user"
    },
    country: {
      type: String
    },
    state: {
      type: String
    },
    picture: {
      type: String
    },
    IdCard: {
      type: String
    },
    utilityBillUpload: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
// const enumRole= Admin.schema.path('role').enumValues
module.exports = User;
