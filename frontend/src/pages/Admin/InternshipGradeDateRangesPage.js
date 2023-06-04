import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminHeader from '../../components/Admin/Layouts/AdminHeader'
import AdminAside from '../../components/Admin/Layouts/AdminAside'
import AdminFooter from '../../components/Admin/Layouts/AdminFooter'
import InternshipGradeDateRanges from '../../components/Admin/InternshipGradeDateRanges/InternshipGradeDateRanges'
import Loading from '../../components/System/Loading'
axios.defaults.withCredentials = true

const InternshipGradeDateRangesPage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false)
    }, 1500)
  }, [])

  return (
    <>
      <AdminHeader />
      <AdminAside />
        <main id="main" className="main">
            <section className="section">
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    {
                      !isPageLoading ? 
                      (
                        <InternshipGradeDateRanges />
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
      <AdminFooter />
    </>
  )
}

export default InternshipGradeDateRangesPage
