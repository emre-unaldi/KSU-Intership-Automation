import React, { useEffect, useState } from 'react'
import StudentHeader from '../../../../components/Student/StudentHeader'
import StudentAside from '../../../../components/Student/StudentAside'
import StudentFooter from '../../../../components/Student/StudentFooter'
import InternshipApplicationStatus from '../../../../components/Student/internshipForm/InternshipApplicationStatus'
import VarietySelection from '../../../../components/Student/internshipForm/VarietySelection'
import Loading from '../../../../components/System/Loading'

const SelectionPage = () => {
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
                          <InternshipApplicationStatus path={'selection'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-body">
                          <VarietySelection />
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

export default SelectionPage
