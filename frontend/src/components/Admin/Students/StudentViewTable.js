import React, { useEffect, useRef, useState } from 'react'
import {Alert, Button, Card, Col, Input, Row, Space, Table, Typography} from 'antd'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import Highlighter from 'react-highlight-words'
import StudentUpdateForm from "./StudentUpdateForm";
import StudentDelete from "./StudentDelete";
import {getAllUsers} from "../../../redux/userSlice";
const StudentViewTable = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [selectedStudent, setSelectedStudent] = useState()
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [students, setStudents] = useState([])
    const searchInput = useRef(null)
    const dispatch = useDispatch()
    const { Text } = Typography

    useEffect(() => {
        dispatch(getAllUsers())
            .then((getAll) => {
                if (getAll?.meta?.requestStatus === 'fulfilled') {
                    if (getAll?.payload?.status === 'success') {
                        const response = getAll.payload.data
                        const filteredUsers = response.filter((item) => item.role === "student")
                        setStudents(filteredUsers)
                    } else {
                        console.log(getAll.payload.message)
                    }
                } else {
                    throw new Error('Students Get All request failed')
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
        filterDropdown: ({setSelectedKeys,selectedKeys,confirm,clearFilters}) =>
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
                            icon={<SearchOutlined />}
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
            title: 'Öğrenci Numarası',
            dataIndex: 'schoolNumber',
            key: 'schoolNumber',
            width: '20%',
            ...getColumnSearchProps({
                dataIndex: 'schoolNumber',
                title: 'Öğrenci Numarası'
            })
        },
        {
            title: 'Öğrenci Adı',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps({
                dataIndex: 'name',
                title: 'Öğrenci Adı'
            })
        },
        {
            title: 'Öğrenci Soyadı',
            dataIndex: 'surname',
            key: 'surname',
            width: '20%',
            ...getColumnSearchProps({
                dataIndex: 'surname',
                title: 'Öğrenci Soyadı'
            })
        },
        {
            title: 'Öğrenci E-Posta',
            dataIndex: 'email',
            key: 'email',
            width: '30%',
            ...getColumnSearchProps({
                dataIndex: 'email',
                title: 'Öğrenci E-Posta'
            })
        },
        {
            title: 'Olaylar',
            key: 'actions',
            width: '10%',
            render: (student) => (
                <Row
                    gutter={16}
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
                                setSelectedStudent(student)
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
                                setSelectedStudent(student)
                            }}
                        />
                    </Col>
                </Row>
            )
        }
    ]

    const filterData = students.map(
        (item) => (
            {
                key: item._id,
                schoolNumber: item.schoolNumber,
                name: item.name,
                surname: item.surname,
                email: item.email
            }
        )
    )

    return (
        <Card
            style={{
                border: '1px solid #d9d9d9',
                backgroundColor: '#F6F9FF'
            }}
        >
            {
                students.length !== 0 ? (
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
                            <StudentUpdateForm
                                openUpdateModal={openUpdateModal}
                                setOpenUpdateModal={setOpenUpdateModal}
                                selectedStudent={selectedStudent}
                            />
                            <StudentDelete
                                openDeleteModal={openDeleteModal}
                                setOpenDeleteModal={setOpenDeleteModal}
                                selectedStudent={selectedStudent}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'open sans',
                                    fontWeight: 600,
                                    color: '#899BBD'
                                }}
                            >
                                {`${students.length} adet öğrenci kaydı mevcut`}
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
                                message="Herhangi bir öğrenci kaydı bulunmamaktadır."
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

export default StudentViewTable
