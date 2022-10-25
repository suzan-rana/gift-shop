const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "must include a category name "],
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  image: String,
});
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});
categorySchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("category", categorySchema);
