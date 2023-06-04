import React, { useEffect, useState } from 'react'
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons'
import { Button, Result, Typography, Spin, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserAndInternships } from '../../../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const CompanyApprovalStatus = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const [internships, setInternships] = useState([])
  const { Title } = Typography
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state.user.check?.data?.user?._id)

  useEffect(() => {
    dispatch(getAllUserAndInternships())
      .then(async (getAll) => {
        if (getAll?.meta?.requestStatus === 'fulfilled') {
          if (getAll?.payload?.status === 'success') {
            const currentUser = await getAll.payload.data.find(
              (user) => user._id === currentUserId
            )
            const currentUserInternships =
              (await currentUser?.internships) || []
            setInternships(currentUserInternships)
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

  const buttonStyle = {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'open sans'
  }

  const convertToTR = (internship) => {
    if (internship === 'software') {
      return 'Yazılım'
    } else if (internship === 'hardware') {
      return 'Donanım'
    } else {
      return 'UME'
    }
  }

  const handleLoading = (approval) => {
    setButtonLoading(true)
    setTimeout(() => {
      setButtonLoading(false)
      approval ? 
        navigate('/student/internshipForm/consultantApprovalWait')
        : 
        navigate('/student/home')
    }, 3000)
  }

  return (
    <Space
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Title
        className="card-title"
        style={{
          color: '#193164',
          textAlign: 'center',
          fontFamily: 'open sans',
        }}
        level={3}
      >
        Staj Yapılacak Şirket Onay Durumu
      </Title>
      {
        internships.map((item) => 
          {
            return item.companyApprovalUpdate ?
            (
              <Result
                key={item._id}
                style={{
                  maxWidth: 800,
                  width: '100%',
                  boxShadow: '1px 2px 20px #d4d4d4',
                  borderRadius: 10,
                  marginBottom: 35,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'open sans'
                }}
                status={item.companyApproval ? 'success' : 'error'}
                title={
                  item.companyApproval ? 
                    `${item.companyName} şirketi tarafından ${
                      convertToTR(item.internship).toLocaleLowerCase()
                    } stajı başvurun onaylandı`
                    : 
                    `${item.companyName} şirketi tarafından ${
                      convertToTR(item.internship).toLocaleLowerCase()
                    } stajı başvurun reddedildi`
                }
                subTitle={
                  item.companyApproval ? 
                    `Devam et butonuna basıldığında ${
                      convertToTR(item.internship).toLocaleLowerCase()
                    } stajı başvuru formun danışman öğretmenin onayı için danışman öğretmene gönderilecektir`
                    : 
                    `${convertToTR(item.internship)} stajı için ${
                        item.companyName
                    } şirketi ile tekrardan iletişime geçilmelidir`
                }
                extra={[
                  item.companyApproval ? 
                  (
                    <Button
                      type="primary"
                      size="middle"
                      key={item._id}
                      onClick={() => {
                        handleLoading(item.companyApproval)
                      }}
                      style={buttonStyle}
                    >
                      Devam Et
                      {
                        buttonLoading ? 
                          <LoadingOutlined />
                          : 
                          null
                      }
                    </Button>
                  ) 
                  : 
                  (
                    <Button
                      type="primary"
                      size="middle"
                      key={item._id}
                      loading={buttonLoading}
                      onClick={() => {
                        handleLoading(item.companyApproval)
                      }}
                      style={buttonStyle}
                    >
                      Ansayfa
                      {
                        buttonLoading ? 
                          <LoadingOutlined />
                          : 
                          null
                      }
                    </Button>
                  )
                ]}
              />
            ) 
            : 
            (
              <Space
                key={item._id}
                direction="vertical"
                align="center"
                size="large"
                style={{
                  maxWidth: 800,
                  width: '100%',
                  boxShadow: '1px 2px 20px #d4d4d4',
                  borderRadius: 10,
                  marginBottom: 35,
                  fontFamily: 'open sans'
                }}
              >
                <Result
                  icon={<SmileOutlined />}
                  title={`${convertToTR(item.internship)} stajı başvurusu Yapıldı`}
                  subTitle={`Staj yapılacak ${
                    item.companyName
                  } şirketine ${convertToTR(
                    item.internship
                  ).toLocaleLowerCase()} stajı onayı vermesi için E-Posta gönderildi`}
                  style={{
                    fontFamily: 'open sans'
                  }}
                  extra={
                    <Spin
                      size="large"
                      style={{
                        fontSize: '40',
                        fontFamily: 'open sans',
                      }}
                      tip="Onay Bekleniyor"
                    />
                  }
                />
              </Space>
            )
          }
        )
      }
    </Space>
  )
}

export default CompanyApprovalStatus
