import React, { useEffect, useState } from 'react'
import StudentHeader from '../../../../components/Student/StudentHeader'
import StudentAside from '../../../../components/Student/StudentAside'
import StudentFooter from '../../../../components/Student/StudentFooter'
import InternshipApplicationStatus from '../../../../components/Student/internshipForm/InternshipApplicationStatus'
import Instructions from '../../../../components/Student/internshipForm/Instructions'
import Loading from '../../../../components/System/Loading'

const InstructionsPage = () => {
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
                          <InternshipApplicationStatus path={'instructions'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-body">
                          <Instructions />
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

export default InstructionsPage
