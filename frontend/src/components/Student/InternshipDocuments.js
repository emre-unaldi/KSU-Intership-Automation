import React from 'react'
import { Card, Space, Typography } from 'antd'
import { ToastContainer } from 'react-toastify'
import FileUpload from './FileUpload'

const Documents = () => {
  const { Title } = Typography

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
        direction="vertical"
        size="large"
        style={{
          display: 'flex',
          width: '100%'
        }}
      >
        <Title
          className="card-title"
          level={4}
          style={{
            color: '#193164',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Staj Evraklarını Yükleme
        </Title>
        <Card title="Staj Defteri Yükle" size="small">
          <FileUpload documentType = {'notebook'} />    
        </Card>
        <Card title="Staj Çizelgesi Yükle" size="small">
          <FileUpload documentType = {'chart'} />    
        </Card>
        <Card title="İş Yeri Değerlendirme Raporu Yükle" size="small">
          <FileUpload documentType = {'report'} />    
        </Card>
      </Space>
    </>
  )
}

export default Documents
