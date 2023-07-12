import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux";
import {getAllAnnouncements} from "../../../redux/announcementSlice";
import {Alert, Space} from "antd";
import {SlackOutlined} from "@ant-design/icons";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([])
    const dispatch = useDispatch()

    const changeType = (type) => {
        if (type === "Tarih"){
            return "success"
        } else if(type === "Ders"){
            return "info"
        } else {
            return "warning"
        }
    }

    useEffect(() => {
        dispatch(getAllAnnouncements())
            .then((getAll) => {
                if (getAll?.meta?.requestStatus === 'fulfilled') {
                    if (getAll?.payload?.status === 'success') {
                        console.log(getAll.payload.message)
                        setAnnouncements(getAll.payload.data)
                    } else {
                        console.log(getAll.payload.message)
                    }
                } else {
                    throw new Error('Announcements Get All request failed')
                }
            }).catch((err) => {
            console.error(err)
        })
    }, [dispatch])

    return(
        <>
            <h2
                className="card-title d-flex justify-content-center"
                style={{
                    fontFamily: 'open sans',
                    fontSize: 20,
                }}
            >
                <b>Duyurular</b>
            </h2>
            <Space
                direction="vertical"
                style={{
                    width: '100%'
                }}
            >
                {
                    announcements.map((item) => (
                        <Alert
                            key={item._id}
                            message={(
                                <span
                                    style={{
                                        fontWeight: 600
                                    }}
                                >
                                    {item.title}
                                </span>
                            )}
                            description={item.content}
                            type={changeType(item.type)}
                            icon={<SlackOutlined />}
                            showIcon={true}
                            style={{
                                fontFamily: "open sans"
                            }}
                        />
                    ))
                }
            </Space>
        </>
    )
}

export default Announcements
