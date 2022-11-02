const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, "user name must be entered"],
  },
  email: {
    type: String,
    required: [true, "email must be entered"],
    unique: true,
  },
  ID: {
    type: Number,
    required: [true, 'ID must be entered']
  },
  cardNumber: {
    type: String,
    requird: [true, 'Card Number must be entered']
  },
  CNIC: {
    type: String,
    required: [true, "CNIC must be entered"]
  },
  password: {
    type: String,
    required: [true, "Password must be entered"],
    minlength: 8,
    // maxlength: 16,
    select: false,
  },
  confirmPassword: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (val) {
        return val == this.password;
      },
      message: "password does not match",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpiresAt: Date,
});

userSchema.methods.passwordVerification = async (password, encryptedPass) => {
  return await bcrypt.compare(password, encryptedPass);
};

userSchema.methods.passwordResetTokenGenerator = function () {
  // resetToken
  const resetToken = crypto.randomBytes(32).toString("hex");

  // encryted reset Token
  const encryptedresetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetToken = encryptedresetToken;
  this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password") && !this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  var encryptedPass = await bcrypt.hash(this.password, 12);
  this.password = encryptedPass;
  this.confirmPassword = undefined;
  next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;