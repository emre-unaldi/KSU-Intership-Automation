import { useState } from "react";
import { Space, Button, Alert, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import PdfViewer from "../../System/PdfViewer";

function Instructions() {
  const [approval, setApproval] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const navigate = useNavigate();
  const { Title } = Typography;

  const handleLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
      navigate("/student/internshipForm/companyInformation");
    }, 3000);
  };

  return (
    <>
      <Title className="card-title" style={{ color: "#193164" }} level={4}>
        Staj Uygulama İlkeleri Onayı
      </Title>
      <PdfViewer />
      <Space
        direction="vertical"
        style={{
          width: "100%",
          paddingBottom: 10,
        }}
      >
        <Alert
          message={
            approval
              ? "Başvuruya devam edebilirsiniz"
              : "Başvuruya devam etmek için staj uygulama ilkelerini okumalı ve onay vermeniz gerekmektedir"
          }
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          type={approval ? "success" : "info"}
          showIcon
          action={
            <Space>
              {approval ? (
                <Button
                  type="default"
                  style={{
                    color: "white",
                    backgroundColor: "#4fc818",
                    border: "none",
                  }}
                  size="middle"
                  onClick={() => {
                    setApproval(false);
                  }}
                >
                  İptal Et
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => {
                    setApproval(true);
                  }}
                >
                  Onayla
                </Button>
              )}
            </Space>
          }
        />
      </Space>
      <Space direction="vertical">
        <Button
          type="primary"
          size="large"
          onClick={() => {
            handleLoading();
          }}
          style={{
            width: "20vw",
            paddingBottom: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={approval ? false : true}
          block
        >
          {loadings ? <SyncOutlined spin={loadings} /> : "Devam Et"}
        </Button>
      </Space>
    </>
  );
}

export default Instructions;
