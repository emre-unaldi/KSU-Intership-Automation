import React, { useState } from 'react'
import { Button, Modal, Space } from 'antd'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fileDeleteByUser } from '../../../redux/documentSlice'

const FileDelete = (props) => {
    const [ openDeleteModal, setOpenDeleteModal ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const { file, titleConvertToTR } = props
    const dispatch = useDispatch()

    const handleFileDelete = (file) => {
        setLoading(true)
        setTimeout(() => {
            dispatch(fileDeleteByUser({
                name : file.name, 
                documentType : file.documentType,
                internshipType : file.internshipType
            }))
            .then((deletion) => {
                if (deletion?.meta?.requestStatus === 'fulfilled') {
                    if (deletion.payload.status === 'success') {
                        toast.success(deletion.payload.message)
                        setTimeout(() => {
                            window.location.reload()
                        }, 3000)
                    } else {
                        toast.error(deletion.payload.message)
                    }
                } else {
                    throw new Error('File deleted request failed')
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error(error)
            })
            setLoading(false)
            setOpenDeleteModal(false)
        }, 2000)
    }
    
    return (
        <>
            <Button
                icon={<DeleteOutlined />}
                onClick={() => setOpenDeleteModal(true)}
                type="primary"
                danger
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
            <Modal
                title={`${titleConvertToTR} Silme`}
                open={openDeleteModal}
                width={500}
                onCancel={() => setOpenDeleteModal(false)}
                style={{
                    fontFamily: 'open sans'
                }}
                footer={[
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => setOpenDeleteModal(false)}
                            style={{
                                backgroundColor: '#1677FF',
                                fontFamily: 'open sans'
                            }}
                        >
                            Hayır
                        </Button>
                        <Button 
                            type="primary" 
                            onClick={() => handleFileDelete(file)}
                            style={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                                backgroundColor: '#FF4D4F',
                                fontFamily: 'open sans'
                            }}
                        >
                            Evet
                            {
                                loading ?  <LoadingOutlined /> : null
                            }    
                        </Button>
                    </Space>
                ]}
            >
                Bu belgeyi silmek istediğinize emin misiniz ?
            </Modal>
        </>
    )
}

export default FileDelete