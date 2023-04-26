import React, { useEffect, useState } from 'react'
import { SmileOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Result, Typography, Spin, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserAndInternships } from '../../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import './internshForm.css'

function ConsultantApprovalStatus() {
  const [loadings, setLoadings] = useState(false)
  const [internships, setInternships] = useState([])
  const { Title, Text } = Typography
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUserId = useSelector(
    (state) => state.user.check?.data?.user?._id
  )

  useEffect(() => {
    dispatch(getAllUserAndInternships())
      .then(async (getAll) => {
        if (getAll?.meta?.requestStatus === 'fulfilled') {
          if (getAll?.payload?.status === 'success') {
            const currentUser = await getAll.payload.data.find(
              (user) => user._id === currentUserId
            )
            const currentUserInternships = await currentUser?.internships || []
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

  const btnTextStyle = {
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
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
    setLoadings(true)
    setTimeout(() => {
      setLoadings(false)
      navigate('/student/home')
    }, 3000)
  }

  return (
    <>
      <Title
        className="card-title"
        style={{ color: '#193164', textAlign: 'center' }}
        level={4}
      >
        Danışman Öğretmen Staj Başvurusu Onay Durumu
      </Title>

      {internships.map((item) => {
        return item.consultantApprovalUpdate ? (
          <Result
            key={item._id}
            style={{
              maxWidth: 650,
              width: '100%',
              boxShadow: '1px 2px 20px #d4d4d4',
              borderRadius: 10,
              marginBottom: 35,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            status={item.consultantApproval ? 'success' : 'error'}
            title={
              item.consultantApproval
                ? `Üniversite tarafından ${convertToTR(
                    item.internship
                  ).toLocaleLowerCase()} stajı başvurun onaylandı`
                : `Üniversite tarafından ${convertToTR(
                    item.internship
                  ).toLocaleLowerCase()} stajı başvurun reddedildi`
            }
            subTitle={
              item.consultantApproval
                ? `${convertToTR(
                    item.internship
                  )} stajı başvuru süreci başarıyla tamamlanmıştır. Öğrenci staj sonunda gerekli evrakları sisteme yüklemelidir`
                : `Danışman öğretmen ile ${convertToTR(
                    item.internship
                  ).toLocaleLowerCase()} stajı için iletişime geçilmeli ve gerekli görülürse staj yeri değiştirilmelidir`
            }
            extra={[
              item.consultantApproval ? (
                <Button
                  type="primary"
                  size="large"
                  key="btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => {
                    handleLoading(item.consultantApproval)
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
              ) : (
                <Button
                  type="primary"
                  size="large"
                  key="btn"
                  onClick={() => {
                    handleLoading(item.consultantApproval)
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
            key={item._id}
            direction="vertical"
            align="center"
            size="large"
            style={{
              maxWidth: 650,
              width: '100%',
              boxShadow: '1px 2px 20px #d4d4d4',
              borderRadius: 10,
              marginBottom: 35
            }}
          >
            <Result
              icon={<SmileOutlined />}
              title={`${convertToTR(item.internship)} stajı başvurusu yapıldı`}
              subTitle={`Staj başvurusunu onaylayacak danışman öğretmene başvuru formu bilgileri iletildi`}
              extra={
                <Spin
                  size="large"
                  style={{ fontSize: '40' }}
                  tip="Onay Bekleniyor"
                />
              }
            />
          </Space>
        )
      })}
    </>
  )
}

export default ConsultantApprovalStatus
