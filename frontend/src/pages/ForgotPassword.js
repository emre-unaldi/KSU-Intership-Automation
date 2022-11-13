import React from "react";
import ksuLogo from "../assets/img/ksu.png";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPassword = () => {
  const ksuLink = "https://www.ksu.edu.tr";

  return (
    <>
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
                      <img src={ksuLogo} alt="ksü logo" />
                      <span className="d-none d-lg-block">KSÜ</span>
                    </a>
                  </div>
                  <ForgotPasswordForm />
                  <div className="credits" align="center">
                    Tüm Hakları Saklıdır © 2022
                    <br />
                    <a href={ksuLink}>Kahramanmaraş Sütçü İmam Üniversitesi</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default ForgotPassword
