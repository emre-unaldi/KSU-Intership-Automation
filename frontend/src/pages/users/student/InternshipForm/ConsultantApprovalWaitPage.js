import React from 'react'
import StudentHeader from "../../../../components/Student/StudentHeader";
import StudentAside from "../../../../components/Student/StudentAside";
import StudentFooter from "../../../../components/Student/StudentFooter";
import InternshipApplicationStatus from "../../../../components/Student/internshipForm/InternshipApplicationStatus"
import ConsultantApprovalStatus from '../../../../components/Student/internshipForm/ConsultantApprovalStatus';

const ConsultantApprovalWait = () => {
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
                <InternshipApplicationStatus path={"consultantApprovalWait"} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body pt-3 d-flex flex-column align-items-center ">
                <ConsultantApprovalStatus/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <StudentFooter/>
  </>
  )
}

export default ConsultantApprovalWait