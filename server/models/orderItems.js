const mongoose = require("mongoose");
const orderItem = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: [true, "must include a product id "],
    },
    quantity: {
      type: Number,
      required: [true, "must include the no of quantity to order "],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("orderItem", orderItem);
