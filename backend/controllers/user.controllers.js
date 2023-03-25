// Models
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 60 * 60 * 24;

// JWT token oluşturma endpointi
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

// Kullanıcı ekleme endpointi
exports.registerUser = async (req, res) => {
  // E-posta adresine göre kullanıcı arama
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    // E-posta adresiyle eşleşen kullanıcı varsa hata döndürün
    return res.json({
      status: "fail",
      message: "This email address is already in use",
      existingUser,
    });
  } else {
    const user = new User(req.body);
    // Eşleşen kullanıcı yoksa yeni kullanıcıyı kaydet
    await user
      .save()
      .then((user) => {
        return res.json({
          status: "success",
          message: `${user.role} user registered`,
          user,
        });
      })
      .catch((err) => {
        return res.json({
          status: "fail",
          message: `The ${user.role} user could not be registered`,
          err,
        });
      });
  }
};

// Kullanıcı giriş yap endpointi
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });

  user
    .then((user) => {
      // kullanıcı varsa
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // parola doğruysa
          const token = generateToken(user._id);

          res.cookie("CONNECT_UID", token, {
            withCredentials: true,
            httpOnly: true,
            maxAge: maxAge * 1000,
          });

          return res.json({
            status: "success",
            message: `${user.role} successfully logged in`,
            user,
          });
        } else {
          // parola yanlışsa
          return res.json({
            status: "fail",
            message: "Password is not correct",
          });
        }
      });
    })
    .catch(() => {
      // kullanıcı yoksa
      return res.json({
        status: "fail",
        message: "User not found",
      });
    });
};

// Kullanıcı çıkış yap endpointi
exports.logoutUser = (req, res) => {
  res.clearCookie("CONNECT_UID");
  return res.json({
    status: "success",
    message: "User logged out",
  });
};

// Kullanıcı kontrol endpointi
exports.checkUser = (req, res) => {
  const token = req.cookies.CONNECT_UID;

  if (token) {
    // token var
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        return res.json({
          status: "fail",
          message: "Failed to verify token",
          err,
        });
      } else {
        const user = await User.findById(decodedToken.userId);

        if (user) {
          return res.json({
            status: "success",
            message: "User found",
            user,
          });
        } else {
          return res.json({
            status: "fail",
            message: "User not found && Token could not be verified",
          });
        }
      }
    });
  } else {
    // token yok
    return res.json({
      status: "fail",
      message: "Token not found",
    });
  }
};

// Kullanıcıları listeleme endpointi
exports.getAllUsers = async (req, res) => {
  const users = User.find({});

  await users
    .then((users) => {
      return res.json({
        status: "success",
        message: "All users found",
        users
      });
    })
    .catch((err) => {
      return res.json({
        status: "fail",
        message: "All users not found",
        err
      });
    });
};
