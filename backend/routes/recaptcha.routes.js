const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/verify", async (req, res) => {
  const { token } = req.body;
  await axios
    .post(`${process.env.VERIFY_URL}?secret=${process.env.SECRET_KEY}&response=${token}`);

  if (res.status(200)) {
    return res.send(true);
  } else {
    return res.send(false);
  }
});

module.exports = router;
