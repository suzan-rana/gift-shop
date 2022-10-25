const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cartModel = require("../models/cart");

const getAllCart = catchAsync(async (req, res, next) => {
  const user = cartModel.find();
  const data = await user;
  if (!data) {
    return res.status(200).json({
      status: "no item ",
      message: "no items found in the cart ",
    });
  }
  res.status(200).json({
    status: "success ",
    data,
  });
});

const postCart = catchAsync(async (req, res, next) => {
  const { product, quantity } = req.body;
  if (!product) {
    return next(new AppError("Need the product to add to the cart ", 400));
  }
  const cartData = cartModel.create({
    user: req.user._id,
    product,
    quantity,
  });
  const data = await cartData.save();
  if (!data) {
    return next(new AppError("Error saving cart to database Try again ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Added to cart ",
    data,
  });
});

const updateCart = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  const data = await cartModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        quantity,
      },
    },
    { new: true }
  );
  if (!data) {
    return next(new AppError("Error updating the database ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Cart updated",
    data,
  });
});

const deleteCart = catchAsync(async (req, res, next) => {
  const cartDetail = await cartModel.findByIdAndDelete({ _id: req.params.id });
  if (!cartDetail) {
    return next(
      new AppError("Cannot find the required id to delete from the cart ", 400)
    );
  }
  res.staus(200).json({
    status: "success",
    message: "Product Remove from the cart ",
  });
});
const getCartWithId = catchAsync(async (req, res, next) => {
  const user = await cartModel.findById({ _id: req.params.id });
  if (!user) {
    return next(new AppError("Cannot find the cart with specific id ", 400));
  }
  res.status(200).json({
    status: "success ",
    user,
  });
});

module.exports = {
  getAllCart,
  postCart,
  updateCart,
  deleteCart,
  getCartWithId,
};
