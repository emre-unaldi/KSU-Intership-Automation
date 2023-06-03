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

    const internshipStatusCheck = (internshipDateRange, companyApproval,consultantApproval) => {
        if (companyApproval && consultantApproval) {
            const internshipStartDate = new Date(internshipDateRange[0])
            const internshipEndDate = new Date(internshipDateRange[1])
            const currentDateTime = new Date()
        
            const internshipDoingCondition = internshipStartDate <= currentDateTime && internshipEndDate >= currentDateTime
            const internshipWaitingCondition = internshipStartDate > currentDateTime
            const internshipFinishingCondition = internshipEndDate < currentDateTime
        
            if (internshipWaitingCondition) {
                return [
                    <ClockCircleOutlined style={tagIconStyle} />,
                    'default',
                    'Staj bekleniyor'
                ]
            } else if (internshipDoingCondition) {
                return [
                    <SyncOutlined spin style={tagIconStyle} />,
                    'processing',
                    'Staj yapılıyor'
                ]
            } else if (internshipFinishingCondition) {
                return [
                    <CheckCircleOutlined style={tagIconStyle} />,
                    'success',
                    'Staj tamamlandı'
                ]
            }
        } else {
            return [
                <ClockCircleOutlined style={tagIconStyle} />,
                'warning',
                'Staj Pasif'
            ]
        }
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

    const internshipCompanyApprovalCheck = (companyApproval,companyApprovalUpdate) => {
        if (companyApprovalUpdate) {
            if (companyApproval) {
                return [
                    <CheckCircleOutlined style={tagIconStyle} />,
                    'success',
                    'Onayladı'
                ]
            } else {
                return [
                    <CloseCircleOutlined style={tagIconStyle} />,
                    'error',
                    'Reddetti'
                ]
            }
        } else {
            return [
                <ClockCircleOutlined style={tagIconStyle} />,
                'default',
                'Bekleniyor'
            ]
        }
    }

    const tagItemCompanyApprovalContent = (companyApprovalStatus) => {
        return (
            <Tag
                icon={companyApprovalStatus[0]}
                color={companyApprovalStatus[1]}
                style={tagStyle}
            >
                <a 
                    href='http://localhost:3000/student/internshipForm/companyApprovalWait'
                    target='_blank'
                    rel="noreferrer"
                >
                    {companyApprovalStatus[2]}
                </a>
            </Tag>
        )
    }
    
    const internshipConstultantApprovalCheck = (consultantApproval,consultantApprovalUpdate) => {
        if (consultantApprovalUpdate) {
            if (consultantApproval) {
                return [
                    <CheckCircleOutlined style={tagIconStyle} />,
                    'success',
                    'Onayladı'
                ]
            } else {
                return [
                    <CloseCircleOutlined style={tagIconStyle} />,
                    'error',
                    'Reddetti'
                ]
            }
        } else {
            return [
                <ClockCircleOutlined style={tagIconStyle} />,
                'default',
                'Bekleniyor'
            ]
        }
    }

    const tagItemConsultantApprovalContent = (consultantApprovalStatus) => {
        return (
            <Tag
                icon={consultantApprovalStatus[0]}
                color={consultantApprovalStatus[1]}
                style={tagStyle}
            >
                <a 
                    href='http://localhost:3000/student/internshipForm/consultantApprovalWait'
                    target='_blank'
                    rel="noreferrer"
                >
                    {consultantApprovalStatus[2]}
                </a>
            </Tag>
        )
    }

    const internshipNotebookFileCheck = (isNotebookFileLoaded) => {
        if (isNotebookFileLoaded) {
            return [
                <CheckCircleOutlined style={tagIconStyle} />,
                'success',
                'Staj Defteri Yüklendi'
            ]
        } else {
            return [
                <CloseCircleOutlined style={tagIconStyle} />,
                'error',
                'Staj Defteri Yüklenmedi'
            ]
        }
    }

    const internshipReportFileCheck = (isReportFileLoaded) => {
        if (isReportFileLoaded) {
            return [
                <CheckCircleOutlined style={tagIconStyle} />,
                'success',
                'Staj Raporu Yüklendi'
            ]
        } else {
            return [
                <CloseCircleOutlined style={tagIconStyle} />,
                'error',
                'Staj Raporu Yüklenmedi'
            ]
        }
    }

    const internshipChartFileCheck = (isChartFileLoaded) => {
        if (isChartFileLoaded) {
            return [
                <CheckCircleOutlined style={tagIconStyle} />,
                'success',
                'Staj Çizelgesi Yüklendi'
            ]
        } else {
            return [
                <CloseCircleOutlined style={tagIconStyle} />,
                'error',
                'Staj Çizelgesi Yüklenmedi'
            ]
        }
    }
    
    const tagItemFilesContent = (fileStatus) => {
        return (
            <Tag
                icon={fileStatus[0]}
                color={fileStatus[1]}
                style={tagStyle}
            >
                {fileStatus[2]}
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
            <Space 
                direction="vertical" 
                style={{ 
                    width: '100%',
                }}
            >
                <Alert 
                    message="Onay durumu mesajına tıklayarak başvurudaki ilgili onay sayfasına gidebilirsiniz" 
                    type="info"     
                    showIcon
                    style={{
                        fontFamily: 'open sans',
                    }}
                />
            </Space>
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
                            <Tag
                                icon={<SendOutlined style={tagIconStyle} />}
                                color="default"
                                style={tagStyle}
                            >
                                {convertToTR(item.internship)} Stajı
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Şirket Onayı"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                tagItemCompanyApprovalContent(
                                    internshipCompanyApprovalCheck(
                                        item.companyApproval,
                                        item.companyApprovalUpdate
                                    )
                                )
                            }
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Danışman Onayı"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                tagItemConsultantApprovalContent(
                                    internshipConstultantApprovalCheck(
                                        item.consultantApproval,
                                        item.consultantApprovalUpdate
                                    )
                                )
                            }
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Staj Durumu"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                tagItemInternshipStatusContent(
                                    internshipStatusCheck(
                                        item.internshipDateRange,
                                        item.companyApproval,
                                        item.consultantApproval
                                    )
                                )
                            }
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Staj Evrakları"
                            labelStyle={labelStyle}
                            contentStyle={contentStyle}
                        >
                            {
                                item.companyApproval && item.consultantApproval ? 
                                (
                                    <>
                                        {
                                            tagItemFilesContent(
                                                internshipNotebookFileCheck(
                                                    item.isNotebookFileLoaded
                                                )
                                            )
                                        }
                                        {
                                            tagItemFilesContent(
                                                internshipReportFileCheck(
                                                    item.isReportFileLoaded
                                                )
                                            )
                                        }
                                        {
                                            tagItemFilesContent(
                                                internshipChartFileCheck(
                                                    item.isChartFileLoaded
                                                )
                                            )
                                        }
                                    </>
                                )
                                :
                                (
                                    <Tag
                                        icon={<ClockCircleOutlined style={tagIconStyle} />}
                                        color="default"
                                        style={tagStyle}
                                    >
                                        Stajın Onaylanması Bekleniyor
                                    </Tag>
                                )
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
