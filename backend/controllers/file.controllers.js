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
        const internshipType = file.originalname.split("_")[0]
        const fileToUpload = file.originalname.split("_")[1]

        fs.mkdirSync(path.join(rootDir, '..', 'public', 'uploads', internshipType, fileToUpload), { recursive: true })
        callback(null, path.join(rootDir, '..', 'public', 'uploads', internshipType, fileToUpload))

    },
    filename: (req, file, callback) => {
        const extension = file.mimetype.split('/')[1]
        const uniqueName =  file.originalname.split('.')[0]
        const url = `${uniqueName}.${extension}`

        callback(null, url)
    }
})

const upload = multer({ storage, fileFilter }).single('file')

const convertToTR = (documentType) => {
    if (documentType === 'notebook') {
        return 'Staj defteri'
    } else if (documentType === 'chart') {
        return 'Staj çizelgesi'
    } else if (documentType === 'report') {
        return 'Staj raporu'
    }
}

const readDirectory = (dirPath, studentID) => {
    let files = []

        if (studentID) {
            try {
                const dirFiles = fs.readdirSync(dirPath)
            
                dirFiles.forEach((file) => {       
                    const filePath = path.join(dirPath, file)
                    const fileStat = fs.statSync(filePath)
            
                    if (fileStat.isDirectory()) {
                        const subFiles = readDirectory(filePath, studentID)
                        files = files.concat(subFiles)
                    } else {
                        const fileNameParts = file.split('.')[0]
                        const fileNameStudentID = fileNameParts.split('_')[2]
                        
                        if (fileNameStudentID === studentID) {
                            files.push({
                                name: file,
                                size: fileStat.size,
                                path: filePath,
                                studentID: studentID,
                                internshipType: file.split('_')[0],
                                documentType: file.split('_')[1],                                
                                createdAt: fileStat.birthtime,
                                modifiedAt: fileStat.mtime
                            })
                        }
                    }
                }) 
            } catch (error) {
                files = false
            }
        } else {
            files = false
        }
        
    return files
}

// File Upload Endpoint
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
            let fileName = convertToTR(req.file.originalname.split('_')[1])
            return res.json({
                status: 'success',
                data: req.file,
                message: `${fileName} başarıyla yüklendi`
            })
        }
    })
}

// File Fetch And View Endpoint
const fileFetch = async (req, res) => {
    const { studentID } = await req.body
    const _dirname = path.dirname(fileURLToPath(import.meta.url))
    const dirPath = path.join(_dirname, '..', 'public', 'uploads')
    const files = readDirectory(dirPath, studentID)

    if (studentID) {
        if (files !== false) {
            res.json({
                'status' : 'success',
                'message' : 'Dizin okundu ve dosya bilgileri başarıyla alındı',
                'data': files
            })
        } else {
            res.json({
                'status' : 'fail',
                'message' : 'Dizin okunamadı veya dosya bilgileri alınamadı',
                'data': files
            })
        }
    } else {
        res.json({
            'status' : 'fail',
            'message' : 'Öğrenci kimliği bulunamadı',
            'data': files
        })
    }
}

// File Deletion Endpoint
const fileDelete = async (req, res) => {
    const { fileName, documentType, internshipType } = await req.body

    if (typeof fileName === 'string') {
        const _dirname = path.dirname(fileURLToPath(import.meta.url))
        const dirPath = path.join(_dirname, '..', 'public', 'uploads')
        const filePath = path.join(dirPath, internshipType, documentType, fileName)
    
        fs.unlink(filePath, (error) => {
            if (error) {
                return res.json({
                    'status' : 'fail',
                    'message' : 'Dosya silinemedi. Böyle bir dosya ya da dizin yok'
                })
            } else {
                return res.json({
                    'status' : 'success',
                    'message' : `${convertToTR(fileName.split('_')[1])} başarıyla silindi`,
                    'data' : fileName
                })
            }
        })
    } else {
        return res.json({
            'status' : 'fail',
            'message' : 'Dosya silinemedi. Böyle bir dosya ya da dizin yok'
        })
    }
}

export { fileUpload, fileFetch, fileDelete }