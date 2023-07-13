import { Router } from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  checkUser,
  getAllUserAndInternships,
  getAllUsers, deleteUser, updateUser, authorityUser
} from '../controllers/user.controllers.js'
const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/check').post(checkUser)
router.route('/getAll').post(getAllUserAndInternships)
router.route('/getUsers').post(getAllUsers)
router.route('/delete').post(deleteUser)
router.route('/update').post(updateUser)
router.route('/authority').post(authorityUser)

export default router
