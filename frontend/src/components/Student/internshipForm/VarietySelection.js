import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Segmented, Space, Alert, Typography, Button } from 'antd'
import software from '../../../assets/img/software.png'
import hardware from '../../../assets/img/hardware.png'
import ume from '../../../assets/img/ume.png'
import { LoadingOutlined } from '@ant-design/icons'

const VarietySelection = () => {
  const [variety, setVariety] = useState({ description: '', value: '' })
  const [buttonLoading, setButtonLoading] = useState(false)
  const { Title } = Typography
  const navigate = useNavigate()

  const handleLoading = () => {
    localStorage.setItem('internship', variety.value)
    setButtonLoading(true)

    setTimeout(() => {
      setButtonLoading(false)
      navigate('/student/internshipForm/instructions')
    }, 2500)
  }

  const changeValue = (getValue) => {
    getValue === 'software' &&
      setVariety({ description: 'Yazılım', value: getValue })
    getValue === 'hardware' &&
      setVariety({ description: 'Donanım', value: getValue })
    getValue === 'ume' && setVariety({ description: 'UME', value: getValue })
  }

  const options = [
    {
      label: (
        <div style={{ padding: 4, width: '20vw' }}>
          <Avatar
            src={software}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            shape="square"
          />
          <div style={{ color: '#274374', fontFamily: 'open sans' }}>
            <b>Yazılım</b>
          </div>
        </div>
      ),
      value: 'software'
    },
    {
      label: (
        <div style={{ padding: 4, width: '20vw' }}>
          <Avatar
            src={hardware}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            shape="square"
          />
          <div style={{ color: '#274374', fontFamily: 'open sans' }}>
            <b>Donanım</b>
          </div>
        </div>
      ),
      value: 'hardware'
    },
    {
      label: (
        <div style={{ padding: 4, width: '20vw' }}>
          <Avatar
            src={ume}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            shape="square"
          />
          <div style={{ color: '#274374', fontFamily: 'open sans' }}>
            <b>UME</b>
          </div>
        </div>
      ),
      value: 'ume'
    },
  ]
  return (
    <Space
      direction="vertical"
      align="center"
      style={{
        width: '100%',
      }}
    >
      <Title
        className="card-title"
        style={{
          color: '#193164',
          paddingBottom: 0,
          fontFamily: 'open sans',
        }}
        level={3}
      >
        Staj Çeşitleri
      </Title>
      <Segmented
        style={{
          padding: 10,
          fontFamily: 'open sans'
        }}
        options={options}
        defaultValue=""
        onChange={(getValue) => changeValue(getValue)}
      />
      <Alert
        showIcon
        message={
          variety.description
            ? `${variety.description} stajını seçtiniz. Başvuruya devam edebilirsiniz`
            : 'Başvuruya devam etmek için staj türünü seçmelisiniz'
        }
        type={variety.value ? 'success' : 'info'}
        style={{
          padding: '5px 10px',
          fontFamily: 'open sans',
        }}
      />
      <Button
        type="primary"
        size="middle"
        onClick={() => {
          handleLoading()
        }}
        style={{
          fontSize: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'open sans',
        }}
        disabled={variety.value === '' ? true : false}
      >
        Devam Et
        {
          buttonLoading ? 
            <LoadingOutlined/>
            : 
            null
        }
      </Button>
    </Space>
  )
}
export default VarietySelection
