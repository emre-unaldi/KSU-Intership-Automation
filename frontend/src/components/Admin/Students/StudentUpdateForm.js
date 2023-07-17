import React, {useEffect, useMemo, useRef, useState} from 'react'
import {LoadingOutlined} from '@ant-design/icons'
import {Button, Form, Modal, Input} from 'antd'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {updateUser} from "../../../redux/userSlice";

const StudentUpdateForm = ({openUpdateModal, setOpenUpdateModal, selectedUpdateStudent}) => {
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

    const initialStudentValues = useMemo(() => {
        return {
            name: selectedUpdateStudent?.name,
            surname: selectedUpdateStudent?.surname,
            schoolNumber: selectedUpdateStudent?.schoolNumber,
            email: selectedUpdateStudent?.email
        }
    }, [selectedUpdateStudent])

    useEffect(() => {
        if (formRef.current) {
            form.resetFields()
            form.setFieldsValue(initialStudentValues)
            form.validateFields()
        }
    }, [initialStudentValues, form])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenUpdateModal(false)
        }, 3000)
    }

    const onFinish = async ({
                                name,
                                surname,
                                schoolNumber,
                                email
                            }) => {
        const formValues = {
            name,
            surname,
            schoolNumber,
            email,
            _id: selectedUpdateStudent.key
        }
        setFormFieldError(true)

        const updateStudentPromise = () => {
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
                                reject('Öğrenci kaydı güncellenirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Student update request failed')
                            }
                        }).catch((err) => {
                        console.error(err)
                    })
                }, 3000)
            )
        }

        toast.promise(updateStudentPromise(), {
            pending: 'Öğrenci Kaydı Güncelleniyor...',
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
            title='Öğrenci Kaydı Güncelleme'
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
                name="studentUpdate"
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
                initialValues={initialStudentValues}
            >
                <Form.Item
                    name="name"
                    label='Ad : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Öğrenci adını giriniz !'
                        },
                        {
                            pattern: /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/,
                            message: 'Geçerli bir öğrenci adı giriniz !'
                        }
                    ]}
                >
                    <Input placeholder='Öğrenci adını girin'/>
                </Form.Item>

                <Form.Item
                    name="surname"
                    label='Soyad : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Öğrenci soyadını giriniz !'
                        },
                        {
                            pattern: /^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$/,
                            message: 'Geçerli bir öğrenci soyadı giriniz !'
                        }
                    ]}
                >
                    <Input placeholder='Öğrenci soyadını girin'/>
                </Form.Item>

                <Form.Item
                    name="email"
                    label='E-Posta : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Öğrenci e-postasını giriniz !'
                        },
                        {
                            pattern: /^\S+@\S+$/,
                            message: 'Geçerli bir öğrenci e-posta adresi giriniz!'
                        }
                    ]}
                >
                    <Input placeholder="Öğrenci E-posta adresini girin"/>
                </Form.Item>

                <Form.Item
                    name="schoolNumber"
                    label='Öğrenci Numarası : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Öğrenci numarasını giriniz !'
                        },
                        {
                            pattern: /^\d{11}$/,
                            message: 'Geçerli bir öğrenci numarası giriniz!'
                        }
                    ]}
                >
                    <Input placeholder="Öğrenci numarası girin"/>
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
                        Öğrenci Güncelle
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

export default StudentUpdateForm
