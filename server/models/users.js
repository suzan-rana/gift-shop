const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "must include a username "],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Must include a Email "],
      unique: [true, "Must include a unique Email"],
    },
    password: {
      type: String,
      required: [true, "must include a passowrd "],
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    passwordUpdataDate: Date,
    resetToken: {
      type: String,
    },
    resetTokenExpiresIn: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
    this.passwordUpdataDate = Date.now() - 1000;
  } else {
    return next();
  }
});

userSchema.methods.generateToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  this.resetTokenExpiresIn = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("user", userSchema);
