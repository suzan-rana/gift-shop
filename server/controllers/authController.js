const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
//importing usermodel
const usermodel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../utils/nodemail");

const jwttoken = (id) => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.jwtsecret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
};
/*
/register -post 
take data from body 
save data to database 

*/
//post request post  /user/register
const registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new AppError("Input  all field", 400));
  }
  const saveData = new usermodel({
    username,
    email,
    password,
  });
  const data = await saveData.save();
  const token = jwttoken(saveData._id);

  res.status(200).json({
    status: "success",
    data,
    token,
  });
});

//post request on login
//post /user/login
const loginUser = catchAsync(async (req, res, next) => {
  const user = await usermodel.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("User Not found with given email ", 400));
  }
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwttoken(user._id);
    return res.status(200).json({
      status: "success",
      message: "user authorized",
      token,
    });
  }
  return next(new AppError("Invalid email and password ", 401));
});

//to protect other endpoint
const protectMiddleware = catchAsync(async (req, res, next) => {
  //1) checks if token exist or not
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not authorized .Please login to proceed", 401)
    );
  }
  //2) verify token
  const decoded = await promisify(jwt.verify)(token, process.env.jwtsecret);
  //3)
  //check whether user exists or not after jwt issued
  const freshUser = await usermodel.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("User not exist with the given token ", 401));
  }

  const validDate = Date.parse(freshUser.passwordUpdataDate) / 1000;

  //4)
  //check whether the password change or not after jwt is issued
  if (decoded.iat < validDate) {
    return next(
      new AppError("You just changed your password .Need to login again ", 401)
    );
  }
  req.user = freshUser;
  req.cookie =
    ("jwt",
    freshUser,
    {
      expires: new Date(Date.now() + 30 * 24 * 3600000),
    });
  next();
});

//it require the mail to send to the user

const forgetpassword = catchAsync(async (req, res, next) => {
  const user = await usermodel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError("provide valid email to forget the password ", 404)
    );
  }
  const resetToken = user.generateToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/user/resetPassword/:${resetToken}`;
  const message = `Forget your password ? Submit a PATCH request with your new password and passwordConfirm to :${resetUrl}.\n If you didn't forget your password ,please ignore this email (valid for only 10 min )`;

  const option = {
    email: user.email,
    subject: `Resetting you password `,
    message,
  };
  try {
    await sendEmail(option);

    res.status(200).json({
      status: "success",
      tokenforReset: resetToken,
      message: "token sent to mail ",
    });
  } catch (error) {
    user.resetToken = undefined;
    user.resetTokenExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Error sending mail ", 500));
  }
});
//reseting password
const resetPassword = catchAsync(async (req, res, next) => {
  const user = usermodel.findOne({
    resetToken: req.params.token,
    resetTokenExpiresIn: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new AppError(
        "Cannot find the valid token or token expired try again ",
        401
      )
    );
  }
  user.password = req.body.password;
  (user.resetToken = undefined), (user.resetTokenExpiresIn = undefined);
  const data = await user.save();
  const token = jwttoken(data._id);
  res.status(200).json({
    status: "success",
    message: "password reset and new token generate",
    jwttoken: token,
  });
});

module.exports = {
  registerUser,
  loginUser,
  protectMiddleware,
  forgetpassword,
  resetPassword,
};
