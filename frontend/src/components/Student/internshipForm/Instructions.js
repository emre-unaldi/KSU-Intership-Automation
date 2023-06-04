import { useState } from 'react'
import { Space, Button, Alert, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

const Instructions = () => {
  const [approval, setApproval] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const { Title } = Typography
  const navigate = useNavigate()

  const handleLoading = () => {
    localStorage.setItem('instructions', approval)
    setButtonLoading(true)

    setTimeout(() => {
      setButtonLoading(false)
      navigate('/student/internshipForm/companyInformation')
    }, 3000)
  }

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%'
        }}
      >
        <Title
          className="card-title"
          style={{
            color: '#193164',
            fontFamily: 'open sans',
            paddingBottom: 0,
            textAlign: 'center'
          }}
          level={3}
        >
          Staj Uygulama İlkeleri Onayı
        </Title>
        <embed
          src={`http://localhost:3001/documents/staj_ilkeleri.pdf`}
          width="100%"
          height="500"
          type="application/pdf"
          style={{
            fontFamily: 'open sans',
            borderRadius: 10,
            border: '5px solid #323639'
          }}
        />
        <Alert
          message={
            approval
              ? 'Başvuruya devam edebilirsiniz'
              : 'Başvuruya devam etmek için staj uygulama ilkelerini okumalı ve onay vermeniz gerekmektedir'
          }
          style={{
            fontFamily: 'open sans'
          }}
          type={approval ? 'success' : 'info'}
          showIcon
          action={
            <Space>
              {approval ? (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    setApproval(false)
                  }}
                  style={{
                    backgroundColor: '#4fc818',
                    fontFamily: 'open sans'
                  }}
                >
                  İptal Et
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    setApproval(true)
                  }}
                  style={{
                    fontFamily: 'open sans'
                  }}
                >
                  Onayla
                </Button>
              )}
            </Space>
          }
        />
        <Space
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              handleLoading()
            }}
            style={{
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'open sans'
            }}
            disabled={approval ? false : true}
          >
            Devam Et
            {
              buttonLoading ? 
                <LoadingOutlined/>
                : 
                null
            }
          </Button>
        </Space>
      </Space>
    </>
  )
}

export default Instructions
