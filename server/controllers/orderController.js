const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const orderModel = require("../models/orders");
const OrderItemModel = require("../models/orderItems");

const orderPostItem = catchAsync(async (req, res, next) => {
  const orderItemsIds = req.body.orderItems.map((orderItem) => {
    let newOrderitem = new OrderItemModel({
      quantity: orderItem.quantity,
      product: orderItem.product,
    });
  });
  let orderItem = new orderModel({
    orderItems: req.body.orderItems,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });
  const order = await orderItem.save();
});
