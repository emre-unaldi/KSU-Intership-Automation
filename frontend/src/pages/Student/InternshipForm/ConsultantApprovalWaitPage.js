import React, { useEffect, useState } from 'react'
import StudentHeader from '../../../components/Student/Layouts/StudentHeader'
import StudentAside from '../../../components/Student/Layouts/StudentAside'
import StudentFooter from '../../../components/Student/Layouts/StudentFooter'
import InternshipApplicationStatus from '../../../components/Student/InternshipForm/InternshipApplicationStatus'
import ConsultantApprovalStatus from '../../../components/Student/InternshipForm/ConsultantApprovalStatus'
import Loading from '../../../components/System/Loading'

const ConsultantApprovalWait = () => {
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false)
    }, 1500)
  }, [])

  return (
    <>
      <StudentHeader />
      <StudentAside />
        <main id="main" className="main">
            <section className="section">
              {
                !isPageLoading ? 
                (
                  <>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-body">
                            <InternshipApplicationStatus path={'consultantApprovalWait'} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-body">
                            <ConsultantApprovalStatus />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
                :
                (
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <Loading isPageLoading={isPageLoading} />
                      </div>
                    </div>
                  </div>
                )
              }        
            </section>
          </main>
      <StudentFooter />
    </>
  )
}

export default ConsultantApprovalWait
