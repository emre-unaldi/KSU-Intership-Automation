import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Internship from '../models/Internship.js'

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

const convertToTR = (fileType) => {
    if (fileType === 'notebook') {
        return 'Staj defteri'
    } else if (fileType === 'chart') {
        return 'Staj çizelgesi'
    } else if (fileType === 'report') {
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
                        const fileOwnerId = fileNameParts.split('_')[2]
                        
                        if (fileOwnerId === studentID) {
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
    upload(req, res, async (error) => {
        if (error instanceof multer.MulterError) {
            return res.json({
                status: 'fail',
                message: `Multer Errors: ${error}`
            });
        } else if (error) {
            return res.json({
                status: 'fail',
                message: error
            })
        } else {
            const fileOriginalName = await req.file.originalname.split('.')[0];
            const internshipType = await fileOriginalName.split('_')[0];
            const fileType = await fileOriginalName.split('_')[1];
            const fileOwnerId = await fileOriginalName.split('_')[2];
            let updateField;

            switch (fileType) {
                case 'notebook':
                    updateField = { isNotebookFileLoaded: true }
                    break
                case 'report':
                    updateField = { isReportFileLoaded: true }
                    break
                case 'chart':
                    updateField = { isChartFileLoaded: true }
                    break
                default:
                    return res.json({
                        status: 'fail',
                        message: 'Dosya adı çözümlenemedi. Geçersiz dosya türü'
                    })
            }

            await Internship.findOneAndUpdate(
                { studentID: fileOwnerId, internship: internshipType },
                { $set: updateField },
                { new: true }
            )
            .then((internship) => {
                return res.json({
                    status: 'success',
                    data: req.file,
                    internship: internship,
                    message: `${convertToTR(fileType)} başarıyla yüklendi`
                })
            })
            .catch((error) => {
                return res.json({
                    status: 'fail',
                    message: error
                })
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
    const fileOriginalName = fileName.split('.')[0]
    const fileOwnerId = fileOriginalName.split('_')[2]

    if (typeof fileName === 'string') {
        const _dirname = path.dirname(fileURLToPath(import.meta.url))
        const dirPath = path.join(_dirname, '..', 'public', 'uploads')
        const filePath = path.join(dirPath, internshipType, documentType, fileName)
    
        fs.unlink(filePath, async (error) => {
            if (error) {
                return res.json({
                    'status' : 'fail',
                    'message' : 'Dosya silinemedi. Böyle bir dosya ya da dizin yok'
                })
            } else {
                let updateField;

                switch (documentType) {
                    case 'notebook':
                        updateField = { isNotebookFileLoaded: false }
                    break
                    case 'report':
                        updateField = { isReportFileLoaded: false }
                    break
                    case 'chart':
                        updateField = { isChartFileLoaded: false }
                    break
                    default:
                        return res.json({
                            status: 'fail',
                            message: 'Dosya adı çözümlenemedi. Geçersiz dosya türü'
                        })
                }

                await Internship.findOneAndUpdate(
                    { studentID: fileOwnerId, internship: internshipType },
                    { $set: updateField },
                    { new: true }
                )
                    .then((internship) => {
                        return res.json({
                            'status' : 'success',
                            'message' : `${convertToTR(documentType)} başarıyla silindi`,
                            'internship': internship,
                            'data' : fileName
                        })
                    })
                    .catch((err) => {
                        return res.json({
                            status: 'fail',
                            message: err
                        })
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