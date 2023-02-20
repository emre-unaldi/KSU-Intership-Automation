import { useSelector } from "react-redux";
import axios from "axios";
import StudentRegisterForm from "../../../components/Form/StudentRegisterForm";
import TeacherRegisterForm from "../../../components/Form/TeacherRegisterForm";
import ksuLogo from "../../../assets/img/ksu.png";
axios.defaults.withCredentials = true;

const UserRegister = () => {
  const ksuLink = useSelector((state) => state.system.ksuLink);

  return (
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-3">
                    <a
                      href={ksuLink}
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src={ksuLogo} alt="" />
                      <span className="d-none d-lg-block">KSÜ</span>
                    </a>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-1 pb-1">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Hesap Oluştur
                        </h5>
                        <p className="text-center small">
                          Hesap oluşturmak için kişisel bilgilerinizi giriniz.
                        </p>
                      </div>
                      <ul className="nav nav-tabs nav-tabs-bordered d-flex">
                        <li className="nav-item flex-fill">
                          <button
                            className="nav-link active w-100"
                            data-bs-toggle="tab"
                            data-bs-target="#student-create-account"
                          >
                            Öğrenci Kayıt
                          </button>
                        </li>
                        <li className="nav-item flex-fill">
                          <button
                            className="nav-link w-100"
                            data-bs-toggle="tab"
                            data-bs-target="#teacher-create-account"
                          >
                            Öğretmen Kayıt
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <StudentRegisterForm />
                        <TeacherRegisterForm />
                      </div>
                    </div>
                  </div>
                  <div className="credits" align="center">
                    Tüm Hakları Saklıdır © 2022 <br />
                    <a href={ksuLink}>Kahramanmaraş Sütçü İmam Üniversitesi</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
};

export default UserRegister;
