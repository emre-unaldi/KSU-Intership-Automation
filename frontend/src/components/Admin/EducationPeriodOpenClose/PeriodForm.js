import React, { useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import {
    DatePicker,
    Form,
    Button,
    ConfigProvider,
    Select
} from 'antd'
import trTR from 'antd/es/locale/tr_TR'

const PeriodForm = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [formFieldError, setFormFieldError] = useState(true)
    const { RangePicker } = DatePicker
    const { Option } = Select
    const [form] = Form.useForm()

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            }
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            }
        }
    }

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
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
                maxWidth: 650,
                width: '100%',
                margin: '0 auto'
            }}
        >

        <ConfigProvider locale={trTR}>
            <Form.Item
                name="educationPeriodDateRange"
                label={
                    <span
                        style={{
                            fontSize: 16,
                        }}
                    >
                        Dönem Tarihi Aralığı :
                    </span>
                }
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Dönem tarih aralığını giriniz !'
                    }
                ]}
            >
                <RangePicker
                    format={'DD/MM/YYYY'}
                    style={{
                        width: '100%'
                    }}
                />
            </Form.Item>
        </ConfigProvider>

        <Form.Item 
            name="educationPeriodType"
            hasFeedback
            label={
                <span
                    style={{
                        fontSize: 16,
                    }}
                >
                    Dönem Türü :
                </span>
            }
            rules={[
                {
                    required: true,
                    message: 'Dönem türünü seçiniz !'
                }
            ]}
        >
            <Select
                placeholder={
                    <span
                        style={{
                            fontFamily: 'open sans'
                        }}
                    >
                        Güz veya Bahar dönemini seçiniz
                    </span>
                }
            >
                <Option
                    value="spring"
                    style={{
                        fontFamily: 'open sans'
                    }}
                >
                    Güz
                </Option>
                <Option
                    value="autumn"
                    style={{
                        fontFamily: 'open sans'
                    }}
                >
                    Bahar
                </Option>
            </Select>
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
            Dönem Aç
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

export default PeriodForm
