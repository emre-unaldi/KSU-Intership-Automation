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
            >
                <embed
                    src={`http://localhost:3001/uploads/${file.type}s/${file.name}`}
                    width="100%"
                    height="500"
                    type="application/pdf"
                />
            </Modal>
        </>
    )
}

export default FileView
