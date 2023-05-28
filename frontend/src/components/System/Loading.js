import { Space } from 'antd'
import React from 'react'
import { ClockLoader } from 'react-spinners'

function Loading({ isPageLoading }) {
    return (
        <Space
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '50vh'
            }}
        >
            <ClockLoader
                color={'#2176f3'}
                loading={isPageLoading}
                size={50}
            />
        </Space>
    )
}

export default Loading
