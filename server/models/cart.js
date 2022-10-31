const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "nedd to have user to add to cart "],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: [true, "Need to have product to add to cart "],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
module.exports = mongoose.model("cart", cartSchema);
