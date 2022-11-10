const Joi = require('joi')
const User = require('../../Models/User')
const bcrypt = require('bcryptjs')

const Schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmNewPassword: Joi.string().required()
  });

  module.exports = async(req, res, next) => {
    try {
        const { error, value } = Schema.validate(req.body);
    
        if (error) {
          console.log("here-2");
          return res.status(400).json({
            error: { message: error.details[0].message }
          });
        }
    
        let user = req.user;
        const isPassword = await bcrypt.compare(value.oldPassword, user.password);
        console.log(user.password)
        if (!isPassword) {
          return res.status(400).json({
            error: { status: "fail", message: "Invalid password" }
          });
        }
    
        if (value.newPassword !== value.confirmNewPassword) {
          return res.status(400).json({
            error: {
              status: "fail",
              message: "New password and 'Confirm New Password must match'"
            }
          });
        }
        const password = await bcrypt.hash(value.newPassword, 12);
        await User.findOneAndUpdate({ _id: user._id }, { password });
    
        return res.status(200).json({
          status: "success",
          data: user
        });
      } catch (error) {
        console.log(error);
        next(error);
      }
  }