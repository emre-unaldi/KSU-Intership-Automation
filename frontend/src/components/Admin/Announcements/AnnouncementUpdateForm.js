import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Modal, Input, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updateAnnouncement } from '../../../redux/announcementSlice'

const AnnouncementUpdate = ({ openUpdateModal, setOpenUpdateModal, selectedAnnouncement }) => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [formFieldError, setFormFieldError] = useState(true)
    const [initialAnnouncementValues, setInitialAnnouncementValues] = useState({})
    const [form] = Form.useForm()
    const { Option } = Select
    const dispatch = useDispatch()

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

    useEffect(() => {
        form.resetFields()
        if (selectedAnnouncement) {
            setInitialAnnouncementValues({
                title: selectedAnnouncement?.title,
                type: selectedAnnouncement?.type,
                content: selectedAnnouncement?.content
            })
            form.setFieldsValue({
                title: selectedAnnouncement?.title,
                type: selectedAnnouncement?.type,
                content: selectedAnnouncement?.content
            })
            form.validateFields()
        }
    }, [selectedAnnouncement, form])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenUpdateModal(false)
        }, 3000)
    }

    const onFinish = async (values) => {
        const formValues = await {
            ...values,
            _id: selectedAnnouncement.key
        }

        setFormFieldError(true)
        form.setFieldsValue({
            title: values.title,
            type: values.type,
            content: values.content
        })

        const updateAnnouncementPromise = () => {
            return new Promise((resolve, reject) => 
                setTimeout(() => {
                    dispatch(updateAnnouncement(formValues))
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
                                reject('Duyuru güncellenirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Announcement update request failed')
                            }
                        }).catch((err) => {
                            console.error(err)
                        })
                }, 3000)
            )
        }

        toast.promise(updateAnnouncementPromise(), {
            pending: 'Duyuru Güncelleniyor...',
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

    const onFinishFailed = (values) => {
        setFormFieldError(false)
        console.log('onFinishFailed Values: ', values)
    }

    return (
        <Modal
            title='Duyuru Güncelleme'
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
                name="company"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                colon={false}
                size="middle"
                labelAlign="left"
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
                initialValues={initialAnnouncementValues}
            >

                <Form.Item
                    name="title"
                    label='Duyuru Başlık : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Duyuru başlığını giriniz !'
                        },
                        {
                            type: 'string',
                            whitespace: true,
                            message: 'Duyuru başlığı sadece boşluk karakteri içermemelidir !'
                        }
                    ]}
                >
                    <Input 
                        placeholder='Başlık girin' 
                    />
                </Form.Item>

                <Form.Item 
                    name="type"
                    hasFeedback
                    label='Duyuru Türü : '
                    rules={[
                        {
                            required: true,
                            message: 'Duyuru türünü seçiniz !'
                        }
                    ]}
                >
                    <Select
                        placeholder='Duyuru türünü seçin'
                    >
                        <Option
                            value="Tarih"
                            style={{
                                fontFamily: 'open sans'
                            }}
                        >
                            Tarih
                        </Option>
                        <Option
                            value="Ders"
                            style={{
                                fontFamily: 'open sans'
                            }}
                        >
                            Ders
                        </Option>
                        <Option
                            value="Diğer"
                            style={{
                                fontFamily: 'open sans'
                            }}
                        >
                            Diğer
                        </Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="content"
                    label='Duyuru İçerik : '
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Duyuru içeriğini giriniz !'
                        },
                        {
                            type: 'string',
                            whitespace: true,
                            message: 'Duyuru içeriği sadece boşluk karakteri içermemelidir !'
                        },
                        {
                            min: 20,
                            message: 'Duyuru içeriği en az 20 karakter girilmelidir !'
                        }
                    ]}
                    >
                    <Input.TextArea 
                        showCount 
                        maxLength={250} 
                        placeholder='Duyuru içeriğini girin'
                    />
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
                        Duyuru Güncelle
                        {
                            buttonLoading && formFieldError ? 
                                <LoadingOutlined /> 
                                    : 
                                null
                        }
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AnnouncementUpdate
