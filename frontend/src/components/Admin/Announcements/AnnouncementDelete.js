import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { deleteAnnouncement } from '../../../redux/announcementSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const AnnouncementDelete = ({ openDeleteModal, setOpenDeleteModal, selectedAnnouncement }) => {
    const [ buttonLoading, setButtonLoading ] = useState(false)
    const [announcementValues, setAnnouncementValues] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        setAnnouncementValues({
            title: selectedAnnouncement?.title ,
            type: selectedAnnouncement?.type ,
            content: selectedAnnouncement?.content
        })
    }, [selectedAnnouncement])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenDeleteModal(false)
        }, 3000)
    }

    const handleDelete = () => {
        setButtonLoading(true)

        const deleteAnnouncementPromise = () => {
            return new Promise((resolve, reject) => 
                setTimeout(() => {
                    dispatch(deleteAnnouncement({ _id: selectedAnnouncement.key }))
                        .then((deleted) => {
                            if (deleted?.meta?.requestStatus === 'fulfilled') {
                                if (deleted?.payload?.status === 'success') {
                                    refreshPage()
                                    resolve(deleted.payload.message)    
                                    setButtonLoading(false)                                
                                } else {
                                    refreshPage()
                                    reject(deleted.payload.message)
                                    setButtonLoading(false)
                                }
                            } else {
                                refreshPage()
                                reject('Duyuru silinirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Announcement delete request failed')
                            }
                        }).catch((err) => {
                            console.error(err)
                        })
                }, 3000)
            )
        }

        toast.promise(deleteAnnouncementPromise(), {
            pending: 'Duyuru Siliniyor...',
            success: {
                render({ data }) {
                    return data
                }
            },
            error: {
                render({ data }) {
                    return data
                }
            }
        })


    }

    return (
        <Modal
            title={'Duyuru Silme'}
            open={openDeleteModal}
            width={450}
            onCancel={() => setOpenDeleteModal(false)}
            style={{
                fontFamily: 'open sans'
            }}
            footer={[
                <Space
                    key={uuidv4()}
                >
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
                        style={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            backgroundColor: '#FF4D4F',
                            fontFamily: 'open sans'
                        }}
                        onClick={() => handleDelete()}
                    >
                        Evet
                        {
                            buttonLoading ?  
                                <LoadingOutlined /> 
                                    :
                                null
                        }    
                    </Button>
                </Space>
            ]}
        >
            {
                `${announcementValues.title} başlıklı 
                ${announcementValues.type} türündeki 
                duyuruyu silmek istediğinize emin misiniz ?` 
            } 
        </Modal>
    )
}

export default AnnouncementDelete