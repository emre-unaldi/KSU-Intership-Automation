const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const { token } = req.body;

  await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
  );
  
  if (res.status(200)) {
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
