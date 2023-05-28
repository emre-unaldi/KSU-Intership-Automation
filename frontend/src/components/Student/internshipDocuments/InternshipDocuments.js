import React, { useEffect, useState } from 'react'
import { Alert, Card, Space, Tabs, Typography } from 'antd'
import { ToastContainer } from 'react-toastify'
import { getAllInternships } from '../../../redux/internshipSlice'
import { useSelector, useDispatch } from 'react-redux'
import FileUpload from './FileUpload'

const Documents = () => {
  const [currentUserInternships, setCurrentUserInternships] = useState([])
  const currentUserId = useSelector((state) => state.user.check?.data?.user?._id)
  const dispatch = useDispatch()
  const { Title } = Typography

  useEffect(() => {
    dispatch(getAllInternships())
    .then(async (getAll) => {
        if (getAll?.meta?.requestStatus === 'fulfilled') {
        if (getAll?.payload?.status === 'success') {
            const internships = await getAll.payload.data.filter(
                (item) => item.studentID === currentUserId
            )
            setCurrentUserInternships(internships)
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

console.log(currentUserInternships);

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
              level={3}
              style={{
                color: '#193164',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 0,
                paddingBottom: 0,
                fontFamily: 'open sans'
              }}
            >
              Staj Evraklarını Yükleme
            </Title>
            {
              currentUserInternships.length !== 0 ?
              (
                <Tabs
                  items={[
                      currentUserInternships.find((item) => item.internship === 'software') && 
                      (
                        {
                          label: 'Yazılım Stajı',
                          key: '1',
                          children: (
                            <Space
                              direction="vertical"
                              size="large"
                              style={{
                                display: 'flex',
                                width: '100%'
                              }}
                            >
                              <Card 
                                title="Yazılım Stajı Defter Yükle" 
                                size="small"
                                style={{ 
                                  fontFamily: 'open sans' 
                                }}
                              >
                                <FileUpload 
                                  internshipType={'software'} 
                                  documentType={'notebook'}   
                                />    
                              </Card>

                              <Card 
                                title="Yazılım Stajı İş Yeri Değerlendirme Raporu Yükle" 
                                size="small"
                                style={{ 
                                  fontFamily: 'open sans' 
                                }}
                              >
                                <FileUpload 
                                  internshipType={'software'} 
                                  documentType={'report'}   
                                />    
                              </Card>

                              <Card 
                                title="Yazılım Stajı Çizelge Yükle" 
                                size="small"
                                style={{ 
                                  fontFamily: 'open sans' 
                                }}
                              >
                                <FileUpload 
                                  internshipType={'software'} 
                                  documentType={'chart'}   
                                />    
                              </Card>
                            </Space>
                          )
                        }
                      )
                    ,
                    currentUserInternships.find((item) => item.internship === 'hardware') && 
                    (
                      {
                        label: 'Donanım Stajı',
                        key: '2',
                        children: (
                          <Space
                            direction="vertical"
                            size="large"
                            style={{
                              display: 'flex',
                              width: '100%'
                            }}
                          >
                            <Card 
                              title="Donanım Stajı Defter Yükle" 
                              size="small" 
                              style={{ 
                                fontFamily: 'open sans' 
                              }}
                            >
                              <FileUpload 
                                internshipType={'hardware'} 
                                documentType={'notebook'}   
                              />    
                            </Card>

                            <Card 
                              title="Donanım Stajı İş Yeri Değerlendirme Raporu Yükle" 
                              size="small" 
                              style={{ 
                                fontFamily: 'open sans' 
                              }} 
                            >
                              <FileUpload 
                                internshipType={'hardware'} 
                                documentType={'report'}   
                              />    
                            </Card>

                            <Card 
                              title="Donanım Stajı Çizelge Yükle" 
                              size="small" 
                              style={{ 
                                fontFamily: 'open sans' 
                              }} 
                            >
                              <FileUpload 
                                internshipType={'hardware'} 
                                documentType={'chart'}   
                              />    
                            </Card>
                          </Space>
                        )                
                      }
                    )
                    ,
                    currentUserInternships.find((item) => item.internship === 'ume') &&
                    (
                      {
                        label: 'UME Stajı',
                        key: '3',
                        children: (
                          <Space
                            direction="vertical"
                            size="large"
                            style={{
                              display: 'flex',
                              width: '100%',
                              fontFamily: 'open sans'
                            }}
                          >
                            <Card 
                              title="UME Stajı Defter Yükle" 
                              size="small" 
                              style={{ 
                                fontFamily: 'open sans' 
                              }} 
                            >
                              <FileUpload 
                                internshipType={'ume'} 
                                documentType={'notebook'}
                              />    
                            </Card>

                            <Card 
                              title="UME Stajı İş Yeri Değerlendirme Raporu Yükle" 
                              size="small" 
                              style={{ 
                                fontFamily: 'open sans' 
                              }} 
                            >
                              <FileUpload 
                                internshipType={'ume'} 
                                documentType={'report'}   
                              />    
                            </Card>

                            <Card 
                              title="UME Stajı Çizelge Yükle" 
                              size="small" 
                              style={{ 
                                fontFamily: 'open sans' 
                              }} 
                            >
                              <FileUpload 
                                internshipType={'ume'} 
                                documentType={'chart'}   
                              />    
                            </Card>
                          </Space>
                        )                
                      }
                    )
                  ]}
                  centered
                  style={{
                    fontFamily: 'open sans'
                  }}
                />
              )
              :
              (
                <Space 
                    direction="vertical" 
                    style={{ 
                        width: '100%',
                    }}
                >
                    <Alert 
                        message="Herhangi bir staj kaydınız bulunmamaktadır." 
                        type="info"     
                        showIcon
                        style={{
                            fontFamily: 'open sans'
                        }}
                    />
                </Space>
              )
            }
          </Space>
    </>
  )
}

export default Documents
