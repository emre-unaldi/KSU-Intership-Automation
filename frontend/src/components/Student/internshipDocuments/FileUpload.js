import React, { useEffect, useState } from 'react'
import { Space, Upload, Typography } from 'antd'
import { DropboxOutlined, FilePdfFilled } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import { fileUploadByUserId, fileFetchByUserId } from '../../../redux/documentSlice'
import { Link } from 'react-router-dom'
import FileDelete from './FileDelete'
import FileView from './FileView'

const FileUpload = (props) => {
    const [ files, setFiles ] = useState()
    const { documentType } = props
    const { Dragger } = Upload
    const { Text } = Typography
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state.user.check?.data?.user?._id)

    useEffect(() => {
        dispatch(fileFetchByUserId({ studentID : currentUserId }))
        .then((fetch) => {
            if (fetch?.meta?.requestStatus === 'fulfilled') {
                if (fetch.payload.status === 'success') {
                    if (fetch.payload.data.length !== 0) {
                        setFiles(fetch.payload.data)
                    } else {
                        setFiles(false)
                    }
                } else {
                    setFiles(false)
                }
            } else {
                throw new Error('File fetch request failed')
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }, [dispatch, currentUserId])

    const customUploadRequest = (options, fileToUpload, currentUserId) => {
        const { file, onSuccess, onError } = options
        const reader = new FileReader()
        let renamedFile

        const fileExtension  = '.pdf'
        const isPdfFile = file.name.endsWith(fileExtension );

        if (isPdfFile) {
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                switch (fileToUpload) {
                    case 'notebook':
                        renamedFile = new File(
                            [reader.result],
                            `notebook_${currentUserId}.pdf`,
                            { type: file.type }
                        )
                    break
                    case 'chart':
                        renamedFile = new File(
                            [reader.result],
                            `chart_${currentUserId}.pdf`,
                            { type: file.type }
                        )
                    break
                    case 'report':
                        renamedFile = new File(
                            [reader.result],
                            `report_${currentUserId}.pdf`,
                            { type: file.type }
                        )
                    break
                    default:
                    break
                }

                const formData = new FormData()
                formData.append('file', renamedFile)

                dispatch(fileUploadByUserId(formData))
                .then((upload) => {
                    if (upload?.meta?.requestStatus === 'fulfilled') {
                        if (upload.payload.status === 'success') {
                            toast.success(upload.payload.message)
                            setTimeout(() => {
                                window.location.reload()
                            }, 3000)
                        } else {
                            toast.error(upload.payload.message)
                        }
                        onSuccess(upload.payload.data, renamedFile)
                    } else {
                        throw new Error('File upload request failed')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error(error)
                    onError(error)
                })
            }
        } else {
            toast.error('Sadece pdf dosyası yükleyebilirsiniz')
        }
    }

    const titleConvertToTR = (fileType) => {
        if (fileType === 'notebook') {
            return 'Staj Belgesi'
        } else if (fileType === 'chart') {
            return 'Staj Çizelgesi'
        } else if (fileType === 'report') {
            return 'Staj Raporu'
        }
    }

    return (
        <>
        <Dragger
            listType="picture"
            showUploadList={false}
            customRequest={(options) => customUploadRequest(options, documentType, currentUserId)}
        >
            <Space
                style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    padding: 10
                }}
            >
                <DropboxOutlined 
                    style={{
                        fontSize: '48px',
                        color: '#1f77ee',
                        paddingBottom: 15
                    }}
                />
                <Text strong type='secondary'>
                    Dosya yüklemek için bu alana tıklayıp dosya seçin veya 
                    dosyayı bu alana sürükleyip bırakın
                </Text>
                <Text type='secondary'>
                    Dosya pdf dosyası olmak zorundadır <br />
                    Yanlış dosya yüklemelerinden öğrenci sorumludur
                </Text>
            </Space>
        </Dragger>
        {
            files ? 
            files.filter((file) => file.type === documentType)
            .map((file) =>             
                (
                    <Space
                        style={{
                            border: '1px solid #d9d9d9',
                            borderRadius: 10,
                            padding: 10,
                            marginTop: 10,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                        key={uuidv4()}
                    >
                        <Space>
                            <FilePdfFilled  
                                style={{
                                    fontSize: '40px',
                                    color: '#fe4c54'
                                }}
                            />
                            <Text>
                                <Link href={`http://localhost:3001/uploads/${file.type}s/${file.name}`} target='_blank'>
                                    {file.name.split('_')[0] + '.pdf'}
                                </Link>
                            </Text>
                        </Space>
                        <Space>
                            <FileDelete titleConvertToTR={titleConvertToTR(file.type)} file={file} />
                            <FileView titleConvertToTR={titleConvertToTR(file.type)} file={file} />
                        </Space>
                    </Space>
                )
            )
            : 
            null
        }
        </>
    )
}

export default FileUpload
