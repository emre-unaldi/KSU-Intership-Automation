import React from 'react';
import { Link } from 'react-router-dom';
import ksuLogo from '../assets/img/ksu.png';
import BootstrapValidations from '../components/BootstrapValidations';

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
                    <a href={ksuLink} className="logo d-flex align-items-center w-auto">
                      <img src={ksuLogo} alt="ksü logo"/>
                      <span className="d-none d-lg-block">KSÜ</span>
                    </a>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-1 pb-1">
                        <h5 className="card-title text-center pb-0 fs-4">Şifremi Unuttum</h5>
                        <p className="text-center small">Şifrenizi yenilemek için kişisel bilgilerinizi giriniz!</p>
                      </div>
                      <form className="row g-2 needs-validation" noValidate>
                        <div className="col-12">
                          <label htmlFor="schoolNumber" className="form-label mb-0">Okul Numarası</label>
                            <input type="text" name="schoolNumber" className="form-control" id="schoolNumber" required/>
                          <div className="invalid-feedback">Lütfen okul numaranızı giriniz!</div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="userEmail" className="form-label mb-0">E-Posta Adresi</label>
                              <input type="email" name="userEmail" className="form-control" id="userEmail" required/>
                          <div className="invalid-feedback">Lütfen geçerli bir E-Posta adresi giriniz!</div>
                        </div>
                        <div className="col-12 pb-1 pt-1">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" required/>
                              <label className="form-check-label" htmlFor="rememberMe">Google Recaptcha</label>
                            <div className="invalid-feedback">Google Recaptcha Doğrulaması</div>
                          </div>
                        </div>
                        <div className="col-12 pb-1">
                          <button className="btn btn-primary w-100" type="submit">Şifre Yenile</button>
                        </div>
                        <div className="col-12" align="center">
                            <p>
                              <Link to={"/login"}>Giriş Yap</Link>
                            </p>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="credits" align="center">
                    Tüm Hakları Saklıdır © 2022<br/>
                    <a href={ksuLink}>Kahramanmaraş Sütçü İmam Üniversitesi</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <BootstrapValidations/>
    </>
  )
}

export default ForgotPassword