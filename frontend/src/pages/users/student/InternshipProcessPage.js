import React from 'react'
import StudentHeader from '../../../components/Student/StudentHeader'
import StudentAside from '../../../components/Student/StudentAside'
import StudentFooter from '../../../components/Student/StudentFooter'
import ViewProcess from '../../../components/Student/internshipProcess/ViewProcess'
import Loading from '../../../components/System/Loading'
import { useEffect, useState } from 'react'

const InternshipProcessPage = () => {
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
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    {
                      !isPageLoading ? 
                      (
                        <ViewProcess />
                      ) 
                      : 
                      (
                        <Loading isPageLoading={isPageLoading} />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      <StudentFooter />
    </>
  )
}

export default InternshipProcessPage
