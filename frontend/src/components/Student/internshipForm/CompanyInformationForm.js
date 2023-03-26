import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createInternship } from "../../../redux/internshipConfigurationSlice";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Typography,
  ConfigProvider,
  Row,
  Col
} from "antd";
import {
  FieldNumberOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  SyncOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import trTR from "antd/es/locale/tr_TR";
import "./internshForm.css";

const CompanyInformationForm = () => {
  const [loadings, setLoadings] = useState(false);
  const [formFieldError, setFormFieldError] = useState(false);
  const { RangePicker } = DatePicker;
  const { Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.check.data.user);
  const instructionsAndInternship = location.state.instructionsAndInternship;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16
      }
    }
  };
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
  };

  const onFinish = (values) => {
    const internshipValues = {
      ...instructionsAndInternship,
      ...values,
      studentID: currentUser?._id
    };
    setFormFieldError(false);
    form.resetFields();
    setTimeout(() => {
      dispatch(createInternship(internshipValues))
        .then((create) => {
          if (create?.meta?.requestStatus === "fulfilled") {
            if (create?.payload?.status === "success") {
              console.log(create.payload.message);
              navigate("/student/internshipForm/companyApprovalWait");
            } else {
              console.log(create.payload.message);
            }
          } else {
            console.log("Internship create failed. Try created in again");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  };

  const onFinishFailed = (values) => {
    setFormFieldError(true);
    console.log("onFinishFailed Values: ", values);
  };

  const handleLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
    }, 3000);
  };

  return (
    <>
      <Title className="card-title" style={{ color: "#193164" }} level={4}>
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
        style={{
          maxWidth: 650,
          width: "100%",
          boxShadow: "1px 2px 20px #d4d4d4",
          borderRadius: 10,
          padding: "25px 25px 0 25px",
          marginBottom: 35
        }}
        scrollToFirstError
      >
        <Form.Item
          name="companyName"
          label="İş Yeri Adı"
          hasFeedback
          rules={[
            {
              required: true,
              message: "İş yeri adını giriniz !",
            },
            {
              type: "string",
              whitespace: true,
              message: "İş yeri adı sadece boşluk karakteri içermemelidir !",
            },
            {
              max: 20,
              message: "İş yeri adı sadece 20 karakter içerebilir !"
            }
          ]}
        >
          <Input prefix={<HomeOutlined style={{ color: "gray" }} />} />
        </Form.Item>

        <Form.Item
          name="companyEmail"
          label="E-posta"
          validateTrigger="onChange"
          hasFeedback
          rules={[
            {
              type: "email",
              message: "E-Posta girişi geçerli değil !",
            },
            {
              required: true,
              message: "E-posta adresini giriniz !"
            }
          ]}
        >
          <Input prefix={<MailOutlined style={{ color: "gray" }} />} />
        </Form.Item>

        <Form.Item
          name="companyPhone"
          label="Telefon Numarası"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Telefon numarası giriniz !",
            },
            {
              pattern: /^\+?\d{1,3}[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
              message: "Telefon numarası formatı doğru değil !"
            }
          ]}
        >
          <Input prefix={<PhoneOutlined style={{ color: "gray" }} />} />
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
                    message: "Yetkili adını giriniz !",
                  },
                  {
                    type: "string",
                    whitespace: true,
                    message:
                      "Yetkili adı sadece boşluk karakteri içermemelidir !",
                  },
                  {
                    max: 20,
                    message: "Yetkili adı sadece 20 karakter içerebilir !"
                  }
                ]}
              >
                <Input prefix={<UserOutlined style={{ color: "gray" }} />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="companyResponsibleSurname"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Yetkili soyadını giriniz !",
                  },
                  {
                    type: "string",
                    whitespace: true,
                    message:
                      "Yetkili adı soyadını boşluk karakteri içermemelidir !",
                  },
                  {
                    max: 20,
                    message: "Yetkili soyadını sadece 20 karakter içerebilir !"
                  }
                ]}
              >
                <Input prefix={<UserOutlined style={{ color: "gray" }} />} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="companyPersonalNumber"
          label="Çalışan Sayısı"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Çalışan kişi sayısını giriniz !",
            },
            {
              pattern: /^[0-9]+$/,
              message: "Çalışan sayısı sadece sayı içerebilir !",
            },
            {
              max: 5,
              message: "Çalışan sayısı en fazla 5 haneli olabilir !"
            }
          ]}
        >
          <Input prefix={<TeamOutlined style={{ color: "gray" }} />} />
        </Form.Item>

        <Form.Item
          name="companyTaxNumber"
          label="Vergi Numarası"
          hasFeedback
          rules={[
            {
              required: true,
              message: "İş Yeri vergi numarasını giriniz !",
            },
            {
              pattern: /^[0-9]+$/,
              message: "Vergi numarası sadece sayı içerebilir !",
            },
            {
              max: 10,
              message: "Vergi numarası en fazla 10 haneli olabilir !"
            }
          ]}
        >
          <Input prefix={<FieldNumberOutlined style={{ color: "gray" }} />} />
        </Form.Item>

        <Form.Item
          name="companyAddress"
          label="Adres"
          hasFeedback
          rules={[
            {
              required: true,
              message: "İş yeri adresini giriniz !",
            },
            {
              type: "string",
              whitespace: true,
              message: "İş yeri adresi sadece boşluk karakteri içermemelidir !",
            },
            {
              min: 10,
              message: "İş yeri adresi en az 10 karakter girilmelidir !"
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
                message: "Staj yapılacak tarih aralığını giriniz !"
              }
            ]}
          >
            <RangePicker
              format={"DD/MM/YYYY"}
              style={{
                width: "100%"
              }}
            />
          </Form.Item>
        </ConfigProvider>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={() => {
              handleLoading();
            }}
            style={{
              width: "100%",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {loadings && formFieldError === false ? (
              <SyncOutlined spin={loadings} />
            ) : (
              "Devam Et"
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CompanyInformationForm;