import React, { useState } from "react";
import { SmileOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Result, Typography, Spin, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "./internshForm.css";

function ConsultantApprovalWait() {
  const [loadings, setLoadings] = useState(false);
  const [approval, setApproval] = useState(true);
  const [active, setActive] = useState(true);
  const { Title, Text } = Typography;
  const navigate = useNavigate();

  const btnTextStyle = {
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }

  const handleLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
      approval
        ? alert("başarılı")
        : alert("başarısız")
    }, 3000)
  }

  return (
    <>
      <Title
        className="card-title"
        style={{ color: "#193164", textAlign: "center" }}
        level={4}
      >
        Danışman Öğretmen Staj Başvurusu Onay Durumu
      </Title>
      {active ? (
        <Result
          style={{
            maxWidth: 650,
            width: "100%",
            boxShadow: "1px 2px 20px #d4d4d4",
            borderRadius: 10,
            marginBottom: 35,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          status={approval ? "success" : "error"}
          title={
            approval
              ? "Danışman Öğretmen tarafından staj başvurun onaylandı"
              : "Danışman Öğretmen tarafından staj başvurun reddedildi"
          }
          subTitle={
            approval
              ? "Devam et butonuna basıldığında staj başvurusu başarıyla tamamlanacaktır"
              : "Danışman Öğretmen ile iletişime geçilmeli ve gerekli görülürse staj yeri değiştirilmelidir"
          }
          extra={[
            approval ? (
              <Button
                type="primary"
                size="large"
                key="btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onClick={() => {
                  handleLoading();
                }}
              >
                {loadings ? (
                  <Text style={btnTextStyle}>
                    Kaydediliyor &nbsp; <SyncOutlined spin={loadings} />
                  </Text>
                ) : (
                  <Text style={btnTextStyle}>Devam Et</Text>
                )}
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                key="btn"
                onClick={() => {
                  handleLoading();
                }}
              >
                {loadings ? (
                  <Text style={btnTextStyle}>
                    Yönlendiriliyor &nbsp; <SyncOutlined spin={loadings} />
                  </Text>
                ) : (
                  <Text style={btnTextStyle}>Anasayfa</Text>
                )}
              </Button>
            )
          ]}
        />
      ) : (
        <Space
          direction="vertical"
          align="center"
          size="large"
          style={{
            maxWidth: 650,
            width: "100%",
            boxShadow: "1px 2px 20px #d4d4d4",
            borderRadius: 10,
            marginBottom: 35
          }}
        >
          <Result
            icon={<SmileOutlined />}
            title="Staj Başvuru Formu Gönderildi"
            subTitle="Staj başvurusunu onaylayacak danışman öğretmene başvuru formu iletildi"
            extra={
              <Spin
                size="large"
                style={{ fontSize: "40" }}
                tip="Onay Bekleniyor"
              />
            }
          />
        </Space>
      )}
    </>
  )
}

export default ConsultantApprovalWait;