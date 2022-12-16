const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    surname: String,
    schoolNumber: Number,
    phoneNumber: Number,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  {
    collection: "Users",
    timestamps: true,
  }
);

// kayıt olmadan önce gerçekleştir - model içersinde middleware oluşturur.
UserSchema.pre("save", function (next) {
  const currentUser = this;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(currentUser.password, salt, function (err, hash) {
      if (err) return next(err);
      currentUser.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
