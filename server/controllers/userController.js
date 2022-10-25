const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const usermodel = require("../models/users");
const bcrypt = require("bcrypt");
//get all user get request /user/
const getAlluser = catchAsync(async (req, res, next) => {
  if (req.user.is_admin != true) {
    return next(
      new AppError(
        "Sorry you are not given permission to visit this page ",
        400
      )
    );
  }
  const user = await usermodel.find().select("-password");
  if (!user) {
    return next(new AppError("Cannot find user ", 400));
  }

  res.status(200).json({
    status: "success",
    result: user.length,
    data: user,
  });
});

//get single user with id:
//get request /users/:id
const getSingleUser = catchAsync(async (req, res, next) => {
  if (req.user.is_admin != true) {
    return next(
      new AppError(
        "Sorry you are not given permission to visit this page ",
        400
      )
    );
  }
  const user = await usermodel.findById(req.params.id).select("-password");
  if (!user) {
    return next(new AppError("Invalid user id ", 400));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

//update user
const updateUser = catchAsync(async (req, res, next) => {
  if (req.user.is_admin != true) {
    return next(
      new AppError(
        "Sorry you are not given permission to visit this page ",
        400
      )
    );
  }
  const user = await usermodel.findById(req.params.id);
  if (!user) {
    return next(
      new AppError("User id doesnot match first login to proceed", 401)
    );
  }
  if (!req.user._id) {
    return next(
      new AppError("Your are not logged in and not access to token ", 401)
    );
  }
  const { username, email, password } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);

  const saveData = await usermodel.findByIdAndUpdate(
    { _id: user.id },
    { $set: { username, email, password: hashpassword } }
  );

  res.status(200).json({
    status: "success",
    data: saveData,
  });
});
module.exports = {
  getAlluser,
  getSingleUser,
  updateUser,
};
