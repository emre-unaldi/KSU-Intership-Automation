import { useEffect, useRef, useState } from 'react'
import { Button, Input, Space, Table, Tag, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllUserAndInternships } from '../../redux/userSlice'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import ViewCompanyStudentApplied from './ViewCompanyStudentApplied'

const InternshipApplicationsTable = () => {
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
            const userIds = await getAll.payload.data
              .map((user) =>
                user.internships.filter(
                  (internship) =>
                    internship.companyApproval === true &&
                    internship.consultantApproval === false
                )
              )
              .flat()
              .map((internship) => internship.studentID)
              .filter((item, index, userId) => userId.indexOf(item) === index)
            setUserIds(userIds)
            setUsers(getAll.payload.data)
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
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
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
    filterIcon: (filtered) => (
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
      searchedColumn === data.dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
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
      title: 'Başvurulan Staj',
      dataIndex: 'internshipVariety',
      key: 'internshipVariety',
      ...getColumnSearchProps({
        dataIndex: 'internshipVariety',
        title: 'Başvurulan Staj'
      })
    },
    {
      title: 'Başvuru Tarihi',
      dataIndex: 'applicationDate',
      key: 'applicationDate',
      ...getColumnSearchProps({
        dataIndex: 'applicationDate',
        title: 'Başvuru Tarihi'
      })
    },
    {
      title: 'İş Yeri',
      key: 'company',
      render: (internship) => (
        <Tag
          color={'geekblue'}
          style={{
            cursor: 'pointer',
            padding: '3px 6px'
          }}
          onClick={() => {
            setOpen(true)
            setSelectedInternshipId(internship.key)
          }}
        >
          <span>{'Görüntüle'.toUpperCase()}</span>
        </Tag>
      )
    }
  ]

  const formatDate = (applicationDate) => {
    console.log(applicationDate);
    const date = new Date(applicationDate)
    const day = date.getUTCDate().toString().padStart(2, '0')
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = date.getUTCFullYear().toString()
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    const seconds = date.getUTCSeconds().toString().padStart(2, '0')
    const dateTime = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`

    console.log();

    return dateTime
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

  return (
    <>
      <Title
        className="card-title"
        style={{
          textAlign: 'center',
          color: '#193164'
        }}
        level={4}
      >
        Danışman Onayı Bekleyen Öğrenciler
      </Title>

      <Table
        bordered="true"
        loading="true"
        style={{ width: '100%' }}
        size="small"
        scroll={{
          x: '100%'
        }}
        columns={columns}
        dataSource={users
          .filter((user) => userIds.includes(user._id))
          .flatMap((user) =>
            user.internships
              .filter(
                (item) =>
                  item.companyApproval === true &&
                  item.consultantApproval === false &&
                  item.consultantApprovalUpdate === false
              )
              .map((item) => ({
                key: item._id,
                schollNumber: user.schoolNumber,
                name: user.name,
                surname: user.surname,
                internshipVariety: convertToTR(item.internship),
                applicationDate: formatDate(item.createdAt)
              }))
          )}
      />

      <ViewCompanyStudentApplied
        open={open}
        setOpen={setOpen}
        selectedInternshipId={selectedInternshipId}
      />
    </>
  )
}

export default InternshipApplicationsTable
