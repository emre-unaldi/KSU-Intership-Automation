import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  createInternship,
  getAllInternships,
  sendInternshipConfirmationMail
} from '../../../redux/internshipSlice'
import { ToastContainer, toast } from 'react-toastify'
import {
  Button,
  Form,
  Input,
  DatePicker,
  Typography,
  ConfigProvider,
  Row,
  Col,
  Space
} from 'antd'
import {
  FieldNumberOutlined,
  HomeOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import trTR from 'antd/es/locale/tr_TR'

const CompanyInformationForm = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const [formFieldError, setFormFieldError] = useState(true)
  const [currentUserInternships, setCurrentUserInternships] = useState([])
  const { RangePicker } = DatePicker
  const { Title } = Typography
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state.user.check.data?.user?._id)
  const internship = localStorage.getItem('internship')
  const instructions = localStorage.getItem('instructions')
  let toastId = useRef(null)

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    },
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

  const toastConfig = (message, type) => {
    return {
      render: message,
      type: type,
      isLoading: false,
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    }
  }

  useEffect(() => {
    dispatch(getAllInternships())
      .then(async (getAll) => {
        if (getAll?.meta?.requestStatus === 'fulfilled') {
          if (getAll?.payload?.status === 'success') {
            const data = await getAll.payload.data
            const userInternships = await data.filter(
              (item) => item?.studentID === currentUserId
            )
            setCurrentUserInternships(userInternships)
          } else {
            throw new Error(getAll.payload.message)
          }
        } else {
          throw new Error('User internship fetch request failed')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [dispatch, currentUserId])

  const onFinish = async (values) => {
    setFormFieldError(true)
    let isDateRange = []
    const internshipValues = {
      ...values,
      studentID: currentUserId,
      internship,
      instructions
    }

    currentUserInternships.forEach((item) => {
      const internshipStartDate = new Date(item.internshipDateRange[0])
      const internshipEndDate = new Date(item.internshipDateRange[1])
      const startDate = new Date(values.internshipDateRange[0])
      const endDate = new Date(values.internshipDateRange[1])

      const startDateCondition = internshipStartDate >= startDate && internshipStartDate <= endDate
      const endDateCondition = internshipEndDate >= startDate && internshipEndDate <= endDate
      const isDateRangeCondition = startDateCondition || endDateCondition

      isDateRange = [...isDateRange, isDateRangeCondition]
    })

    if (!isDateRange.includes(true)) {
      form.resetFields()
      const createInternshipPromise = () =>
        new Promise((resolve, reject) =>
          setTimeout(() => {

            dispatch(createInternship(internshipValues))
              .then((create) => {
                if (create?.meta?.requestStatus === 'fulfilled') {
                  if (create?.payload?.status === 'success') {
                    toastId = toast.loading('Başvuru Maili Gönderiliyor...')
                    
                    dispatch(sendInternshipConfirmationMail(internshipValues))
                      .then((sendMail) => {
                        if (sendMail?.meta?.requestStatus === 'fulfilled') {
                          if (sendMail?.payload?.status === 'success') {
                            setTimeout(() => {
                              navigate(
                                '/student/internshipForm/companyApprovalWait'
                              )
                            }, 3000)
                            toast.update(
                              toastId,
                              toastConfig(sendMail.payload.message, 'success')
                            )
                          } else {
                            toast.update(
                              toastId,
                              toastConfig(sendMail.payload.message, 'error')
                            )
                          }
                        } else {
                          setTimeout(() => {
                            toast.update(
                              toastId,
                              toastConfig(
                                'Başvuru Maili gönderilemedi. Tekrar göndermeyi deneyin !',
                                'error'
                              )
                            )
                            throw new Error('Send mail request failed')
                          }, 3000)
                        }
                      })
                      .catch((err) => {
                        console.error(err)
                      })
                    resolve(create.payload.message)
                  } else {
                    reject(create.payload.message)
                  }
                } else {
                  reject('Staj başvurusu oluşturulamadı')
                  throw new Error('Internship creation request failed')
                }
              })
              .catch((err) => {
                console.error(err)
              })
          }, 3000)
        )

      toast.promise(createInternshipPromise, {
        pending: 'Staj Başvurusu Yapılıyor...',
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
    } else {
      toast.error('Girilen tarih aralığında devam eden stajınız bulunmaktadır')
    }
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
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <Space
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: 10,
          fontFamily: 'open sans',
        }}
      >
        <Title
          className="card-title"
          style={{
            color: '#193164',
            fontFamily: 'open sans',
            padding: 10
          }}
          level={3}
        >
          Staj Yapılacak Şirket Bilgileri
        </Title>
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
            boxShadow: '1px 2px 20px #d4d4d4',
            borderRadius: 10,
            padding: '25px 25px 1px 25px'
          }}
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
                type: 'string',
                whitespace: true,
                message: 'İş yeri adı sadece boşluk karakteri içermemelidir !'
              },
              {
                max: 20,
                message: 'İş yeri adı sadece 20 karakter içerebilir !'
              }
            ]}
          >
            <Input prefix={<HomeOutlined style={{ color: 'gray' }} />} />
          </Form.Item>

          <Form.Item
            name="companyEmail"
            label="E-posta"
            validateTrigger="onChange"
            hasFeedback
            rules={[
              {
                type: 'email',
                message: 'E-Posta girişi geçerli değil !'
              },
              {
                required: true,
                message: 'E-posta adresini giriniz !'
              }
            ]}
          >
            <Input prefix={<MailOutlined style={{ color: 'gray' }} />} />
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
                pattern: /^\+?\d{1,3}[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: 'Telefon numarası formatı doğru değil !'
              }
            ]}
          >
            <Input prefix={<PhoneOutlined style={{ color: 'gray' }} />} />
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
                      type: 'string',
                      whitespace: true,
                      message: 'Yetkili adı sadece boşluk karakteri içermemelidir !'
                    },
                    {
                      max: 20,
                      message: 'Yetkili adı sadece 20 karakter içerebilir !'
                    }
                  ]}
                >
                  <Input prefix={<UserOutlined style={{ color: 'gray' }} />} />
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
                      type: 'string',
                      whitespace: true,
                      message: 'Yetkili adı soyadını boşluk karakteri içermemelidir !'
                    },
                    {
                      max: 20,
                      message: 'Yetkili soyadını sadece 20 karakter içerebilir !'
                    }
                  ]}
                >
                  <Input prefix={<UserOutlined style={{ color: 'gray' }} />} />
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
                pattern: /^[0-9]+$/,
                message: 'Çalışan sayısı sadece sayı içerebilir !'
              },
              {
                max: 5,
                message: 'Çalışan sayısı en fazla 5 haneli olabilir !'
              }
            ]}
          >
            <Input prefix={<TeamOutlined style={{ color: 'gray' }} />} />
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
                pattern: /^[0-9]+$/,
                message: 'Vergi numarası sadece sayı içerebilir !'
              },
              {
                max: 10,
                message: 'Vergi numarası en fazla 10 haneli olabilir !'
              }
            ]}
          >
            <Input prefix={<FieldNumberOutlined style={{ color: 'gray' }} />} />
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
                type: 'string',
                whitespace: true,
                message: 'İş yeri adresi sadece boşluk karakteri içermemelidir !'
              },
              {
                min: 10,
                message: 'İş yeri adresi en az 10 karakter girilmelidir !'
              }
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <ConfigProvider locale={trTR}>
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
                format={'DD/MM/YYYY'}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </ConfigProvider>

          <Form.Item {...tailFormItemLayout}>
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
                fontFamily: 'open sans',
              }}
            >
              Başvuru Yap
              {
                buttonLoading && formFieldError ? 
                  <LoadingOutlined/>
                  : 
                  null
              }
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  )
}
export default CompanyInformationForm
