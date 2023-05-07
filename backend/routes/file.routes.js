import { fileUpload } from '../controllers/file.controllers.js'
import { Router } from 'express'
const router = Router()

router.route('/upload').post(fileUpload)

export default router