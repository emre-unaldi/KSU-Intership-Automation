import React, {useEffect, useMemo, useState} from 'react'
import {LoadingOutlined} from '@ant-design/icons'
import {Button, Modal, Space} from 'antd'
import {v4 as uuidv4} from 'uuid'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {deleteInternship} from "../../../redux/internshipSlice";

const InternshipDelete = ({openDeleteModal, setOpenDeleteModal, selectedDeleteInternship}) => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [internshipValues, setInternshipValues] = useState({})
    const dispatch = useDispatch()

    const initialInternshipValues = useMemo(() => {
        return {
            internship: selectedDeleteInternship?.internship
        }
    }, [selectedDeleteInternship])

    useEffect(() => {
        setInternshipValues(initialInternshipValues)
    }, [initialInternshipValues])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenDeleteModal(false)
        }, 3000)
    }

    const handleDelete = () => {
        setButtonLoading(true)
        const deleteInternshipPromise = () => {
            return new Promise((resolve, reject) =>
                setTimeout(() => {
                    dispatch(deleteInternship({_id: selectedDeleteInternship.key}))
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
                                reject('Staj silinirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Internship delete request failed')
                            }
                        }).catch((err) => {
                        console.error(err)
                    })
                }, 3000)
            )
        }

        toast.promise(deleteInternshipPromise(), {
            pending: 'Staj Kaydı Siliniyor...',
            success: {
                render({data}) {
                    return data
                }
            },
            error: {
                render({data}) {
                    return data
                }
            }
        })
    }

    return (
        <Modal
            title={'Staj Kaydı Silme'}
            open={openDeleteModal}
            width={500}
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
                                <LoadingOutlined/>
                                :
                                null
                        }
                    </Button>
                </Space>
            ]}
        >
            {
                `${internshipValues.internship} stajını silmek istediğinize emin misiniz ?`
            }
        </Modal>
    )
}

export default InternshipDelete
