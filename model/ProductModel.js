const mongoose = require("mongoose");
const validator = require("validator");
const productSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  userIdentifer: {
    type: String,
    required: [true, "Email address should be vaild email address"],
    trim: true,
    lowercase: true,

    validate: [validator.isEmail, "Please provide a valid email"],
  },
  projectTitle: {
    type: String,
    required: [true, "Project Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Project is required"],
  },
  projectType: {
    type: String,
    required: [true, "A Product must have a Type"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "A Product must have a a price"],
  },
  // Search about how to add attachment
  attachment: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// create a middelware that check the existing of the email and phone number // if one of them is exists just send a user his email and tempary password

const product = mongoose.model("Product", productSchema);

module.exports = product;
