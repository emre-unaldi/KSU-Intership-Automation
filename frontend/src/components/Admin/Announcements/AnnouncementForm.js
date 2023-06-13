import React, { useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const AnnouncementForm = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [formFieldError, setFormFieldError] = useState(true)
    const [form] = Form.useForm()
    const { Option } = Select

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

    const onFinish = (values) => {
        setFormFieldError(true)
        console.log('Finish Values: ', values)
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
                        value="date"
                        style={{
                            fontFamily: 'open sans'
                        }}
                    >
                        Tarih
                    </Option>
                    <Option
                        value="lesson"
                        style={{
                            fontFamily: 'open sans'
                        }}
                    >
                        Ders
                    </Option>
                    <Option
                        value="other"
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
    )
}

export default AnnouncementForm