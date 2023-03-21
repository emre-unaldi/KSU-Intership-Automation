import { useEffect, useState } from "react"
import { Steps } from "antd"
import {CheckSquareFilled, IdcardFilled, MailFilled, ProfileFilled, ReconciliationFilled} from "@ant-design/icons"
import "./internshForm.css"

const InternshipStatus = (props) => {
  const [status, setStatus] = useState(["wait", "wait", "wait", "wait", "wait"])

  useEffect(() => {
    if (props.path === "selection") {
      setStatus(["process", "wait", "wait", "wait", "wait"])
    } else if (props.path === "instructions") {
      setStatus(["finish", "process", "wait", "wait", "wait"])
    } else if (props.path === "companyInformation") {
      setStatus(["finish", "finish", "process", "wait", "wait"])
    } else if (props.path === "companyApprovalWait") {
      setStatus(["finish", "finish", "finish", "process", "wait"])
    } else if (props.path === "consultantApprovalWait") {
      setStatus(["finish", "finish", "finish", "finish", "process"])
    }
  }, [props])

  return (
    <Steps
      items={[
        {
          title: "Staj Seçimi",
          status: status[0],
          icon: <ProfileFilled />
        },
        {
          title: "Staj İlkeleri",
          status: status[1],
          icon: <CheckSquareFilled />
        },
        {
          title: "Şirket Bilgileri",
          status: status[2],
          icon: <MailFilled />
        },
        {
          title: "Şirket Onayı",
          status: status[3],
          icon: <IdcardFilled />
        },
        {
          title: "Danışman Onayı",
          status: status[4],
          icon: <ReconciliationFilled />
        }
      ]}
    />
  )
}

export default InternshipStatus
