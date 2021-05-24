const mongoose = require("mongoose");
const validator = require("validator");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  videourl: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const news = mongoose.model("News", NewsSchema);
module.exports = news;
