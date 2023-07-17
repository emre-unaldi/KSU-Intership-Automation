import React, {useEffect, useMemo, useState} from 'react'
import {LoadingOutlined} from '@ant-design/icons'
import {Button, Modal, Space} from 'antd'
import {v4 as uuidv4} from 'uuid'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {sendInternshipConfirmationMail} from "../../../redux/internshipSlice";

const InternshipSendEmail = ({openSendEmailModal, setOpenSendEmailModal, selectedSendEmailInternship}) => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [internshipValues, setInternshipValues] = useState({})
    const dispatch = useDispatch()

    const convertToTR = (internship) => {
        if (internship === "software") {
            return "Yazılım"
        } else if (internship === "hardware") {
            return "Donanım"
        } else {
            return "UME"
        }
    }
    const convertToEN = (internship) => {
        if (internship === "Yazılım") {
            return "software"
        } else if (internship === "Donanım") {
            return "hardware"
        } else {
            return "ume"
        }
    }

    const initialInternshipValues = useMemo(() => {
        return {
            studentID: selectedSendEmailInternship?.studentID,
            internship: convertToEN(selectedSendEmailInternship?.internship)
        }
    }, [selectedSendEmailInternship])

    useEffect(() => {
        setInternshipValues(initialInternshipValues)
    }, [initialInternshipValues])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenSendEmailModal(false)
        }, 3000)
    }

    const handleSendEmail = () => {
        setButtonLoading(true)
        const sendEmailInternshipPromise = () => {
            return new Promise((resolve, reject) =>
                setTimeout(() => {
                    dispatch(sendInternshipConfirmationMail(internshipValues))
                        .then((sendEmail) => {
                            if (sendEmail?.meta?.requestStatus === 'fulfilled') {
                                if (sendEmail?.payload?.status === 'success') {
                                    refreshPage()
                                    resolve(sendEmail.payload.message)
                                    setButtonLoading(false)
                                } else {
                                    refreshPage()
                                    reject(sendEmail.payload.message)
                                    setButtonLoading(false)
                                }
                            } else {
                                refreshPage()
                                reject('Staj onay maili gönderilirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Internship approval send mail request failed')
                            }
                        }).catch((err) => {
                        console.error(err)
                    })
                }, 3000)
            )
        }

        toast.promise(sendEmailInternshipPromise(), {
            pending: 'Staj Onay Maili Gönderiliyor...',
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
            title={'Şirket Onay Maili Gönderme'}
            open={openSendEmailModal}
            width={450}
            onCancel={() => setOpenSendEmailModal(false)}
            style={{
                fontFamily: 'open sans'
            }}
            footer={[
                <Space
                    key={uuidv4()}
                >
                    <Button
                        type="primary"
                        onClick={() => setOpenSendEmailModal(false)}
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
                        onClick={() => handleSendEmail()}
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
                `${convertToTR(internshipValues.internship)} stajı için şirkete onay maili göndermek istediğinize emin misiniz ?`
            }
        </Modal>
    )
}

export default InternshipSendEmail
