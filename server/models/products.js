const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must include a product name "],
    },
    description: {
      type: String,
      required: true,
    },
    richDescription: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    brand: String,
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
      default: 1,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
productSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("product ", productSchema);
