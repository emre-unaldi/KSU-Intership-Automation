import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Alert, Button, Card, Col, Input, Row, Space, Table, Typography} from 'antd'
import {DeleteOutlined, FontColorsOutlined, SearchOutlined} from '@ant-design/icons'
import {FiEdit} from 'react-icons/fi'
import {useDispatch} from 'react-redux'
import Highlighter from 'react-highlight-words'
import {getAllUsers} from "../../../redux/userSlice";
import TeacherUpdateForm from "./TeacherUpdateForm";
import TeacherDelete from "./TeacherDelete";
import TeacherAdminAuthority from "./TeacherAdminAuthority";

const TeacherViewTable = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [selectedDeleteTeacher, setSelectedDeleteTeacher] = useState()
    const [selectedUpdateTeacher, setSelectedUpdateTeacher] = useState()
    const [selectedAuthorityTeacher, setSelectedAuthorityTeacher] = useState()
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openAuthorityModal, setOpenAuthorityModal] = useState(false)
    const [teachers, setTeachers] = useState([])
    const searchInput = useRef(null)
    const dispatch = useDispatch()
    const {Text} = Typography

    useEffect(() => {
        dispatch(getAllUsers())
            .then((getAll) => {
                if (getAll?.meta?.requestStatus === 'fulfilled') {
                    if (getAll?.payload?.status === 'success') {
                        const response = getAll.payload.data
                        const filteredUsers = response
                            .filter((item) => item.role === "teacher" || item.role === "admin")
                        setTeachers(filteredUsers)
                    } else {
                        console.log(getAll.payload.message)
                    }
                } else {
                    throw new Error('Teachers Get All request failed')
                }
            }).catch((err) => {
            console.error(err)
        })
    }, [dispatch])

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (data) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) =>
            (
                <div
                    style={{
                        padding: 8
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        ref={searchInput}
                        value={selectedKeys[0]}
                        placeholder={data.title}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, data.dataIndex)
                        }
                        style={{
                            marginBottom: 8,
                            display: 'block'
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, data.dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{
                                width: 90,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            Ara
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{
                                width: 90
                            }}
                        >
                            Temizle
                        </Button>
                    </Space>
                </div>
            ),
        filterIcon: (filtered) =>
            (
                <SearchOutlined
                    style={{
                        color: filtered ? '#1890ff' : undefined
                    }}
                />
            ),
        onFilter: (value, record) =>
            record[data.dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) =>
            searchedColumn === data.dataIndex ?
                (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#1E90FF',
                            color: 'white',
                            padding: 3,
                            borderRadius: 5
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                )
                :
                (
                    text
                )
    })

    const columns = [
        {
            title: 'Telefon Numarası',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '20%',
            ...getColumnSearchProps({
                dataIndex: 'phoneNumber',
                title: 'Telefon Numarası'
            })
        },
        {
            title: 'Öğretmen Adı',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps({
                dataIndex: 'name',
                title: 'Öğretmen Adı'
            })
        },
        {
            title: 'Öğretmen Soyadı',
            dataIndex: 'surname',
            key: 'surname',
            width: '20%',
            ...getColumnSearchProps({
                dataIndex: 'surname',
                title: 'Öğretmen Soyadı'
            })
        },
        {
            title: 'Öğretmen E-Posta',
            dataIndex: 'email',
            key: 'email',
            width: '30%',
            ...getColumnSearchProps({
                dataIndex: 'email',
                title: 'Öğretmen E-Posta'
            })
        },
        {
            title: 'Kullanıcı Yetki',
            dataIndex: 'role',
            key: 'role',
            width: '10%',
            ...getColumnSearchProps({
                dataIndex: 'role',
                title: 'Kullanıcı Yetkisi'
            })
        },
        {
            title: 'Olaylar',
            key: 'actions',
            width: '10%',
            render: (teacher) => (
                <Row
                    gutter={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'nowrap'
                    }}
                >
                    <Col>
                        <Button
                            icon={<FiEdit
                                style={{
                                    fontSize: 18
                                }}
                            />}
                            type="primary"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onClick={() => {
                                setOpenUpdateModal(true)
                                setSelectedUpdateTeacher(teacher)
                            }}
                        />
                    </Col>
                    <Col>
                        <Button
                            icon={<DeleteOutlined
                                style={{
                                    fontSize: 16
                                }}
                            />}
                            type="primary"
                            danger
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onClick={() => {
                                setOpenDeleteModal(true)
                                setSelectedDeleteTeacher(teacher)
                            }}
                        />
                    </Col>
                    <Col>
                        <Button
                            icon={<FontColorsOutlined
                                style={{
                                    fontSize: 16
                                }}
                            />}
                            type="primary"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontFamily: 'open sans',
                                backgroundColor: 'green'
                            }}
                            onClick={() => {
                                setOpenAuthorityModal(true)
                                setSelectedAuthorityTeacher(teacher)
                            }}
                        />
                    </Col>
                </Row>
            )
        }
    ]

    const convertToTR = (role) => {
        if (role === "teacher") {
            return "Öğretmen"
        } else if (role === "admin") {
            return "Admin"
        }
    }

    const filterData = useMemo(() => {
        return teachers.map(
            (item) => (
                {
                    key: item._id,
                    phoneNumber: item.phoneNumber,
                    name: item.name,
                    surname: item.surname,
                    email: item.email,
                    role: convertToTR(item.role)
                }
            )
        )
    }, [teachers])

    return (
        <Card
            style={{
                border: '1px solid #d9d9d9',
                backgroundColor: '#F6F9FF'
            }}
        >
            {
                teachers.length !== 0 ? (
                        <>
                            <Table
                                bordered="true"
                                loading="true"
                                style={{
                                    width: '100%',
                                    fontFamily: 'open sans'
                                }}
                                size="small"
                                scroll={{
                                    x: '100%'
                                }}
                                pagination={{
                                    pageSize: 5
                                }}
                                columns={columns}
                                dataSource={filterData}
                            />
                            <TeacherUpdateForm
                                openUpdateModal={openUpdateModal}
                                setOpenUpdateModal={setOpenUpdateModal}
                                selectedUpdateTeacher={selectedUpdateTeacher}
                            />
                            <TeacherDelete
                                openDeleteModal={openDeleteModal}
                                setOpenDeleteModal={setOpenDeleteModal}
                                selectedDeleteTeacher={selectedDeleteTeacher}
                            />
                            <TeacherAdminAuthority
                                openAuthorityModal={openAuthorityModal}
                                setOpenAuthorityModal={setOpenAuthorityModal}
                                selectedAuthorityTeacher={selectedAuthorityTeacher}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'open sans',
                                    fontWeight: 600,
                                    color: '#899BBD'
                                }}
                            >
                                {`${teachers.length} adet öğretmen kaydı mevcut`}
                            </Text>
                        </>
                    )
                    :
                    (
                        <Space
                            direction="vertical"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Alert
                                message="Herhangi bir öğretmen kaydı bulunmamaktadır."
                                type="info"
                                showIcon
                                style={{
                                    fontFamily: 'open sans'
                                }}
                            />
                        </Space>
                    )
            }
        </Card>
    )
}

export default TeacherViewTable
