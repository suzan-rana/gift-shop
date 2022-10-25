const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "must include objectItem id to order item "],
      },
    ],
    shippingAddress1: {
      type: String,
      required: [true, "Must include this address"],
    },
    shippingAddress2: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "Include city name for delivery"],
    },
    zip: {
      type: String,
      required: [true, "must include zip code "],
    },
    country: {
      type: String,
      required: [true, "Include your country name "],
    },
    phone: {
      type: String,
      required: [true, "Must include a phone number for delivery"],
    },
    status: {
      type: String,
      default: "pending",
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    dateOrdered: Date.now(),
  },
  {
    timestamps: true,
  }
);
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
orderSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("order", orderSchema);
