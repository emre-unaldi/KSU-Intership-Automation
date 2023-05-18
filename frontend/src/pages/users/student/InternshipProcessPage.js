import React from 'react'
import StudentHeader from '../../../components/Student/StudentHeader'
import StudentAside from '../../../components/Student/StudentAside'
import StudentFooter from '../../../components/Student/StudentFooter'
import ViewProcess from '../../../components/Student/internshipProcess/ViewProcess'

const InternshipProcessPage = () => {
  return (
    <>
      <StudentHeader />
      <StudentAside />
      <main id="main" className="main">
        <section className="section">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body pt-2 d-flex flex-column align-items-center">
                  <ViewProcess/>
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
