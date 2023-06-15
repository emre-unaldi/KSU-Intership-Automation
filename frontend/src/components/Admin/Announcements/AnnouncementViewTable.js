import { useEffect, useRef, useState } from 'react'
import { Alert, Button, Card, Col, Input, Row, Space, Table } from 'antd'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import Highlighter from 'react-highlight-words'
import { getAllAnnouncements } from '../../../redux/announcementSlice'
import AnnouncementUpdateForm from './AnnouncementUpdateForm'
import AnnouncementDelete from './AnnouncementDelete'

const AnnouncementViewTable = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [selectedAnnouncement, setSelectedAnnouncement] = useState()
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [announcements, setAnnouncements] = useState([])
    const searchInput = useRef(null)
    const dispatch = useDispatch()

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
            title: 'Duyuru Başlık',
            dataIndex: 'title',
            key: 'title',
            width: '15%',
            ...getColumnSearchProps({ 
                dataIndex: 'title', 
                title: 'Duyuru Başlık' 
            })
        },
        {
            title: 'Duyuru İçerik',
            dataIndex: 'content',
            key: 'content',
            width: '30%',
            ...getColumnSearchProps({
                dataIndex: 'content',
                title: 'Duyuru İçerik'
            })
        },
        {
            title: 'Duyuru Türü',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            ...getColumnSearchProps({
                dataIndex: 'type',
                title: 'Duyuru Türü'
            })
        },
        {
            title: 'Oluşturulma Tarihi',
            dataIndex: 'createdDate',
            key: 'createdDate',
            width: '15%',
            ...getColumnSearchProps({
                dataIndex: 'createdDate',
                title: 'Oluşturulma Tarihi'
            })
        },
        {
            title: 'Güncellenme Tarihi',
            dataIndex: 'updatedDate',
            key: 'updatedDate',
            width: '15%',
            ...getColumnSearchProps({
                dataIndex: 'updatedDate',
                title: 'Güncellenme Tarihi'
            })
        },
        {
            title: 'Olaylar',
            key: 'actions',
            width: '10%',
            render: (announcement) => (
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
                                setSelectedAnnouncement(announcement)
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
                                setSelectedAnnouncement(announcement)
                            }}
                        />
                    </Col>
                </Row>
            )
        }
    ]

    const formatDate = (dateValue) => {
        const date = new Date(dateValue)
        const day = date.getUTCDate().toString().padStart(2, '0')
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
        const year = date.getUTCFullYear().toString()
        const hour = parseInt(date.getUTCHours().toString().padStart(2, '0')) + 3
        const minute = date.getUTCMinutes().toString().padStart(2, '0')
        const second = date.getUTCSeconds().toString().padStart(2, '0')
        const dateTime = `${day}/${month}/${year} - ${hour}:${minute}:${second}`
    
        return dateTime
    }

    const filterData = announcements.map(
        (item) => (
            {
                key: item._id,
                title: item.title,
                content: item.content,
                type: item.type,
                createdDate: formatDate(item.createdAt),
                updatedDate: formatDate(item.updatedAt)
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
                announcements.length !== 0 ? (
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
                        <AnnouncementUpdateForm 
                            openUpdateModal={openUpdateModal}
                            setOpenUpdateModal={setOpenUpdateModal}
                            selectedAnnouncement={selectedAnnouncement}
                        />
                        <AnnouncementDelete
                            openDeleteModal={openDeleteModal}
                            setOpenDeleteModal={setOpenDeleteModal}
                            selectedAnnouncement={selectedAnnouncement}
                        />
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
                            message="Herhangi bir duyuru kaydı bulunmamaktadır." 
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

export default AnnouncementViewTable
