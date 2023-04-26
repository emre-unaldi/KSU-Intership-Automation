import { Router } from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  checkUser,
  getAllUserAndInternships
} from '../controllers/user.controllers.js'
const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/check').post(checkUser)
router.route('/getAll').post(getAllUserAndInternships)

export default router
