import React from 'react'
import { Button, Modal } from 'antd'
import { CloseCircleFilled, DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fileDeleteByUser } from '../../../redux/documentSlice'

function FileDelete(props) {
    const { file, titleConvertToTR } = props
    const { confirm } = Modal
    const dispatch = useDispatch()

    const fileDeleteConfirm = (file) => {
        confirm({
            title: `${titleConvertToTR} Silme`,
            icon: <CloseCircleFilled 
                style={{
                    color: '#fe4c54'
                }}
            />,
            content: 'Bu belgeyi silmek istediğinize emin misiniz ?',
            closable: true,
            okText: 'Evet',
            cancelText: 'Hayır',
            okButtonProps:{
                type: 'primary',
                danger: true
            },
            cancelButtonProps: {
                type: 'primary'
            },
            onOk: async () => {
                return await new Promise((Resolve, Reject) => {
                    setTimeout(
                        dispatch(fileDeleteByUser({name : file.name, type : file.type}))
                        .then((deletion) => {
                            if (deletion?.meta?.requestStatus === 'fulfilled') {
                                if (deletion.payload.status === 'success') {
                                    toast.success(deletion.payload.message)
                                    setTimeout(() => {
                                        window.location.reload()
                                        Resolve()
                                    }, 3000)
                                } else {
                                    toast.error(deletion.payload.message)
                                    Reject()
                                }
                            } else {
                                Reject()
                                throw new Error('File deleted request failed')
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            toast.error(error)
                        }), 
                    3000
                    )
                })
            }
        })
    }
    
    return (
        <>
            <Button
                icon={<DeleteOutlined />}
                onClick={() => fileDeleteConfirm(file)}
                type="primary"
                danger
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
        </>
    )
}

export default FileDelete