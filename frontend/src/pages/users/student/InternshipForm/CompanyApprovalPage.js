import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Result, Space, Card, Image, Divider, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { SyncOutlined } from '@ant-design/icons'
import { ToastContainer, toast } from 'react-toastify'
import { companyApprovalStatus } from '../../../../redux/internshipSlice'
import ksu from '../../../../assets/img/ksu.png'

const CompanyApprovalStatus = () => {
  const [searchParams] = useSearchParams()
  const [confirmedLoading, setConfirmedLoading] = useState(false)
  const [refusedLoading, setRefusedLoading] = useState(false)
  const [confirmedStatus, setConfirmedStatus] = useState(false)
  const [refusedStatus, setRefusedStatus] = useState(false)
  const dispatch = useDispatch()
  const studentID = searchParams.get('Id')
  const internship = searchParams.get('is')

  const statusHandle = (Status) => {
    Status ? setConfirmedLoading(true) : setRefusedLoading(true)
    console.log(studentID);

    const statusPromise = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (studentID !== null) {
            Status ? setConfirmedLoading(false) : setRefusedLoading(false)

            dispatch(companyApprovalStatus({ Status, studentID, internship }))
              .then((approval) => {
                if (approval?.meta?.requestStatus === 'fulfilled') {
                  if (approval?.payload?.status === 'success') {
                    Status ? setConfirmedStatus(true) : setRefusedStatus(true)
                    resolve(approval.payload.message)
                  } else {
                    reject(approval.payload.message)
                  }
                } else {
                  reject('Staj onayı güncelleme isteği başarısız oldu')
                  throw new Error('Internship approval request failed')
                }
              })
              .catch((err) => {
                console.error(err)
              })
              
          } else {
            Status ? setConfirmedLoading(false) : setRefusedLoading(false)
            reject('Öğrenci kimliği bulunamadı')
            throw new Error('Student ID not found')
          }
        }, 3000)
      })
    }

    toast.promise(statusPromise, {
      pending: Status
        ? 'Staj Durumu Onaylanıyor...'
        : 'Staj Durumu Reddediliyor...',
      success: {
        render({ data }) {
          return data
        }
      },
      error: {
        render({ data }) {
          return data
        }
      }
    })
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
      <Space
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
        }}
      >
        <Card
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Space
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              width={100}
              src={ksu}
              preview={{
                visible: false,
                mask: false
              }}
            />
          </Space>
          <Divider
            style={{
              marginBottom: 0
            }}
          />

          {confirmedStatus === false && refusedStatus === false ? (
            <Result
              status="info"
              title="Staj Onay Durumu Belirleme"
              subTitle="Lütfen öğrencinin şirkette yapacağı stajın onay durumunu belirtiniz. Onay durumunu sadec bir kez güncelleyebilirsiniz !"
              style={{
                padding: '20px 30px 0px 30px'
              }}
              extra={
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="middle"
                    onClick={() => {
                      statusHandle(true)
                    }}
                    style={{
                      width: '20vw',
                      display: 'flex',
                      fontSize: '18px',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {confirmedLoading ? (
                      <SyncOutlined spin={confirmedLoading} />
                    ) : (
                      'Onayla'
                    )}
                  </Button>

                  <Button
                    type="success"
                    htmlType="submit"
                    size="middle"
                    onClick={() => {
                      statusHandle(false)
                    }}
                    style={{
                      width: '20vw',
                      display: 'flex',
                      fontSize: '18px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'red',
                      color: 'white'
                    }}
                  >
                    {refusedLoading ? (
                      <SyncOutlined spin={refusedLoading} />
                    ) : (
                      'Reddet'
                    )}
                  </Button>
                </Space>
              }
            />
          ) : (
            <Result
              status={confirmedStatus === true ? 'success' : 'error'}
              title={
                confirmedStatus === true ? 'Staj Onaylandı' : 'Staj Reddedildi'
              }
              subTitle={
                confirmedStatus === true
                  ? 'Öğrencinin stajı şirket tarafından onaylandı. Sayfadan ayrılabilirsiniz.'
                  : 'Öğrencinin stajı şirket tarafından reddedildi. Sayfadan ayrılabilirsiniz.'
              }
              style={{
                padding: '20px 30px 0px 30px'
              }}
            />
          )}
        </Card>
      </Space>
    </>
  )
}

export default CompanyApprovalStatus
