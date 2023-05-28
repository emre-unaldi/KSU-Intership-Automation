    import React, { useEffect, useState } from 'react'
    import { useSelector, useDispatch } from 'react-redux'
    import { Space, Typography, Descriptions, Tag, Alert } from 'antd'
    import { getAllInternships } from '../../../redux/internshipSlice'
    import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    SendOutlined,
    SyncOutlined
    } from '@ant-design/icons'

    const ViewProcess = () => {
    const [currentUserInternships, setCurrentUserInternships] = useState([])
    const dispatch = useDispatch()
    const { Title } = Typography
    const currentUserId = useSelector((state) => state.user.check?.data?.user?._id)
    const column = {
        xxl: 4,
        xl: 4,
        lg: 4,
        md: 4,
        sm: 2,
        xs: 2
    }
    const labelStyle = {
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'open sans'
    }
    const contentStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontFamily: 'open sans'
    }
    const tagStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        padding: 5,
        margin: 5,
        fontFamily: 'open sans'
    }
    const tagIconStyle = {
        fontSize: '14px'
    }

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

    const convertToTR = (internship) => {
        if (internship === 'software') {
        return 'Yazılım'
        } else if (internship === 'hardware') {
        return 'Donanım'
        } else {
        return 'UME'
        }
    }

    const internshipStatusCheck = (internshipDateRange) => {
        const internshipStartDate = new Date(internshipDateRange[0])
        const internshipEndDate = new Date(internshipDateRange[1])
        const currentDateTime = new Date()

        const internshipDoingCondition =
        internshipStartDate <= currentDateTime &&
        internshipEndDate >= currentDateTime
        const internshipWaitingCondition = internshipStartDate > currentDateTime
        const internshipFinishingCondition = internshipEndDate < currentDateTime

        if (internshipWaitingCondition) {
            return [
                <ClockCircleOutlined style={tagIconStyle} />,
                'error',
                'Staj bekleniyor',
            ]
        } else if (internshipDoingCondition) {
            return [
                <SyncOutlined spin style={tagIconStyle} />,
                'blue',
                'Staj yapılıyor',
            ]
        } else if (internshipFinishingCondition) {
            return [
                <CheckCircleOutlined style={tagIconStyle} />,
                'success',
                'Staj tamamlandı',
            ]
        }
    }

    const tagItemSuccessContent = (message) => {
        return (
            <Tag
                icon={<CheckCircleOutlined style={tagIconStyle} />}
                color="success"
                style={tagStyle}
            >
                {message}
            </Tag>
        )
    }

    const tagItemErrorContent = (message) => {
        return (
            <Tag
                icon={<CloseCircleOutlined style={tagIconStyle} />}
                color="error"
                style={tagStyle}
            >
                {message}
            </Tag>
        )
    }

    const tagItemInternshipStatusContent = (internshipStatus) => {
        return (
            <Tag
                icon={internshipStatus[0]}
                color={internshipStatus[1]}
                style={tagStyle}
            >
                {internshipStatus[2]}
            </Tag>
        )
    }

    const tagItemInternshipTypeContent = (message) => {
        return (
            <Tag
                icon={<SendOutlined style={tagIconStyle} />}
                color="default"
                style={tagStyle}
            >
                {message} Stajı
            </Tag>
        )
    }

    return (
        <Space
            direction="vertical"
            size="large"
            style={{
                display: 'flex',
                width: '100%',
            }}
        >
            <Title
                className="card-title"
                level={3}
                style={{
                    color: '#193164',
                    textAlign: 'center',
                    marginBottom: 0,
                    paddingBottom: 0,
                    fontFamily: 'open sans',
                }}
            >
                Staj Süreci Görüntüleme
            </Title>
            {
                currentUserInternships.length !== 0 ?
                currentUserInternships.map((item) => (
                    <Descriptions
                        layout="vertical"
                        bordered
                        size="small"
                        column={column}
                        key={item._id}
                    >
                        <Descriptions.Item
                            label="Staj Türü"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                tagItemInternshipTypeContent(convertToTR(item.internship))
                            }
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Şirket Onayı"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                item.companyApproval ? 
                                tagItemSuccessContent('Onaylandı')
                                : 
                                tagItemErrorContent('Reddedildi')
                            }
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Danışman Onayı"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                item.consultantApproval ? 
                                tagItemSuccessContent('Onaylandı')
                                : 
                                tagItemErrorContent('Reddedildi')
                            }
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Staj Durumu"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                tagItemInternshipStatusContent(
                                    internshipStatusCheck(item.internshipDateRange)
                                )
                            }
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Staj Evrakları"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                item.isNotebookFileLoaded ? 
                                tagItemSuccessContent('Staj Defteri Yüklendi')
                                : 
                                tagItemErrorContent('Staj Defteri Yüklenmedi')
                            }
                            {
                                item.isReportFileLoaded ? 
                                tagItemSuccessContent('Staj Raporu Yüklendi')
                                : 
                                tagItemErrorContent('Staj Raporu Yüklenmedi')
                            }
                            {
                                item.isChartFileLoaded ? 
                                tagItemSuccessContent('Staj Çizelgesi Yüklendi')
                                :
                                tagItemErrorContent('Staj Çizelgesi Yüklenmedi')
                            }
                        </Descriptions.Item>
                    </Descriptions>
                ))
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
    )
}

export default ViewProcess
