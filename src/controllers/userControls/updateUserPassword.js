const User = require("../../Models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../../configs/constants");

const Schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmNewPassword: Joi.string().required()
  
});

module.exports = async function (req, res, next) {
  try {
    const _id = req.user._id;
    const { error, value } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }
    if (value.password !== value.confirmPassword) {
      return res.status(400).json({
        error: { message: "Password and Confirm Password Field must match" },
      });
    }
    value.password = await bcrypt.hash(value.newPassword, 12);

    const user = await User.findOneAndUpdate({ _id }, value);

    // }

    return res.status(200).json({ status: "success", user });
  } catch (error) {
    console.log(error.message)
    next(error);
  }
};
