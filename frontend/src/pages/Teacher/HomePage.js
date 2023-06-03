import { useEffect, useState } from 'react'
import axios from 'axios'
import TeacherHeader from '../../components/Teacher/Layouts/TeacherHeader'
import TeacherAside from '../../components/Teacher/Layouts/TeacherAside'
import TeacherFooter from '../../components/Teacher/Layouts/TeacherFooter'
import TeacherHome from '../../components/Teacher/TeacherHome/TeacherHome'
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
      <TeacherHeader />
      <TeacherAside />
        <main id="main" className="main">
            <section className="section">
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    {
                      !isPageLoading ? 
                      (
                        <TeacherHome />
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
      <TeacherFooter />
    </>
  )
}

export default HomePage
