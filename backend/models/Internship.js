const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternshipSchema = new Schema(
  {
    studentID: String,
    companyName: String,
    companyEmail: String,
    companyPhone: String,
    companyResponsibleName: String,
    companyResponsibleSurname: String,
    companyPersonalCount: Number,
    companyTaxNumber: String,
    companyAddress: String,
    internshipDateRange: Array,
    instructions: Boolean,
    internship: {
      type: String,
      enum: ["software", "hardware", "intorn"]
    },
    companyApproval: {
      type: Boolean,
      default: false
    },
    consultantApproval: {
      type: Boolean,
      default: false
    },
  },
  {
    collection: "Internships",
    timestamps: true
  }
);

module.exports = mongoose.model("Internship", InternshipSchema);
