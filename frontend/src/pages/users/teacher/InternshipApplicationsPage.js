import axios from "axios";
import TeacherHeader from "../../../components/Teacher/TeacherHeader";
import TeacherAside from "../../../components/Teacher/TeacherAside";
import TeacherFooter from "../../../components/Teacher/TeacherFooter";
import InternshipApplicationsTable from "../../../components/Teacher/InternshipApplicationsTable";
axios.defaults.withCredentials = true;

const InternshipApplicationsPage = () => {
  return (
    <>
      <TeacherHeader />
      <TeacherAside />

    <main id="main" className="main">
      <section className="section">

        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body pt-3 d-flex flex-column align-items-center">
                <InternshipApplicationsTable/>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </main>

      <TeacherFooter />
    </>
  );
};

export default InternshipApplicationsPage;
