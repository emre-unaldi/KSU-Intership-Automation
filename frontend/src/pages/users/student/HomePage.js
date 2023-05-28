import { useEffect, useState } from 'react'
import axios from 'axios'
import StudentHeader from '../../../components/Student/StudentHeader'
import StudentAside from '../../../components/Student/StudentAside'
import StudentHomeMain from '../../../components/Student/StudentHomeMain'
import StudentFooter from '../../../components/Student/StudentFooter'
import Loading from '../../../components/System/Loading'
axios.defaults.withCredentials = true

const StudentHome = () => {
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
              <div className="card">
                <div className="card-body">
                {
                  !isPageLoading ? 
                  (
                    <StudentHomeMain />
                  ) 
                  : 
                  (
                    <Loading isPageLoading={isPageLoading} />
                  )
                }
                </div>
              </div>
            </div>
          </section>
        </main>
      <StudentFooter />
    </>
  )
}

export default StudentHome
