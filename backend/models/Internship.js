import { Schema, model } from 'mongoose'

const InternshipSchema = new Schema(
  {
    studentID: Schema.Types.ObjectId,
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
    isNotebookFileLoaded: {
      type: Boolean,
      default: false
    },
    isChartFileLoaded: {
      type: Boolean,
      default: false
    },
    isReportFileLoaded: {
      type: Boolean,
      default: false
    },
    companyApprovalUpdate: {
      type: Boolean,
      default: false
    },
    consultantApprovalUpdate: {
      type: Boolean,
      default: false
    },
    internship: {
      type: String,
      enum: ['software', 'hardware', 'ume']
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
    collection: 'Internships',
    timestamps: true
  }
)

export default model('Internship', InternshipSchema)
