const User = require("../../Models/User");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants = require("../../configs/constants");

const Schema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  TandC: Joi.boolean().required(),
});

module.exports = async function (req, res, next) {
  try {
    const { error, value } = Schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }

    const isUser = await User.findOne({ email: value.email });
    if (isUser) {
      return res.status(400).json({
        error: { message: "Email Already Exists" },
      });
    }
    value.password = await bcrypt.hash(value.password, 12);
    
    const user = await User.create({ ...value, role: "user"});

    return res.status(200).json({ status: "success", user });
  } catch (error) {
    next(error);
  }
};

