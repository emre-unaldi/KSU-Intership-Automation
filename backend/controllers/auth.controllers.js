// Models
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 60 * 60 * 24;

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const userConfig = (userRole) => {
  let userConfig = {};

  switch (userRole) {
    case "student":
      userConfig = {
        path: "/student/home",
        roleTR: "Öğrenci",
      };
      break;
    case "teacher":
      userConfig = {
        path: "/teacher/home",
        roleTR: "Öğretmen",
      };
      break;
    case "admin":
      userConfig = {
        path: "/admin/home",
        roleTR: "Yönetici",
      };
      break;
  }
  return userConfig;
};

// Kullanıcı ekleme endpointi
exports.signupUser = async (req, res) => {
  const user = new User(req.body);

  await user
    .save()
    .then((user) => {
      res.json({
        status: "success",
        path: "/login",
        message: `${userConfig(user.role).roleTR} kullanıcısı eklendi.`,
        user,
      });
    })
    .catch((err) => {
      res.json({
        status: "fail",
        path: "/register",
        message: `${userConfig(user.role).roleTR} kullanıcısı eklenemedi.`,
        err,
      });
    });
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
          res.json({
            status: "success",
            path: userConfig(user.role).path,
            user,
          });
        } else {
          // parola yanlışsa
          res.json({
            status: "fail",
            path: "/login",
            message: "Parola yanlış",
          });
        }
      });
    })
    .catch(() => {
      // kullanıcı yoksa
      res.json({
        status: "fail",
        path: "/login",
        message: "Kullanıcı bulunamadı",
      });
    });
};

// Kullanıcı çıkış yap endpointi
exports.logoutUser = (req, res) => {
  res.clearCookie("CONNECT_UID");
  res.json({
    status: "success",
    path: "/login",
    message: "Kullanıcı çıkış yaptı",
  });
};

// Kullanıcı kontrol endpointi
exports.checkUser = (req, res) => {
  const token = req.cookies.CONNECT_UID;

  if (token) {
    // token var
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({
          status: "fail",
          message: "Token doğrulanamadı",
          path: "/login",
          err,
        });
      } else {
        const currentUser = await User.findById(decodedToken.userId);

        if (currentUser) {
          res.json({
            status: "success",
            message: "Kullanıcı bulundu",
            currentUser,
          });
        } else {
          res.json({
            status: "fail",
            message: "Kullanıcı bulunamadı && Token doğrulanamadı",
            path: "/login",
          });
        }
      }
    });
  } else {
    // token yok
    res.json({
      status: "fail",
      message: "Token bulunamadı",
      path: "/login",
    });
  }
};
