import { Space } from 'antd'
import React from 'react'
import { ScaleLoader } from 'react-spinners'

function Loading({ isPageLoading }) {
    return (
        <Space
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '50vh',
            }}
        >
            <ScaleLoader
                height={100}
                width={10}
                radius={10}
                margin={10}
                color={'#2176f3'}
                loading={isPageLoading}
                size={100}
            />
        </Space>
    )
}

export default Loading
