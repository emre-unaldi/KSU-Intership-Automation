import React from 'react'
import StudentHeader from '../../../../components/Student/StudentHeader'
import StudentAside from '../../../../components/Student/StudentAside'
import StudentFooter from '../../../../components/Student/StudentFooter'
import InternshipApplicationStatus from '../../../../components/Student/internshipForm/InternshipApplicationStatus'
import VarietySelection from '../../../../components/Student/internshipForm/VarietySelection'

const SelectionPage = () => {
  return (
    <>
      <StudentHeader />
      <StudentAside />
      <main id="main" className="main">
        <section className="section">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body pt-3 d-flex flex-column align-items-center">
                  <InternshipApplicationStatus path={'selection'} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body d-flex flex-column align-items-center">
                  <VarietySelection />
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

export default SelectionPage
