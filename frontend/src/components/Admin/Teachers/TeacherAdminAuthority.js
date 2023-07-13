import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {authorityUser} from "../../../redux/userSlice";

const TeacherAdminAuthority = ({ openAuthorityModal, setOpenAuthorityModal, selectedTeacher }) => {
    const [ buttonLoading, setButtonLoading ] = useState(false)
    const [teacherValues, setTeacherValues] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        setTeacherValues({
            name: selectedTeacher?.name ,
            surname: selectedTeacher?.surname
        })
    }, [selectedTeacher])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenAuthorityModal(false)
        }, 3000)
    }

    const handleUserAuthority = () => {
        setButtonLoading(true)
        const deleteTeacherPromise = () => {
            return new Promise((resolve, reject) =>
                setTimeout(() => {
                    dispatch(authorityUser({ _id: selectedTeacher.key }))
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
                                reject('Öğretmene Admin yetkisi verilirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Teacher authority admin request failed')
                            }
                        }).catch((err) => {
                        console.error(err)
                    })
                }, 3000)
            )
        }

        toast.promise(deleteTeacherPromise(), {
            pending: 'Öğretmene Yetki Veriliyor...',
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
            title={'Öğretmene Admin Yetkisi Verme'}
            open={openAuthorityModal}
            width={450}
            onCancel={() => setOpenAuthorityModal(false)}
            style={{
                fontFamily: 'open sans'
            }}
            footer={[
                <Space
                    key={uuidv4()}
                >
                    <Button
                        type="primary"
                        onClick={() => setOpenAuthorityModal(false)}
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
                            backgroundColor: 'green',
                            fontFamily: 'open sans'
                        }}
                        onClick={() => handleUserAuthority()}
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
                `${teacherValues.name} ${teacherValues.surname} öğretmenini admin yetkisi vermek istediğinize emin misiniz ?`
            }
        </Modal>
    )
}

export default TeacherAdminAuthority
