import React, { useState } from 'react'
import { Button, Modal, Space } from 'antd'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'

const PeriodDelete = () => {
    const [ openDeleteModal, setOpenDeleteModal ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handlePeriodDelete = () => {
        setLoading(true)
        setTimeout(() => {
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
                    alignItems: 'center',
                    padding: '0 35px'
                }}
                
            />
            <Modal
                title='Dönem Silme'
                open={openDeleteModal}
                width={500}
                onCancel={() => setOpenDeleteModal(false)}
                style={{
                    fontFamily: 'open sans'
                }}
                footer={[
                    <Space 
                        key='periodDelete' 
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
                            onClick={() => handlePeriodDelete()}
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
                                loading ?  
                                    <LoadingOutlined /> 
                                        :
                                    null
                            }    
                        </Button>
                    </Space>
                ]}
            >
                Dönemi silmek istediğinize emin misiniz ?
            </Modal>
        </>
    )
}

export default PeriodDelete