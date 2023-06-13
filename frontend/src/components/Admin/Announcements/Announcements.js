import React from 'react'
import { Card, Typography } from 'antd'
import { ToastContainer } from 'react-toastify'
import AnnouncementForm from './AnnouncementForm'
import AnnouncementViewTable from './AnnouncementViewTable'

const Announcements = () => {
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
                Duyurular
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
                <AnnouncementForm/>
            </Card>
            <Card
                style={{
                    border: '1px solid #d9d9d9',
                    backgroundColor: '#F6F9FF'
                }}
            >
                <AnnouncementViewTable/>
            </Card>
        </>
    )
}

export default Announcements