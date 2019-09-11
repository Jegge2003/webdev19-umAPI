const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1
  }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
