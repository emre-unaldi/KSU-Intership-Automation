import React from 'react'
import { Space, Tag, Typography } from 'antd'

const PeriodStatus = () => {
    const { Text } = Typography

    const tagStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        padding: '5px 10px',
        marginRight: 0,
        fontFamily: 'open sans'
    }

    return (
        <Space
            style={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                marginRight: 20
            }}
        >
            {
                true ? 
                    (
                        <Tag
                            color='success'
                            style={tagStyle}
                        >
                            Aktif
                        </Tag>
                    )
                    :
                    (
                        <Tag
                            color='error'
                            style={tagStyle}
                        >
                            Pasif
                        </Tag>
                    )
            }
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: 'open sans'
                }}
            >
                Bahar Dönemi
            </Text>
        </Space>
    )
}

export default PeriodStatus