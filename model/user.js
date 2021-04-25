const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is require"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name  is require"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "Last Name  is require"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is require"],
    trim: true,
    minlength: 8,
    select: false,
    default: "Password",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  confirmationPassword: {
    type: String,
    trim: true,
    default: "None",
  },
  imageCover: {
    type: String,
    required: true,
    default: "URL",
  },

  userType: {
    type: String,
    required: [true, "Please select User Type"],
    trim: true,
    enum: ["STAFF", "ADMIN", "PM", "USER"],
    default: "USER",
  },
  passwordChangeAt: Date,
  passwordResetTokne: String,
  passwordRestExpires: Date,
});

// use middelware to hash the password
userSchema.methods.correctPassword = async function (
  givenPassword,
  userPassword
) {
  return await bcryptjs.compare(givenPassword, userPassword);
};
// middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
});
// middleware
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    // change time to timestamp time
    const changeToTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );

    // if the user has chnage the password
    return JWTTimestamp < changeToTimeStamp;
  }
  // fasle is not change

  return false;
};
// password reset pattern
userSchema.methods.createPasswordResetToken = function () {
  // generte token
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetTokne = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetTokne);

  this.passwordRestExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
