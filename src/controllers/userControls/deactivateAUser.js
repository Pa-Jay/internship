const User = require("../../models/User");
module.exports = async function (req, res, next) {
  try {
    const _id = req.user;
     const user = req.params.id;

    const isUser = await User.findOneAndUpdate(
      { _id :user},
      { role:"deactivate" },
      { new: true }
    );

    return res.status(200).json({ isUser, transaction });
  } catch (err) {
    next(err);
  }
};
