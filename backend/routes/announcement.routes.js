import { 
    createAnnouncement, 
    deleteAnnouncement, 
    getAllAnnouncements, 
    updateAnnouncement 
} from '../controllers/announcement.controller.js'
import { Router } from 'express'
const router = Router()

router.route('/create').post(createAnnouncement)
router.route('/update').post(updateAnnouncement)
router.route('/delete').post(deleteAnnouncement)
router.route('/getAll').get(getAllAnnouncements)

export default router