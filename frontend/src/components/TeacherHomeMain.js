import React from "react";
import PdfViewer from "../components/PdfViewer";

function TeacherHomeMain() {
  return (
    <main id="main" className="main">
      <section className="section">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-2 d-flex flex-column align-items-center">
                <h2 className="card-title d-flex justify-content-center">
                  Akademik Takvim
                </h2>
                <PdfViewer />
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body pt-3 pb-0 d-flex flex-column align-items-center">
                <div className="alert alert-primary">
                  <i className="bi bi-calendar-week-fill me-1"></i>
                  <b>
                    Staj başvuruları 20.01.2023 tarihinde sonlandırılacaktır.
                    Öğrencilerin staj evraklarını zamanında teslim etmek
                    zorundadır.
                  </b>
                </div>
              </div>
              <div className="card-body pb-0 align-items-center">
                <div className="alert alert-warning">
                  <i className="bi bi-info-square-fill me-1"></i>
                  <b>
                    Öğrencilerin staj evraklarını zamanında teslim etmek
                    zorundadır.
                  </b>
                </div>
              </div>
              <div className="card-body pb-0 align-items-center">
                <div className="alert alert-warning">
                  <i className="bi bi-info-square-fill me-1"></i>
                  <b>
                    Öğrencilerin staj evraklarını zamanında teslim etmek
                    zorundadır.
                  </b>
                </div>
              </div>
              <div className="card-body pb-0 align-items-center">
                <div className="alert alert-warning">
                  <i className="bi bi-info-square-fill me-1"></i>
                  <b>
                    Öğrencilerin staj evraklarını zamanında teslim etmek
                    zorundadır.
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TeacherHomeMain;
