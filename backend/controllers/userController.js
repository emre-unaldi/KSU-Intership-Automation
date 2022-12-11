// Models
const User = require("../models/User");
const bcrypt = require("bcrypt");

// User ekleme endpointi
exports.addUser = async (req, res) => {
  const user = new User(req.body);
  promise = user.save();

  promise
    .then((user) => {
      res.status(201).json({
        status: "success",
        user,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "fail",
        err,
      });
    });
};

// User giriş yap endpointi
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const login = User.findOne({ email });

  login
    .then((user) => {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          res.status(200).send("Logged In");
        }
      });
    })
    .catch((err) => {
      res.json({
        status: "fail",
        err,
      });
    });
};
