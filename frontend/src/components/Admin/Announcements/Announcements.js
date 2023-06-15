import React from 'react'
import { Typography } from 'antd'
import { ToastContainer } from 'react-toastify'
import AnnouncementAddForm from './AnnouncementAddForm'
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
            <AnnouncementAddForm/>
            <AnnouncementViewTable/>
        </>
    )
}

export default Announcements