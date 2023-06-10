import React from 'react'
import { Typography, Card, Space } from 'antd'
import { ToastContainer } from 'react-toastify'
import PeriodForm from './PeriodForm'
import PeriodStatus from './PeriodStatus'
import PeriodClose from './PeriodClose'
import PeriodDelete from './PeriodDelete'

const EducationPeriodOpenClose = () => {
    const { Title } = Typography

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
            <Title
                className="card-title"
                level={3}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#193164',
                    fontFamily: 'open sans'
                }}
            >
                Dönem Aç / Kapat
            </Title>
            <Card
                style={{
                    maxWidth: 800,
                    width: '100%',
                    margin: '0 auto 20px auto',
                    backgroundColor: '#F6F9FF',
                    border: '1px solid #d9d9d9'
                }}
            >
                <PeriodForm/>
            </Card>
            <Space
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: 800,
                    margin: '0 auto',
                    border: '1px solid #d9d9d9',
                    backgroundColor: '#F6F9FF',
                    borderRadius: 10,
                    padding: 10
                }}
            >
                <PeriodStatus/>
                <Space
                    style={{
                        flexWrap: 'wrap'
                    }}
                >
                    <PeriodClose />
                    <PeriodDelete />
                </Space>
            </Space>
        </>
    )
}

export default EducationPeriodOpenClose