import { useEffect, useState } from 'react'
import { Steps } from 'antd'
import {
  CheckSquareFilled,
  IdcardFilled,
  MailFilled,
  ProfileFilled,
  ReconciliationFilled,
} from '@ant-design/icons'

const InternshipStatus = ({ path }) => {
  const [status, setStatus] = useState(['wait', 'wait', 'wait', 'wait', 'wait'])

  useEffect(() => {
    if (path === 'selection') {
      setStatus(['process', 'wait', 'wait', 'wait', 'wait'])
    } else if (path === 'instructions') {
      setStatus(['finish', 'process', 'wait', 'wait', 'wait'])
    } else if (path === 'companyInformation') {
      setStatus(['finish', 'finish', 'process', 'wait', 'wait'])
    } else if (path === 'companyApprovalWait') {
      setStatus(['finish', 'finish', 'finish', 'process', 'wait'])
    } else if (path === 'consultantApprovalWait') {
      setStatus(['finish', 'finish', 'finish', 'finish', 'process'])
    }
  }, [path])

  return (
    <Steps
      items={[
        {
          title: 'Staj Seçimi',
          status: status[0],
          icon: <ProfileFilled />
        },
        {
          title: 'Staj İlkeleri',
          status: status[1],
          icon: <CheckSquareFilled />
        },
        {
          title: 'Şirket Bilgileri',
          status: status[2],
          icon: <MailFilled />
        },
        {
          title: 'Şirket Onayı',
          status: status[3],
          icon: <IdcardFilled />
        },
        {
          title: 'Danışman Onayı',
          status: status[4],
          icon: <ReconciliationFilled />
        }
      ]}
      style={{
        fontFamily: 'open sans',
        paddingTop: 20
      }}
    />
  )
}

export default InternshipStatus
