import {
  createInternship,
  getAllInternships,
  sendInternshipConfirmationMail,
  companyApprovalStatus,
  consultantApprovalStatus,
  deleteInternship, updateInternship
} from '../controllers/internship.controllers.js'
import { Router } from 'express'
const router = Router()

router.route('/create').post(createInternship)
router.route('/delete').post(deleteInternship)
router.route('/update').post(updateInternship)
router.route('/getAll').post(getAllInternships)
router.route('/sendMail').post(sendInternshipConfirmationMail)
router.route('/companyApproval').post(companyApprovalStatus)
router.route('/consultantApproval').post(consultantApprovalStatus)

export default router
