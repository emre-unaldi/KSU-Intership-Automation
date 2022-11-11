import React from 'react';
import { Link } from 'react-router-dom';
import ksuLogo from '../assets/img/ksu.png';
import BootstrapValidations from '../components/BootstrapValidations';

const UserLogin = () => {

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
                          <h5 className="card-title text-center pb-0 fs-4">Hesabınıza Giriş Yapın</h5>
                          <p className="text-center small">Giriş yapmak için kişisel bilgilerinizi giriniz!</p>
                        </div>
                        <form className="row g-2 needs-validation" noValidate>
                          <div className="col-12">
                              <label htmlFor="loginEmail" className="form-label mb-0">E-posta Adresi</label>
                                <input type="email" name="loginEmail" className="form-control" id="loginEmail" required/>
                              <div className="invalid-feedback">Lütfen geçerli bir E-posta adresi giriniz!</div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="loginPassword" className="form-label mb-0">Şifre</label>
                              <input type="password" name="loginPassword" className="form-control" id="loginPassword" required/>
                            <div className="invalid-feedback">Lütfen şifrenizi giriniz !</div>
                          </div>
                          <div className="col-12 pb-1 pt-1">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" name="loginRemember" value="true" id="loginRememberMe" required/>
                                <label className="form-check-label" htmlFor="loginRememberMe">Google Recaptcha</label>
                              <div className="invalid-feedback">Google Recaptcha Doğrulaması</div>
                            </div>
                          </div>
                          <div className="col-12 pb-1">
                            <button className="btn btn-primary w-100" type="submit">Giriş Yap</button>
                          </div>
                          <div className="col-12">
                            <p className="small mb-0">Hesabınız yok mu? 
                              <Link to={"/register"}> Hesap Oluştur</Link>
                            </p>
                          </div>
                          <div className="col-12" align="right">
                            <Link to={"/forgotPassword"}>Şifremi Unuttum</Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  <div className="credits" align="center">
                    Tüm Hakları Saklıdır © 2022 <br/>
                    <a href={ksuLink}>Kahramanmaraş Sütçü İmam Üniversitesi</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <a href={ksuLink} className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
      <BootstrapValidations/>
    </>
  )
}

export default UserLogin;