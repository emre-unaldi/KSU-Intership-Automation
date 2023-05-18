import React, { useEffect, useState } from 'react'
import { Card, Space, Tabs, Typography } from 'antd'
import { ToastContainer } from 'react-toastify'
import FileUpload from './FileUpload'
import Loading from '../../System/Loading'

const Documents = () => {
  const { Title } = Typography
  const [ isPageLoading, setIsPageLoading ] = useState(true)
  const [ isOnTabLoading, setIsOnTabLoading ] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false)
    }, 1500)
  }, [])

  const onTabClick = () => {
    setIsOnTabLoading(true)
    setTimeout(() => {
      setIsOnTabLoading(false)
    }, 1500)
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
      {
        !isPageLoading ? (
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
                alignItems: 'center',
                marginBottom: 0,
                paddingBottom: 0
              }}
            >
              Staj Evraklarını Yükleme
            </Title>
            <Tabs
              onTabClick={onTabClick}
              centered
              items={[
                {
                  label: 'Yazılım Stajı',
                  key: '1',
                  children: (
                    !isOnTabLoading ? (
                      <Space
                        direction="vertical"
                        size="large"
                        style={{
                          display: 'flex',
                          width: '100%'
                        }}
                      >
                        <Card title="Yazılım Stajı Defter Yükle" size="small">
                          <FileUpload internshipType={'software'} documentType={'notebook'} />    
                        </Card>
                        <Card title="Yazılım Stajı İş Yeri Değerlendirme Raporu Yükle" size="small">
                          <FileUpload internshipType={'software'} documentType={'report'} />    
                        </Card>
                        <Card title="Yazılım Stajı Çizelge Yükle" size="small">
                          <FileUpload internshipType={'software'} documentType={'chart'} />    
                        </Card>
                      </Space>
                    ) 
                    : 
                    (
                      <Loading isPageLoading={isOnTabLoading} />
                    )
                  )
                },
                {
                  label: 'Donanım Stajı',
                  key: '2',
                  children: (
                    !isOnTabLoading ? (
                      <Space
                        direction="vertical"
                        size="large"
                        style={{
                          display: 'flex',
                          width: '100%'
                        }}
                      >
                        <Card title="Donanım Stajı Defter Yükle" size="small">
                          <FileUpload internshipType={'hardware'} documentType={'notebook'} />    
                        </Card>
                        <Card title="Donanım Stajı İş Yeri Değerlendirme Raporu Yükle" size="small">
                          <FileUpload internshipType={'hardware'} documentType={'report'} />    
                        </Card>
                        <Card title="Donanım Stajı Çizelge Yükle" size="small">
                          <FileUpload internshipType={'hardware'} documentType={'chart'} />    
                        </Card>
                      </Space>
                    )
                    : 
                    (
                      <Loading isPageLoading={isOnTabLoading} />
                    )
                  )                
                },
                {
                  label: 'UME Stajı',
                  key: '3',
                  children: (
                    !isOnTabLoading ? (
                      <Space
                        direction="vertical"
                        size="large"
                        style={{
                          display: 'flex',
                          width: '100%'
                        }}
                      >
                        <Card title="UME Stajı Defter Yükle" size="small">
                          <FileUpload internshipType={'umes'} documentType={'notebook'} />    
                        </Card>
                        <Card title="UME Stajı Çizelges Yükle" size="small">
                          <FileUpload internshipType={'umes'} documentType={'chart'} />    
                        </Card>
                        <Card title="UME Stajı İş Yeri Değerlendirme Raporu Yükle" size="small">
                          <FileUpload internshipType={'umes'} documentType={'report'} />    
                        </Card>
                      </Space>
                    )
                    :
                    (
                      <Loading isPageLoading={isOnTabLoading} />
                    )
                  )                
                }
              ]}
            />
          </Space>
        )
        : 
        (
          <Loading isPageLoading={isPageLoading} />
        )
      }
    </>
  )
}

export default Documents
