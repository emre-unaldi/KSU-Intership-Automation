import { useEffect, useState } from 'react'
import axios from 'axios'
import StudentHeader from '../../components/Student/Layouts/StudentHeader'
import StudentAside from '../../components/Student/Layouts/StudentAside'
import StudentFooter from '../../components/Student/Layouts/StudentFooter'
import StudentHome from '../../components/Student/StudentHome/StudentHome'
import Loading from '../../components/System/Loading'
axios.defaults.withCredentials = true

const HomePage = () => {
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
                    <StudentHome />
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

export default HomePage
