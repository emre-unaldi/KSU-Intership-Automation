import React, {useEffect, useMemo, useRef, useState} from 'react'
import {LoadingOutlined} from '@ant-design/icons'
import {Button, Form, Modal, Input} from 'antd'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {updateUser} from "../../../redux/userSlice";

const TeacherUpdateForm = ({openUpdateModal, setOpenUpdateModal, selectedUpdateTeacher}) => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [formFieldError, setFormFieldError] = useState(true)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const formRef = useRef()

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8
            }
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16
            }
        }
    }

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 8
            }
        }
    }

    const initialTeacherValues = useMemo(() => {
        return {
            name: selectedUpdateTeacher?.name,
            surname: selectedUpdateTeacher?.surname,
            phoneNumber: selectedUpdateTeacher?.phoneNumber,
            email: selectedUpdateTeacher?.email
        }
    }, [selectedUpdateTeacher])

    useEffect(() => {
        if (formRef.current) {
            form.resetFields()
            form.setFieldsValue(initialTeacherValues)
            form.validateFields()
        }
    }, [initialTeacherValues, form])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenUpdateModal(false)
        }, 3000)
    }

    const onFinish = async ({
                                name,
                                surname,
                                phoneNumber,
                                email
                            }) => {
        const formValues = {
            name,
            surname,
            phoneNumber,
            email,
            _id: selectedUpdateTeacher.key
        }
        setFormFieldError(true)

        const updateTeacherPromise = () => {
            return new Promise((resolve, reject) =>
                setTimeout(() => {
                    dispatch(updateUser(formValues))
                        .then((update) => {
                            if (update?.meta?.requestStatus === 'fulfilled') {
                                if (update?.payload?.status === 'success') {
                                    refreshPage()
                                    resolve(update.payload.message)
                                    setButtonLoading(false)
                                } else {
                                    refreshPage()
                                    reject(update.payload.message)
                                    setButtonLoading(false)
                                }
                            } else {
                                refreshPage()
                                reject('Öğretmen kaydı güncellenirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Teacher update request failed')
                            }
                        }).catch((err) => {
                        console.error(err)
                    })
                }, 3000)
            )
        }

        toast.promise(updateTeacherPromise(), {
            pending: 'Öğretmen Kaydı Güncelleniyor...',
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

    const onFinishFailed = (values) => {
        setFormFieldError(false)
        console.log('onFinishFailed Values: ', values)
    }

    return (
        <Modal
            title='Öğretmen Kaydı Güncelleme'
            centered
            open={openUpdateModal}
            width={700}
            onCancel={() => {
                setOpenUpdateModal(false)
                form.resetFields()
            }}
            footer={false}
        >
            <Form
                {...formItemLayout}
                form={form}
                name="teacherUpdate"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                colon={false}
                size="middle"
                labelAlign="left"
                ref={formRef}
                scrollToFirstError
                style={{
                    maxWidth: 800,
                    width: '100%',
                    margin: '20px auto auto auto',
                    padding: '15px 15px 0 15px',
                    backgroundColor: '#F6F9FF',
                    border: '1px solid #d9d9d9',
                    borderRadius: 10
                }}
                initialValues={initialTeacherValues}
            >
                <Form.Item
                    name="name"
                    label='Ad : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Öğretmen adını giriniz !'
                        },
                        {
                            pattern: /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/,
                            message: 'Geçerli bir öğretmen adı giriniz !'
                        }
                    ]}
                >
                    <Input placeholder='Öğretmen adını girin'/>
                </Form.Item>
                <Form.Item
                    name="surname"
                    label='Soyad : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Öğretmen soyadını giriniz !'
                        },
                        {
                            pattern: /^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$/,
                            message: 'Geçerli bir öğretmen soyadı giriniz !'
                        }
                    ]}
                >
                    <Input placeholder='Öğretmen soyadını girin'/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label='E-Posta : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Öğretmen e-postasını giriniz !'
                        },
                        {
                            pattern: /^\S+@\S+$/,
                            message: 'Geçerli bir öğretmen e-posta adresi giriniz!'
                        }
                    ]}
                >
                    <Input placeholder="Öğretmen E-posta adresini girin"/>
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label='Öğretmen Numarası : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Öğretmen numarasını giriniz!'
                        },
                        {
                            pattern: /^05\d{9}$/,
                            message: 'Geçerli bir öğretmen numarası giriniz!'
                        }
                    ]}
                >
                    <Input placeholder="Öğretmen telefon numarası girin"/>
                </Form.Item>
                <Form.Item
                    {...tailFormItemLayout}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="middle"
                        onClick={() => {
                            setButtonLoading(true)
                        }}
                        style={{
                            width: '100%',
                            fontSize: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'open sans'
                        }}
                    >
                        Öğretmen Güncelle
                        {
                            buttonLoading && formFieldError ?
                                <LoadingOutlined/>
                                :
                                null
                        }
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TeacherUpdateForm
