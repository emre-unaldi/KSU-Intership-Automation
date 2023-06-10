
import React, { useState } from 'react'
import { Button, Modal, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const PeriodClose = () => {
    const [ openModal, setOpenModal ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handlePeriodDelete = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setOpenModal(false)
        }, 2000)
    }

    return (
        <>
            <Button
                onClick={() => setOpenModal(true)}
                type="primary"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    fontSize: 16
                }}
                
            >
                Kapat
            </Button>
            <Modal
                title='Dönem Kapatma'
                open={openModal}
                width={500}
                onCancel={() => setOpenModal(false)}
                style={{
                    fontFamily: 'open sans'
                }}
                footer={[
                    <Space 
                        key='periodClose'
                    >
                        <Button
                            type="primary"
                            onClick={() => setOpenModal(false)}
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
                Dönemi kapatmak istediğinize emin misiniz ?
            </Modal>
        </>
    )
}

export default PeriodClose