import { useEffect, useState } from 'react'
import StudentHeader from '../../components/Student/Layouts/StudentHeader'
import StudentAside from '../../components/Student/Layouts/StudentAside'
import StudentFooter from '../../components/Student/Layouts/StudentFooter'
import InternshipDocuments from '../../components/Student/InternshipDocuments/InternshipDocuments'
import Loading from '../../components/System/Loading'

const InternshipDocumentsPage = () => {
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
                      <InternshipDocuments />
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

export default InternshipDocumentsPage
