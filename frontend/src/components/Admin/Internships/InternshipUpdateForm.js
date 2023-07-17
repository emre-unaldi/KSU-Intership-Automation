import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
    FieldNumberOutlined,
    HomeOutlined,
    LoadingOutlined,
    MailOutlined,
    PhoneOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons'
import {Button, Form, Modal, Input, Row, Col, ConfigProvider, DatePicker} from 'antd'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {updateInternship} from "../../../redux/internshipSlice"
import trTR from "antd/es/locale/tr_TR";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const InternshipUpdateForm = ({openUpdateModal, setOpenUpdateModal, selectedUpdateInternship}) => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [formFieldError, setFormFieldError] = useState(true)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const {RangePicker} = DatePicker
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

    const initialInternshipValues = useMemo(() => {
        return {
            companyName: selectedUpdateInternship?.companyName,
            companyEmail: selectedUpdateInternship?.companyEmail,
            companyPhone: selectedUpdateInternship?.companyPhone,
            companyResponsibleName: selectedUpdateInternship?.companyResponsibleName,
            companyResponsibleSurname: selectedUpdateInternship?.companyResponsibleSurname,
            companyPersonalCount: selectedUpdateInternship?.companyPersonalCount,
            companyTaxNumber: selectedUpdateInternship?.companyTaxNumber,
            companyAddress: selectedUpdateInternship?.companyAddress,
            internship: selectedUpdateInternship?.internship,
            internshipDateRange: [
                dayjs(selectedUpdateInternship?.dateRange[0], 'DD/MM/YYYY'),
                dayjs(selectedUpdateInternship?.dateRange[1], 'DD/MM/YYYY')
            ]
        }
    }, [selectedUpdateInternship])

    useEffect(() => {
        if (formRef.current) {
            form.resetFields()
            form.setFieldsValue(initialInternshipValues)
            form.validateFields()
        }
    }, [initialInternshipValues, form])

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload()
            setOpenUpdateModal(false)
        }, 3000)
    }

    const onFinish = async ({
                                companyAddress,
                                companyEmail,
                                companyName,
                                companyPersonalCount,
                                companyPhone,
                                companyResponsibleName,
                                companyResponsibleSurname,
                                companyTaxNumber,
                                internshipDateRange
                            }) => {
        const formValues = {
            companyAddress,
            companyEmail,
            companyName,
            companyPersonalCount,
            companyPhone,
            companyResponsibleName,
            companyResponsibleSurname,
            companyTaxNumber,
            internshipDateRange: [
                dayjs(internshipDateRange[0]).add(3, 'hour').toDate(),
                dayjs(internshipDateRange[1]).add(3, 'hour').toDate()
            ],
            _id: selectedUpdateInternship.key,
        }
        setFormFieldError(true)

        const updateInternshipPromise = () => {
            return new Promise((resolve, reject) =>
                setTimeout(() => {
                    dispatch(updateInternship(formValues))
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
                                reject('Staj güncellenirken hata çıktı. Tekrar deneyin !')
                                setButtonLoading(false)
                                throw new Error('Internship update request failed')
                            }
                        }).catch((err) => {
                        console.error(err)
                    })
                }, 3000)
            )
        }

        toast.promise(updateInternshipPromise(), {
            pending: 'Staj Kaydı Güncelleniyor...',
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
            title='Staj Kaydı Güncelleme'
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
                name="internshipUpdate"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                colon={false}
                ref={formRef}
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
                initialValues={initialInternshipValues}
            >
                <Form.Item
                    name="companyName"
                    label="İş Yeri Adı"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'İş yeri adını giriniz !'
                        },
                        {
                            pattern: /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/,
                            message: 'Geçerli bir iş yeri adı giriniz !'
                        }
                    ]}
                >
                    <Input prefix={<HomeOutlined style={{color: 'gray'}}/>}/>
                </Form.Item>
                <Form.Item
                    name="companyEmail"
                    label="E-posta"
                    validateTrigger="onChange"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'E-posta adresini giriniz !'
                        },
                        {
                            pattern: /^\S+@\S+$/,
                            message: 'Geçerli bir iş yeri e-posta adresi giriniz !'
                        }
                    ]}
                >
                    <Input prefix={<MailOutlined style={{color: 'gray'}}/>}/>
                </Form.Item>
                <Form.Item
                    name="companyPhone"
                    label="Telefon Numarası"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Telefon numarası giriniz !'
                        },
                        {
                            pattern: /^[\d+\s]+$/,
                            message: 'Geçerli bir telefon numarası giriniz !'
                        }
                    ]}
                >
                    <Input prefix={<PhoneOutlined style={{color: 'gray'}}/>}/>
                </Form.Item>
                <Form.Item
                    name="companyResponsible"
                    label="Yetkili Ad Soyad"
                    className="responsible"
                    hasFeedback
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="companyResponsibleName"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Yetkili adını giriniz !'
                                    },
                                    {
                                        pattern: /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/,
                                        message: 'Geçerli bir yetkili adı giriniz !'
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined style={{color: 'gray'}}/>}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="companyResponsibleSurname"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Yetkili soyadını giriniz !'
                                    },
                                    {
                                        pattern: /^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$/,
                                        message: 'Geçerli bir yetkili soyadı giriniz !'
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined style={{color: 'gray'}}/>}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="companyPersonalCount"
                    label="Çalışan Sayısı"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Çalışan kişi sayısını giriniz !'
                        },
                        {
                            pattern: /^[\d+\s]{1,5}$/,
                            message: 'Geçerli bir çalışan kişi sayısı giriniz !'
                        }
                    ]}
                >
                    <Input prefix={<TeamOutlined style={{color: 'gray'}}/>}/>
                </Form.Item>
                <Form.Item
                    name="companyTaxNumber"
                    label="Vergi Numarası"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'İş Yeri vergi numarasını giriniz !'
                        },
                        {
                            pattern: /^[\d+\s]{1,10}$/,
                            message: 'Geçerli bir iş yeri vergi numarası giriniz !'
                        }
                    ]}
                >
                    <Input prefix={<FieldNumberOutlined style={{color: 'gray'}}/>}/>
                </Form.Item>
                <Form.Item
                    name="companyAddress"
                    label="Adres"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'İş yeri adresini giriniz !'
                        },
                        {
                            pattern: /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s\d.:/]+$/,
                            message: 'Geçerli bir iş yeri adresi giriniz !'
                        }
                    ]}
                >
                    <Input.TextArea showCount maxLength={200}/>
                </Form.Item>
                <ConfigProvider locale={trTR} >
                    <Form.Item
                        name="internshipDateRange"
                        label="Staj Tarihi Aralığı"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Staj yapılacak tarih aralığını giriniz !'
                            }
                        ]}
                    >
                        <RangePicker
                            format="DD/MM/YYYY"
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                </ConfigProvider>
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
                        Staj Güncelle
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

export default InternshipUpdateForm
