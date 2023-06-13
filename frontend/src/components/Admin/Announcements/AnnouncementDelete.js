import { LoadingOutlined } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AnnouncementDelete = ({ openDeleteModal, setOpenDeleteModal, selectedAnnouncement }) => {
    const [ buttonLoading, setButtonLoading ] = useState(false)
    const [announcementValues, setAnnouncementValues] = useState({})

    useEffect(() => {
        setAnnouncementValues({
            title: selectedAnnouncement?.title ,
            type: selectedAnnouncement?.type ,
            content: selectedAnnouncement?.content
        })
    }, [selectedAnnouncement])

    console.log(announcementValues);

    const handleLoading = () => {
        setButtonLoading(true)
        setTimeout(() => {
            setButtonLoading(false)
            setOpenDeleteModal(false)
        }, 3000)
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
                        onClick={() => handleLoading(true)}
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
            {`${announcementValues.title} başlıklı ${announcementValues.type} türündeki duyuruyu silmek istediğinize emin misiniz ?` } 
        </Modal>
    )
}

export default AnnouncementDelete