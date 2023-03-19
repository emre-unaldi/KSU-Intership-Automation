import { useRef, useState } from "react";
import {Button, Input, Space, Table, Tag, Typography, Modal, message} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ViewCompanyStudentApplied from "./ViewCompanyStudentApplied";

const InternshipApplicationsTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const searchInput = useRef(null);
  const { Title } = Typography;

  const modalHandleOk = () => {
    messageApi
      .open({
        type: "loading",
        content: "İşlem Kaydediliyor...",
        duration: 2,
      })
      .then(() => setOpen(false))
      .then(() => message.success("Staj Başvurusu Onaylandı", 2))
  }

  const modalHandleCancel = () => {
    messageApi
      .open({
        type: "loading",
        content: "İşlem Kaydediliyor...",
        duration: 2,
      })
      .then(() => setOpen(false))
      .then(() => message.error("Staj Başvurusu Reddedildi", 2))
  }

  const data = [
    {
      key: "1",
      schollNumber: 19110131045,
      applicationDate: "12-12-2022",
      name: "John",
      surname: "Brown",
      class: 2
    },
    {
      key: "2",
      schollNumber: 19110131046,
      applicationDate: "12-11-2022",
      name: "Joe",
      surname: "Black",
      class: 2
    },
    {
      key: "3",
      schollNumber: 19110131047,
      applicationDate: "10-12-2022",
      name: "Jim",
      surname: "Green",
      class: 3
    },
    {
      key: "4",
      schollNumber: 19110131048,
      applicationDate: "11-12-2022",
      name: "Jim",
      surname: "Red",
      class: 4
    },
  ]

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText("")
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
          padding: 8,
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
            display: "block"
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
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
          color: filtered ? "#1890ff" : undefined,
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
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === data.dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  })

  const columns = [
    {
      title: "Öğrenci Numarası",
      dataIndex: "schollNumber",
      key: "schollNumber",
      ...getColumnSearchProps({ dataIndex: "schollNumber", title: "Öğrenci Numarası" })
    },
    {
      title: "Öğrenci Adı",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps({ dataIndex: "name", title: "Öğrenci Adı" })
    },
    {
      title: "Öğrenci Soyadı",
      dataIndex: "surname",
      key: "surname",
      ...getColumnSearchProps({ dataIndex: "surname", title: "Öğrenci Soyadı" })
    },
    {
      title: "Öğrenci Sınıfı",
      dataIndex: "class",
      key: "class",
      ...getColumnSearchProps({ dataIndex: "class", title: "Öğrenci Sınıfı" })
    },
    {
      title: "Başvuru Tarihi",
      dataIndex: "applicationDate",
      key: "applicationDate",
      ...getColumnSearchProps({ dataIndex: "applicationDate", title: "Başvuru Tarihi" })
    },
    {
      title: "İş Yeri",
      key: "company",
      render: () => (
        <Tag
          color={"geekblue"}
          style={{
            cursor: "pointer",
            padding: "3px 6px",
          }}
          onClick={() => setOpen(true)}
        >
          <span>{"Görüntüle".toUpperCase()}</span>
        </Tag>
      )
    }
  ]

  return (
    <>
      {contextHolder}
      <Title 
        className="card-title" 
        style={{ 
          textAlign: "center", 
          color: "#193164" 
        }} 
        level={4}
      >
        Danışman Onayı Bekleyen Öğrenciler
      </Title>
      <Table
        bordered="true"
        loading="true"
        style={{ width: "100%" }}
        size="small"
        scroll={{
          x: "100%",
        }}
        columns={columns}
        dataSource={data}
      />
      <Modal
        centered
        open={open}
        width={600}
        onCancel={() => {
          setOpen(false);
        }}
        footer={[
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              style={{
                width: 100
              }}
              key="back"
              type="default"
              onClick={modalHandleCancel}
              value
            >
              Reddet
            </Button>
            <Button
              style={{
                width: 100
              }}
              key="submit"
              type="primary"
              onClick={modalHandleOk}
            >
              Onayla
            </Button>
          </Space>
        ]}
      >
        <ViewCompanyStudentApplied />
      </Modal>
    </>
  )
}

export default InternshipApplicationsTable;
