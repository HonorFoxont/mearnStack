const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please input the name feild"],
    },
    email: {
      type: String,
      required: [true, "Please input the email feild"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please input the Password feild"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
