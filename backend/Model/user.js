const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: async function (value) {
        const user = await User.findOne({ email: value });
        return !user;
      },
      message: "Email already exists",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 8;
      },
      message: "Password must be at least 8 characters long",
    },
  },
});

const User = mongoose.model("user", userSchema);
module.exports = { User };
