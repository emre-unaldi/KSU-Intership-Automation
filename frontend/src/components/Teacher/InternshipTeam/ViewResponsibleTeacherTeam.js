import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Card, Col, Descriptions, Row, Space, Typography } from 'antd'
import { getAllUsers } from '../../../redux/userSlice'

const ViewResponsibleTeacherTeam = () => {
    const [users, setUsers] = useState([])
    const { Title } = Typography
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
        .then((users) => {
            if (users?.meta?.requestStatus === 'fulfilled') {
                if (users?.payload?.status === 'success') {
                    setUsers(users.payload.data)
                } else {
                    throw new Error(users.payload.message)
                }
            } else {
                throw new Error('Users fetch request failed')
            }
        }).catch((err) => {
            console.error(err);
        });
    }, [dispatch])


    const formattedUsername = (name, surname) => {
        const formattedName = name.slice(0,1).toUpperCase()
        const formattedSurname = surname.slice(0,1).toUpperCase()
        const formattedUsername = formattedName + formattedSurname

        return formattedUsername
    }
    
    const randomHexColorCode = (userId) => {
        const startTwoCharacters = userId.slice(2,4).toUpperCase()
        const middleTwoCharacters = userId.slice(6, 8).toUpperCase()
        const endTwoCharacters = userId.slice(-2).toUpperCase()
        const combinedString = startTwoCharacters + middleTwoCharacters + endTwoCharacters
        let colorCode = `#${combinedString}`

        return colorCode
    }

    return (
        <>
            <Title
                className="card-title"
                style={{
                    textAlign: 'center',
                    color: '#193164',
                    fontFamily: 'open sans',
                    marginBottom: 0
                }}
                level={3}
            >
                Staj Sorumlusu Öğretmenler
            </Title>

            <Row gutter={[32, 32]}>
                {
                    users
                    .filter((item) => item.role === 'teacher')
                    .map((item) => 
                        (
                            <Col span={24} sm={12} md={12} lg={12} xl={12} key={item._id}>
                                <Card
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center', 
                                        backgroundColor: '#E8E8E8'
                                    }}
                                >
                                    <Space
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Avatar
                                            size={{
                                                xs: 40,
                                                sm: 40,
                                                md: 40,
                                                lg: 64,
                                                xl: 80,
                                                xxl: 100,
                                            }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: randomHexColorCode(item._id),
                                                marginBottom: 25,
                                                fontFamily: 'open sans'
                                            }}
                                        >
                                            { 
                                                formattedUsername(item.name, item.surname) 
                                            }
                                        </Avatar>
                                    </Space>
                                    <Descriptions
                                        bordered
                                        size='small'
                                        style={{
                                            fontFamily: 'open sans',
                                            backgroundColor: 'white',
                                            borderRadius: 10
                                        }}
                                        labelStyle={{
                                            fontWeight: 'bold'
                                        }}  
                                        column={2}  
                                    >
                                        <Descriptions.Item span={2} label="Ad Soyad">
                                            {item.name + ' ' + item.surname }
                                        </Descriptions.Item>
                                        <Descriptions.Item span={2} label="Telefon Numarası">
                                            {item.phoneNumber}
                                        </Descriptions.Item>
                                        <Descriptions.Item span={2} label="E-Posta">
                                            <a href={`mailto:${item.email}`}>
                                                {item.email}
                                            </a>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        )
                    )
                }
            </Row>
        </>
    )
}

export default ViewResponsibleTeacherTeam