import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

const FileView = (props) => {
    const [ openViewModal, setOpenViewModal ] = useState(false)
    const { file, titleConvertToTR } = props
    
    return (
        <>
            <Button
                icon={<EyeOutlined />}
                onClick={() => setOpenViewModal(true)}
                type="primary"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
            <Modal
                title={`${titleConvertToTR} Görüntüleme`}
                open={openViewModal}
                footer={false}
                width={1000}
                onCancel={() => setOpenViewModal(false)}
                centered
                style={{
                    fontFamily: 'open sans'
                }}
            >
                <embed
                    src={`http://localhost:3001/uploads/${file.internshipType}/${file.documentType}/${file.name}`}
                    width="100%"
                    height="500"
                    type="application/pdf"
                    style={{
                        fontFamily: 'open sans',
                        borderRadius: 10,
                        border: '5px solid #323639'
                    }}
                />
            </Modal>
        </>
    )
}

export default FileView
