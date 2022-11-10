const Transaction = require("../../models/Transaction");
const Joi = require("joi");

const Schema = Joi.object({
  amount: Joi.string().required(),
  kind: Joi.string().required(),
});

module.exports = async function (req, res, next) {
  try {
    const _id = req.user;
    const { error, value } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message },
      });
    }

    value.member = _id;

    const preTransaction = await Transaction(value);
    const transaction = await preTransaction.save();

    return res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};
