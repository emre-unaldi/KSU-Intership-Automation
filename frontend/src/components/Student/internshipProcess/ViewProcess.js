import React, { useEffect, useState } from 'react'
import { Space, Typography, Descriptions, Tag } from 'antd'
import { 
    CheckCircleOutlined,
    CloseCircleOutlined,
    SendOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import Loading from '../../System/Loading'

const ViewProcess = () => {
    const { Title } = Typography
    const [ isPageLoading, setIsPageLoading ] = useState(true)

    useEffect(() => {
        setTimeout(() => {
        setIsPageLoading(false)
        }, 1500);
    }, [])

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
        alignItems: 'center'
    }

    const contentStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }

    const tagStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        padding: 5,
        margin: 5
    }

    return (
        <>
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
                                textAlign: 'center',
                                marginBottom: 0,
                                paddingBottom: 0
                            }}
                        >
                            Staj Süreci Görüntüleme
                        </Title>
                        <Descriptions 
                            layout='vertical' 
                            bordered
                            size='small'
                            column={column}
                        >
                            <Descriptions.Item 
                                label='Staj Türü'
                                labelStyle={labelStyle}
                                contentStyle={contentStyle}
                            > 
                                <Tag 
                                    icon={<SendOutlined
                                        style={{
                                            fontSize: '14px'
                                        }}
                                    />} 
                                    color="default"
                                    style={tagStyle}
                                >
                                    Yazılım
                                </Tag>  
                            </Descriptions.Item>
                            <Descriptions.Item 
                                label='Şirket Onayı'
                                labelStyle={labelStyle}
                                contentStyle={contentStyle}
                            > 
                                <Tag 
                                    icon={<CheckCircleOutlined 
                                        style={{
                                            fontSize: '14px'
                                        }}
                                    />} 
                                    color="success"
                                    style={tagStyle}
                                >
                                    Onaylandı
                                </Tag>  
                            </Descriptions.Item>
                            <Descriptions.Item 
                                label='Danışman Onayı'
                                labelStyle={labelStyle}
                                contentStyle={contentStyle}
                            > 
                                <Tag 
                                    icon={<CheckCircleOutlined 
                                        style={{
                                            fontSize: '14px'
                                        }}
                                    />} 
                                    color="success"
                                    style={tagStyle}
                                >
                                    Onaylandı
                                </Tag>  
                            </Descriptions.Item>
                            <Descriptions.Item 
                                label='Staj Durumu'
                                labelStyle={labelStyle}
                                contentStyle={contentStyle}
                            > 
                                <Tag 
                                    icon={<SyncOutlined
                                        spin
                                        style={{
                                            fontSize: '14px'
                                        }}
                                    />} 
                                    color="blue"
                                    style={tagStyle}
                                >
                                    Staj Yapılıyor
                                </Tag>  
                            </Descriptions.Item>
                            <Descriptions.Item 
                                label='Staj Evrakları'
                                labelStyle={labelStyle}
                                contentStyle={contentStyle}
                            > 
                                <Tag 
                                    icon={<CheckCircleOutlined 
                                        style={{
                                            fontSize: '14px'
                                        }}
                                    />} 
                                    color="success"
                                    style={tagStyle}
                                >
                                    Staj Defteri Yüklendi
                                </Tag>  
                                <Tag 
                                    icon={<CheckCircleOutlined 
                                        style={{
                                            fontSize: '14px'
                                        }}
                                    />} 
                                    color="success"
                                    style={tagStyle}
                                >
                                    Staj Raporu Yüklendi
                                </Tag> 
                                <Tag 
                                    icon={<CloseCircleOutlined 
                                        style={{
                                            fontSize: '14px'
                                        }}
                                    />} 
                                    color="red"
                                    style={tagStyle}
                                >
                                    Staj Çizelgesi Yüklenmedi
                                </Tag> 
                            </Descriptions.Item>
                        </Descriptions>
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

export default ViewProcess
