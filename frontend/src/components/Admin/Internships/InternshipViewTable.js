import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Alert, Button, Card, Col, Input, Row, Space, Table, Typography} from 'antd'
import {DeleteOutlined, MailOutlined, SearchOutlined} from '@ant-design/icons'
import {FiEdit} from 'react-icons/fi'
import {useDispatch} from 'react-redux'
import Highlighter from 'react-highlight-words'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {getAllInternships} from "../../../redux/internshipSlice";
import InternshipUpdateForm from "./InternshipUpdateForm";
import InternshipDelete from "./InternshipDelete";
import InternshipSendEmail from "./InternshipSendEmail";

dayjs.extend(customParseFormat)
const InternshipViewTable = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [selectedUpdateInternship, setSelectedUpdateInternship] = useState()
    const [selectedDeleteInternship, setSelectedDeleteInternship] = useState()
    const [selectedSendEmailInternship, setSelectedSendEmailInternship] = useState()
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openSendEmailModal, setOpenSendEmailModal] = useState(false)
    const [internships, setInternships] = useState([])
    const searchInput = useRef(null)
    const dispatch = useDispatch()
    const {Text} = Typography

    useEffect(() => {
        dispatch(getAllInternships())
            .then((getAll) => {
                if (getAll?.meta?.requestStatus === 'fulfilled') {
                    if (getAll?.payload?.status === 'success') {
                        setInternships(getAll.payload.data)
                    } else {
                        console.log(getAll.payload.message)
                    }
                } else {
                    throw new Error('Internships Get All request failed')
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
            title: 'İş Yeri Adı',
            dataIndex: 'companyName',
            key: 'companyName',
            ...getColumnSearchProps({
                dataIndex: 'companyName',
                title: 'İş Yeri Adı'
            })
        },
        {
            title: 'İş Yeri E-Posta',
            dataIndex: 'companyEmail',
            key: 'companyEmail',
            ...getColumnSearchProps({
                dataIndex: 'companyEmail',
                title: 'İş Yeri E-Posta'
            })
        },
        {
            title: 'İş Yeri Numarası',
            dataIndex: 'companyPhone',
            key: 'companyPhone',
            ...getColumnSearchProps({
                dataIndex: 'companyPhone',
                title: 'İş Yeri Numarası'
            })
        },
        {
            title: 'Yetkili Adı',
            dataIndex: 'companyResponsibleName',
            key: 'companyResponsibleName',
            ...getColumnSearchProps({
                dataIndex: 'companyResponsibleName',
                title: 'Yetkili Adı'
            })
        },
        {
            title: 'Yetkili Soyadı',
            dataIndex: 'companyResponsibleSurname',
            key: 'companyResponsibleSurname',
            ...getColumnSearchProps({
                dataIndex: 'companyResponsibleSurname',
                title: 'Yetkili Soyadı'
            })
        },
        {
            title: 'Personel Sayısı',
            dataIndex: 'companyPersonalCount',
            key: 'companyPersonalCount',
            ...getColumnSearchProps({
                dataIndex: 'companyPersonalCount',
                title: 'Personel Sayısı'
            })
        },
        {
            title: 'Vergi Numarası',
            dataIndex: 'companyTaxNumber',
            key: 'companyTaxNumber',
            ...getColumnSearchProps({
                dataIndex: 'companyTaxNumber',
                title: 'Vergi Numarası'
            })
        },
        {
            title: 'İş Yeri Adresi',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            ...getColumnSearchProps({
                dataIndex: 'companyAddress',
                title: 'İş Yeri Adresi'
            })
        },
        {
            title: 'Staj Türü',
            dataIndex: 'internship',
            key: 'internship',
            ...getColumnSearchProps({
                dataIndex: 'internship',
                title: 'Staj Türü'
            })
        },
        {
            title: 'Staj Tarih Aralığı',
            dataIndex: 'internshipDateRange',
            key: 'internshipDateRange',
            ...getColumnSearchProps({
                dataIndex: 'internshipDateRange',
                title: 'Staj Tarih Aralığı'
            })
        },
        {
            title: 'Olaylar',
            key: 'actions',
            render: (internship) => (
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
                                const dateRange = internship?.internshipDateRange.split(" - ")
                                setOpenUpdateModal(true)
                                setSelectedUpdateInternship({
                                    ...internship,
                                    dateRange
                                })
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
                                setSelectedDeleteInternship(internship)
                            }}
                        />
                    </Col>
                    <Col>
                        <Button
                            icon={<MailOutlined
                                style={{
                                    fontSize: 16
                                }}
                            />}
                            type="primary"
                            danger
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'green'
                            }}
                            onClick={() => {
                                setOpenSendEmailModal(true)
                                setSelectedSendEmailInternship(internship)
                            }}
                        />
                    </Col>
                </Row>
            )
        }
    ]

    const formatDate = (dateRange) => {
        const startDate = dayjs(dateRange[0]).format('DD/MM/YYYY')
        const endDate = dayjs(dateRange[1]).format('DD/MM/YYYY')

        return `${startDate} - ${endDate}`
    }

    const convertToTR = (internship) => {
        if (internship === "software") {
            return "Yazılım"
        } else if (internship === "hardware") {
            return "Donanım"
        } else {
            return "UME"
        }
    }

    const filterData = useMemo(() => {
        return internships.map(
            (item) => (
                {
                    key: item._id,
                    studentID: item.studentID,
                    companyName: item.companyName,
                    companyEmail: item.companyEmail,
                    companyPhone: item.companyPhone,
                    companyResponsibleName: item.companyResponsibleName,
                    companyResponsibleSurname: item.companyResponsibleSurname,
                    companyPersonalCount: item.companyPersonalCount,
                    companyTaxNumber: item.companyTaxNumber,
                    companyAddress: item.companyAddress,
                    internshipDateRange: item.internshipDateRange && formatDate(item.internshipDateRange),
                    internship: convertToTR(item.internship)
                }
            )
        )
    }, [internships])

    return (
        <Card
            style={{
                border: '1px solid #d9d9d9',
                backgroundColor: '#F6F9FF'
            }}
        >
            {
                internships.length !== 0 ? (
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
                            <InternshipUpdateForm
                                openUpdateModal={openUpdateModal}
                                setOpenUpdateModal={setOpenUpdateModal}
                                selectedUpdateInternship={selectedUpdateInternship}
                            />
                            <InternshipDelete
                                openDeleteModal={openDeleteModal}
                                setOpenDeleteModal={setOpenDeleteModal}
                                selectedDeleteInternship={selectedDeleteInternship}
                            />
                            <InternshipSendEmail
                                openSendEmailModal={openSendEmailModal}
                                setOpenSendEmailModal={setOpenSendEmailModal}
                                selectedSendEmailInternship={selectedSendEmailInternship}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'open sans',
                                    fontWeight: 600,
                                    color: '#899BBD'
                                }}
                            >
                                {`${internships.length} adet staj kaydı mevcut`}
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
                                message="Herhangi bir staj kaydı bulunmamaktadır."
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

export default InternshipViewTable
