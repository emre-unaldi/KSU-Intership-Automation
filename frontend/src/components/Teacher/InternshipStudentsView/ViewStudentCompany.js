import React, { useEffect, useState } from 'react'
import { Descriptions, Typography, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllInternships } from '../../../redux/internshipSlice'

const ViewStudentCompany = ({ open, setOpen, selectedInternshipId }) => {
    const [userInternship, setUserInternship] = useState([])
    const { Text } = Typography
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllInternships())
        .then((getAll) => {
            if (getAll?.meta?.requestStatus === 'fulfilled') {
                if (getAll?.payload?.status === 'success') {
                    setUserInternship(getAll.payload.data)
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
    }, [dispatch, selectedInternshipId])

    const formatDate = (internshipDateRange) => {
        const startDate = new Date(internshipDateRange[0])
        const endDate = new Date(internshipDateRange[1])
        const startDay = startDate.getUTCDate().toString().padStart(2, '0')
        const startMonth = (startDate.getUTCMonth() + 1).toString().padStart(2, '0')
        const startYear = startDate.getUTCFullYear().toString()
        const endDay = endDate.getUTCDate().toString().padStart(2, '0')
        const endMonth = (endDate.getUTCMonth() + 1).toString().padStart(2, '0')
        const endYear = endDate.getUTCFullYear().toString()
        const dateTime = `${startDay}/${startMonth}/${startYear} - ${endDay}/${endMonth}/${endYear}`

        return dateTime
    }

    const convertToTR = (internshipSelection) => {
        if (internshipSelection === 'software') {
            return 'Yazılım'
        } else if (internshipSelection === 'hardware') {
            return 'Donanım'
        } else {
            return 'UME'
        }
    }

    return (
        <>
            <Modal
                centered
                open={open}
                width={600}
                onCancel={() => setOpen(false)}
                footer={false}
            >
                <Text
                    className="card-title"
                    style={{
                        color: '#193164',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        fontFamily: 'open sans',
                        fontWeight: 'bold'
                    }}
                    level={3}
                >
                    İş Yeri Bilgileri
                </Text>
                {
                    userInternship
                    .filter((internship) => internship._id === selectedInternshipId)
                    .map((item) => 
                        (
                            <Descriptions 
                                bordered 
                                size="small" 
                                key={item._id}
                                style={{
                                    fontFamily: 'open sans'
                                }}
                                labelStyle={{
                                    fontWeight: 'bold'
                                }}
                            >
                                <Descriptions.Item 
                                    span={3} 
                                    label="İş Yeri"
                                >
                                    {item.companyName}
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    span={3} 
                                    label="E-posta"
                                >
                                    <a href={`mailto:${item.companyEmail}`}>
                                        {item.companyEmail}
                                    </a>
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    span={3} 
                                    label="Telefon Numarası"
                                >
                                    {item.companyPhone}
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    span={3} 
                                    label="Yetkili"
                                >
                                    {
                                        item.companyResponsibleName 
                                            + ' ' + 
                                        item.companyResponsibleSurname
                                    } 
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    span={3} 
                                    label="Çalışan Sayısı"
                                >
                                    {item.companyPersonalCount}
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    span={3} 
                                    label="Vergi No"
                                >
                                    {item.companyTaxNumber}
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    span={3} 
                                    label="Adres"
                                >
                                    {item.companyAddress}
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    span={3} 
                                    label="Staj Türü"
                                >
                                    {convertToTR(item.internship)}
                                </Descriptions.Item>
                                <Descriptions.Item 
                                    span={3} 
                                    label="Tarih Aralığı"
                                >
                                    {formatDate(item.internshipDateRange)}
                                </Descriptions.Item>
                            </Descriptions>
                        )
                    )
                }
            </Modal>
        </>
    )
}

export default ViewStudentCompany
