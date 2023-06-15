import React, { useState } from 'react'
import { Button, Card, Form, Input, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createAnnouncement } from '../../../redux/announcementSlice'


const AnnouncementAddForm = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [formFieldError, setFormFieldError] = useState(true)
    const [form] = Form.useForm()
    const { Option } = Select
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state.user.check?.data?.user?._id)

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

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
        }, 3000)
    }

    const onFinish = async (values) => {
        const formValues = await {
            ...values,
            userId: currentUserId
        }


        setFormFieldError(true)
        form.resetFields()

        const createAnnouncementPromise = () => {
            return new Promise((resolve, reject) => 
                setTimeout(() => {
                    dispatch(createAnnouncement(formValues))
                        .then((create) => {
                            if (create?.meta?.requestStatus === 'fulfilled') {
                                if (create?.payload?.status === 'success') {
                                    refreshPage()
                                    resolve(create.payload.message)                                    
                                } else {
                                    refreshPage()
                                    reject(create.payload.message)
                                }
                            } else {
                                refreshPage()
                                reject('Duyuru oluşturulurken hata çıktı. Tekrar deneyin !')
                                throw new Error('Announcement create request failed')
                            }
                        }).catch((err) => {
                            console.error(err)
                        })
                }, 3000)
            )
        }

        toast.promise(createAnnouncementPromise(), {
            pending: 'Duyuru Oluşturuluyor...',
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

    const handleLoading = () => {
        setButtonLoading(true)
        setTimeout(() => {
            setButtonLoading(false)
        }, 3000)
    }

    return (
        <Card
            style={{
                maxWidth: 800,
                width: '100%',
                margin: '0 auto 20px auto',
                backgroundColor: '#F6F9FF',
                border: '1px solid #d9d9d9'
            }}
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
                    margin: '0 auto'
                }}
            >

                <Form.Item
                    name="title"
                    label={
                        <span
                            style={{
                                fontSize: 16
                            }}
                        >
                            Duyuru Başlık :
                        </span>
                    }
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
                    label={
                        <span
                            style={{
                                fontSize: 16
                            }}
                        >
                            Duyuru Türü :
                        </span>
                    }
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
                    label={
                        <span
                            style={{
                                fontSize: 16
                            }}
                        >
                            Duyuru İçerik :
                        </span>
                    }
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
                        handleLoading()
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
                    Duyuru Oluştur
                    {
                        buttonLoading && formFieldError ? 
                            <LoadingOutlined /> 
                                : 
                            null
                    }
                </Button>
            </Form.Item>
            </Form>
        </Card>
    )
}

export default AnnouncementAddForm