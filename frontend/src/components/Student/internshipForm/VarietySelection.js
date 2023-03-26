import { useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Avatar, Segmented, Space, Alert, Typography, Button } from "antd";
import software from "../../../assets/img/software.png";
import hardware from "../../../assets/img/hardware.png";
import intorn from "../../../assets/img/intorn.png";

const VarietySelection = () => {
  const [variety, setVariety] = useState({ description: "", value: "" });
  const [loadings, setLoadings] = useState(false);
  const { Title } = Typography;
  const navigate = useNavigate();

  const handleLoading = () => {
    const internship = variety.value
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
      // burada veritabanı işlemi gerçekleştirilecek
      // internshipDocuments modeli oluşturulacak staj çeşidi isVariety olarak tutulacak
      navigate("/student/internshipForm/instructions", {state: {internship}});
    }, 3000);
  };

  const changeValue = (getValue) => {
    getValue === "software" &&
      setVariety({ description: "Yazılım", value: getValue });
    getValue === "hardware" &&
      setVariety({ description: "Donanım", value: getValue });
    getValue === "intorn" &&
      setVariety({ description: "UME", value: getValue });
  };

  const options = [
    {
      label: (
        <div style={{ padding: 4, width: "20vw" }}>
          <Avatar
            src={software}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            shape="square"
          />
          <div style={{ color: "#274374", fontFamily: "monospace" }}>
            <b>Yazılım</b>
          </div>
        </div>
      ),
      value: "software",
    },
    {
      label: (
        <div style={{ padding: 4, width: "20vw" }}>
          <Avatar
            src={hardware}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            shape="square"
          />
          <div style={{ color: "#274374", fontFamily: "monospace" }}>
            <b>Donanım</b>
          </div>
        </div>
      ),
      value: "hardware",
    },
    {
      label: (
        <div style={{ padding: 4, width: "20vw" }}>
          <Avatar
            src={intorn}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            shape="square"
          />
          <div style={{ color: "#274374", fontFamily: "monospace" }}>
            <b>UME</b>
          </div>
        </div>
      ),
      value: "intorn",
    },
  ];
  return (
    <>
      <Title className="card-title" style={{ color: "#193164" }} level={4}>
        Staj Çeşitleri
      </Title>
      <Space
        direction="vertical"
        align="center"
        style={{
          width: "100%",
        }}
      >
        <Segmented
          style={{ padding: 10 }}
          options={options}
          defaultValue=""
          onChange={(getValue) => changeValue(getValue)}
        />
      </Space>

      <Space direction="vertical" style={{ padding: 10, width: "90%" }}>
        <Alert
          message={
            variety.description
              ? `${variety.description} stajını seçtiniz. Başvuruya devam edebilirsiniz`
              : "Başvuruya devam etmek için staj çeşidini seçmelisiniz"
          }
          type={variety.value ? "success" : "info"}
          style={{
            fontSize: "16px",
            display: "flex",
          }}
          showIcon
        />
      </Space>

      <Space
        direction="vertical"
        align="center"
        style={{
          width: "100%",
        }}
      >
        <Button
          type="primary"
          size="large"
          onClick={() => {
            handleLoading();
          }}
          style={{
            width: "20vw",
            paddingBottom: 8,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={variety.value === "" ? true : false}
          block
        >
          {loadings ? <SyncOutlined spin={loadings} /> : "Devam Et"}
        </Button>
      </Space>
    </>
  );
};
export default VarietySelection;
