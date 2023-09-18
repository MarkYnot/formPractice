const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minLength: [5, "Title must be at least 5 characters long."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  instructor: {
    type: String,
    required: [true, "Instructor is required"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
    min: [0, "Duration must be a positive number"],
  },
});
//create a collection with rules
module.exports = mongoose.model("Course", courseSchema); //courses
