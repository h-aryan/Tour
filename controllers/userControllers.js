const User = require("./../model/userModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    requestedAT: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
