import React, {useEffect, useMemo, useState} from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {deleteUser} from "../../../redux/userSlice";

const TeacherDelete = ({ openDeleteModal, setOpenDeleteModal, selectedDeleteTeacher }) => {
    const [ buttonLoading, setButtonLoading ] = useState(false)
    const [teacherValues, setTeacherValues] = useState({})
    const dispatch = useDispatch()

    const initialTeachersValues = useMemo(() => {
        return {
            name: selectedDeleteTeacher?.name ,
            surname: selectedDeleteTeacher?.surname
        }
    }, [selectedDeleteTeacher])

    useEffect(() => {
        setTeacherValues(initialTeachersValues)
    }, [initialTeachersValues])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenDeleteModal(false)
        }, 3000)
    }

    const handleDelete = () => {
        setButtonLoading(true)
        const deleteTeacherPromise = () => {
            return new Promise((resolve, reject) =>
                setTimeout(() => {
                    dispatch(deleteUser({ _id: selectedDeleteTeacher.key }))
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
                                reject('Öğretmen kaydı silinirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Teacher delete request failed')
                            }
                        }).catch((err) => {
                        console.error(err)
                    })
                }, 3000)
            )
        }

        toast.promise(deleteTeacherPromise(), {
            pending: 'Öğretmen Kaydı Siliniyor...',
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
            title={'Öğretmen Kaydı Silme'}
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
                `${teacherValues.name} ${teacherValues.surname} öğretmeninin kaydını silmek istediğinize emin misiniz ?`
            }
        </Modal>
    )
}

export default TeacherDelete
