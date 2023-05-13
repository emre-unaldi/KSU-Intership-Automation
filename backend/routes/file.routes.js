import { fileUpload, fileFetch, fileDelete } from '../controllers/file.controllers.js'
import { Router } from 'express'
const router = Router()

router.route('/upload').post(fileUpload)
router.route('/fetch').post(fileFetch)
router.route('/delete').post(fileDelete)

export default router