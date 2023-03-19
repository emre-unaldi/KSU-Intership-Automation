import React from "react";
import { Descriptions, Typography } from "antd";

function ViewCompanyStudentApplied() {
  const { Text } = Typography;
  return (
    <>
      <Text
        className="card-title"
        style={{
          color: "#193164",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        level={4}
      >
        İş Yeri Bilgileri
      </Text>
      <Descriptions bordered size="small">
        <Descriptions.Item span={3} label="İş Yeri">
          KcTek Arge Bilişim
        </Descriptions.Item>
        <Descriptions.Item span={3} label="E-posta">
          info@kctek.com.tr
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Telefon Numarası">
          0216 254 8963
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Yetkili">
          Emre Ünaldı
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Çalışan Sayısı">
          20
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Vergi No">
          9874563210
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Adres">
          Erciyes Teknopark Tekno-4 Kctek Talas/Kayseri
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Staj Türü">
          Yazılım Stajı
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Tarih Aralığı">
          01/06/2021 - 05/07/2021
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default ViewCompanyStudentApplied;
