import React from "react"
import {Typography} from 'antd'
import {ToastContainer} from 'react-toastify'
import TeacherViewTable from "./TeacherViewTable";

const Teachers = () => {
    const {Title} = Typography

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
                Öğretmenler
            </Title>
            <TeacherViewTable />
        </>
    )
}

export default Teachers
