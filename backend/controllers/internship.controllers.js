// Models
const Internship = require("../models/Internship");

// Staj oluşturma endpointi
exports.createInternship = async (req, res) => {
  // Öğrenci id'sine göre staj arama
  const userInternship = await Internship.findOne({studentID: req.body.studentID});

  if (userInternship) {
    // Kullanıcının staj kaydı varsa hata döndürün
    return res.json({
      status: "fail",
      message: "This student is already doing the internship",
      userInternship
    });
  } else {
    const internship = new Internship(req.body);

    // Kullanıcının staj kaydı yoksa staj kaydını oluştur
    await internship
      .save()
      .then((internship) => {
        return res.json({
          status: "success",
          message: `Student Id:${internship.studentID} registered for internship`,
          internship
        });
      })
      .catch((err) => {
        return res.json({
          status: "fail",
          message: `The student Id:${internship.studentID} could not be registered for internship`,
          err
        });
      });
  }
};

// Staj getirme endpointi
exports.getInternshipById = async (req, res) => {
  const internship = Internship.findOne({ studentID: req.body.studentID });

  await internship
    .then((internship) => {
      return res.json({
        status: "success",
        message: "User internship found",
        internship
      });
    })
    .catch((err) => {
      return res.json({
        status: "fail",
        message: "User internship not found",
        err
      });
    });
};

// Stajları listeleme endpointi
exports.getAllInternships = async (req, res) => {
  const internships = Internship.find({});

  await internships
    .then((internships) => {
      return res.json({
        status: "success",
        message: "All internships found",
        internships
      });
    })
    .catch((err) => {
      return res.json({
        status: "fail",
        message: "All internships not found",
        err
      });
    });
};
