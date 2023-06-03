import { useEffect, useRef, useState } from 'react'
import { Button, Input, Space, Table, Tag, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllUserAndInternships } from '../../../redux/userSlice'
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import ViewStudentCompany from './ViewStudentCompany'

const StudentsViewTable = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [userIds, setUserIds] = useState([])
    const [selectedInternshipId, setSelectedInternshipId] = useState()
    const searchInput = useRef(null)
    const dispatch = useDispatch()
    const { Title } = Typography

    useEffect(() => {
        dispatch(getAllUserAndInternships())
            .then(async (getAll) => {
                if (getAll?.meta?.requestStatus === 'fulfilled') {
                    if (getAll?.payload?.status === 'success') {
                        const response = await getAll.payload.data
                        const userIds = await response.map((user) => 
                            user.internships.filter((internship) =>
                                internship.companyApprovalUpdate === true)
                            )
                            .flat()
                            .map((internship) => internship.studentID)
                            .filter((item, index, userId) => userId.indexOf(item) === index)
                        setUserIds(userIds)
                        setUsers(response)
                    } else {
                        throw new Error(getAll.payload.message)
                    }
                } else {
                    throw new Error('Failed request to fetch user and internships')
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }, [dispatch])

    const tagIconStyle = {
        fontSize: '14px'
    }

    const tagStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        padding: 5,
        margin: 5,
        fontFamily: 'open sans'
    }

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
                            alignItems: 'center',
                            fontFamily: 'open sans'
                        }}
                    >
                        Ara
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        type='primary'
                        size="small"
                        style={{
                            width: 90,
                            backgroundColor: "red",
                            fontFamily: 'open sans'
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
                        backgroundColor: '#ffc069',
                        padding: 0,
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
            dataIndex: 'schollNumber',
            key: 'schollNumber',
            ...getColumnSearchProps({
                dataIndex: 'schollNumber',
                title: 'Öğrenci Numarası'
            })
        },
        {
            title: 'Öğrenci Adı',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps({ 
                dataIndex: 'name', 
                title: 'Öğrenci Adı' 
            })
        },
        {
            title: 'Öğrenci Soyadı',
            dataIndex: 'surname',
            key: 'surname',
            ...getColumnSearchProps({
                dataIndex: 'surname',
                title: 'Öğrenci Soyadı'
            })
        },
        {
            title: 'Staj Türü',
            dataIndex: 'internshipVariety',
            key: 'internshipVariety',
            ...getColumnSearchProps({
                dataIndex: 'internshipVariety',
                title: 'Staj Türü'
            })
        },
        {
            title: 'Staj Onayı',
            dataIndex: 'internshipApproval',
            key: 'internshipApproval',
            ...getColumnSearchProps({
                dataIndex: 'internshipApproval',
                title: 'Staj Onayı'
            })
        },
        {
            title: 'Staj Durumu',
            dataIndex: 'internshipStatus',
            key: 'internshipStatus',
            ...getColumnSearchProps({
                dataIndex: 'internshipStatus',
                title: 'Staj Durumu'
            })
        },
        {
        title: 'İş Yeri',
        key: 'company',
        render: (internship) => 
            (
                <Tag
                    color={'blue'}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontFamily: 'open sans',
                        fontSize: 14,
                        padding: 5
                    }}
                    onClick={() => {
                        setOpen(true)
                        setSelectedInternshipId(internship.key)
                    }}
                >
                    <span>Görüntüle</span>
                </Tag>
            )
        }
    ]

    const internshipApprovalCheck = (companyApproval,companyApprovalUpdate,consultantApproval,consultantApprovalUpdate) => {
        if (companyApprovalUpdate) {
            if (companyApproval) {
                if (consultantApprovalUpdate) {
                    if (consultantApproval) {
                        return [
                            <CheckCircleOutlined style={tagIconStyle} />,
                            'success',
                            'Üniversite Onayladı'
                        ]
                    } else {
                        return [
                            <CloseCircleOutlined style={tagIconStyle} />,
                            'error',
                            'Üniversite Reddetti'
                        ]
                    }
                } else {
                    return [
                        <ClockCircleOutlined style={tagIconStyle} />,
                        'default',
                        'Üniversite Bekleniyor'
                    ]
                }
            } else {
                return [
                    <CloseCircleOutlined style={tagIconStyle} />,
                    'error',
                    'Şirket Reddetti'
                ]
            }
        } else {
            return [
                <ClockCircleOutlined style={tagIconStyle} />,
                'default',
                'Şirket Bekleniyor'
            ]
        }
    }

    const internshipStatusCheck = (internshipDateRange, companyApproval,consultantApproval) => {
        if (companyApproval && consultantApproval) {
            const internshipStartDate = new Date(internshipDateRange[0])
            const internshipEndDate = new Date(internshipDateRange[1])
            const currentDateTime = new Date()
        
            const internshipDoingCondition = internshipStartDate <= currentDateTime && internshipEndDate >= currentDateTime
            const internshipWaitingCondition = internshipStartDate > currentDateTime
            const internshipFinishingCondition = internshipEndDate < currentDateTime
        
            if (internshipWaitingCondition) {
                return [
                    <ClockCircleOutlined style={tagIconStyle} />,
                    'default',
                    'Staj bekleniyor'
                ]
            } else if (internshipDoingCondition) {
                return [
                    <SyncOutlined spin style={tagIconStyle} />,
                    'processing',
                    'Staj yapılıyor'
                ]
            } else if (internshipFinishingCondition) {
                return [
                    <CheckCircleOutlined style={tagIconStyle} />,
                    'success',
                    'Staj tamamlandı'
                ]
            }
        } else {
            return [
                <ClockCircleOutlined style={tagIconStyle} />,
                'warning',
                'Staj Pasif'
            ]
        }
    }

    const tagItemInternshipStatusContent = (internshipStatus) => {
        return (
            <Tag
                icon={internshipStatus[0]}
                color={internshipStatus[1]}
                style={tagStyle}
            >
                {internshipStatus[2]}
            </Tag>
        )
    }

    const convertToTR = (internshipSelection) => {
        if (internshipSelection === 'software') {
        return 'Yazılım'
        } else if (internshipSelection === 'hardware') {
        return 'Donanım'
        } else {
        return 'UME'
        }
    }

    const filteredData = users
        .filter((user) => userIds.includes(user._id))
        .flatMap((user) => user.internships
            .filter((item) => item.companyApprovalUpdate === true)
            .map((item) => 
                (
                    {
                        key: item._id,
                        schollNumber: user.schoolNumber,
                        name: user.name,
                        surname: user.surname,
                        internshipVariety: convertToTR(item.internship),
                        internshipApproval: tagItemInternshipStatusContent(
                            internshipApprovalCheck(
                                item.companyApproval,
                                item.companyApprovalUpdate,
                                item.consultantApproval,
                                item.consultantApprovalUpdate
                            )
                        ),
                        internshipStatus: tagItemInternshipStatusContent(
                            internshipStatusCheck(
                                item.internshipDateRange,
                                item.companyApproval,
                                item.consultantApproval
                            )
                        )
                    }
                )
            )
        )

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
                Stajyer Öğrenciler
            </Title>
            <Table
                bordered="true"
                loading="true"
                style={{ 
                    width: '100%',
                    fontFamily: 'open sans',
                }}
                size="small"
                scroll={{
                    x: '100%'
                }}
                pagination={{
                    pageSize: 10
                }}
                columns={columns}
                dataSource={filteredData}
            />
            <ViewStudentCompany
                open={open}
                setOpen={setOpen}
                selectedInternshipId={selectedInternshipId}
            />
        </>
    )
}

export default StudentsViewTable
