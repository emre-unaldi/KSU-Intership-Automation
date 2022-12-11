const mongoose = require("mongoose");

module.exports = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect("mongodb://localhost:27017/internship-automation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("open", () => {
    console.log("MongoDB: Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB: Not Connected", err);
  });
  mongoose.Promise = global.Promise; // mongoose içindeki global promise yapısı
};
