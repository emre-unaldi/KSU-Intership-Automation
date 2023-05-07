import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const fileFilter = (req, file, callback) => {
    const allowedExtensions = ['.pdf']
    const allowedMimeTypes = ['application/pdf']
    const extension = path.extname(file.originalname).toLowerCase()

    if ( !allowedExtensions.includes(extension) || !allowedMimeTypes.includes(file.mimetype) ) {
        callback('Sadece pdf dosyası yükleyebilirsiniz', false)
    } else {
        callback(null, true)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const rootDir = path.dirname(fileURLToPath(import.meta.url))
        const fileToUpload = file.originalname.split("_")[0]

        switch (fileToUpload) {
            case 'notebook':
                fs.mkdirSync(path.join(rootDir, '..', 'public', 'uploads', 'notebooks'), { recursive: true })
                callback(null, path.join(rootDir, '..', 'public', 'uploads', 'notebooks'))
            break
            case 'chart':
                fs.mkdirSync(path.join(rootDir, '..', 'public', 'uploads', 'charts'), { recursive: true })
                callback(null, path.join(rootDir, '..', 'public', 'uploads', 'charts'))
            break
            case 'report':
                fs.mkdirSync(path.join(rootDir, '..', 'public', 'uploads', 'reports'), { recursive: true })
                callback(null, path.join(rootDir, '..', 'public', 'uploads', 'reports'))
            break
            default: break
        }
    },
    filename: (req, file, callback) => {
        const extension = file.mimetype.split('/')[1]
        const uniqueName =  file.originalname.split('.')[0] + '_' + Date.now()
        const url = `${uniqueName}.${extension}`

        callback(null, url)
    }
})

const upload = multer({ storage, fileFilter }).single('file')

// Dosya yükleme endpointi
const fileUpload = (req, res) => {
    upload(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            return res.json({
                status: 'fail',
                message: `Multer Errors : ${error}`
            })
        } else if (error) {
            return res.json({
                status: 'fail',
                message: error
            })
        } else {
            return res.json({
                status: 'success',
                data: req.file,
                message: `${req.file.originalname} dosyası başaryla yüklendi`
            })
        }
    })
}

export { fileUpload }
