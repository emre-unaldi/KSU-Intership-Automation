import { useRef, useState } from 'react'
import { Button, Col, Input, Row, Space, Table } from 'antd'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { ToastContainer } from 'react-toastify'
import { FiEdit } from 'react-icons/fi'
import Highlighter from 'react-highlight-words'
import AnnouncementUpdate from './AnnouncementUpdate'
import AnnouncementDelete from './AnnouncementDelete'

const AnnouncementViewTable = () => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [selectedAnnouncement, setSelectedAnnouncement] = useState()
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const searchInput = useRef(null)

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
            width: '20%',
            ...getColumnSearchProps({ 
                dataIndex: 'title', 
                title: 'Duyuru Başlık' 
            })
        },
        {
            title: 'Duyuru İçerik',
            dataIndex: 'content',
            key: 'content',
            width: '55%',
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

    const data = [
        {
            key: '1',
            title: 'Tarih Duyurusu',
            content: 'sdlakjgfasdjfkasdkljfaskdljfksladjfksljdafkljasdflaksdfjkldskljf',
            type: 'Tarih',
        },
        {
            key: '2',
            title: 'Ders Duyurusu',
            content: 'lkasdjfadslkşjfasdfolsadlşfkasdlşkfsdaklşfsdafsadfasdfasfd',
            type: 'Ders',
        }
    ]

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
                dataSource={data}
            />
            <AnnouncementUpdate 
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
}

export default AnnouncementViewTable
