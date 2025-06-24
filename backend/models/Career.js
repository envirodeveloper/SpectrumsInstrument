const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  qualification: {
    type: String,
    required: true,
    trim: true,
  },
  resume: {
    type: String, // stores the filename from multer
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Career", careerSchema);
