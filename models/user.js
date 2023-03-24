const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const usersCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    index: true,
    require: true,
  },
  last_name: String,
  email: { type: String, require: true, unique: true },
  age: Number,
  role: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((error) => next(error));
});

const User = mongoose.model(usersCollection, userSchema);

module.exports = User;
