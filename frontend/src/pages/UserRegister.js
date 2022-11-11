import React from 'react';
import { Link } from 'react-router-dom';
import ksuLogo from '../assets/img/ksu.png';
import BootstrapValidations from '../components/BootstrapValidations';

const UserRegister = () => {

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
                                        <img src={ksuLogo} alt=""/>
                                        <span className="d-none d-lg-block">KSÜ</span>
                                    </a>
                                </div>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-1 pb-1">
                                            <h5 className="card-title text-center pb-0 fs-4">Hesap Oluştur</h5>
                                            <p className="text-center small">Hesap oluşturmak için kişisel bilgilerinizi giriniz.</p>
                                        </div>
                                        <ul className="nav nav-tabs nav-tabs-bordered d-flex">
                                            <li className="nav-item flex-fill">
                                                <button className="nav-link active w-100" data-bs-toggle="tab" data-bs-target="#student-create-account">Öğrenci Kayıt</button>
                                            </li>
                                            <li className="nav-item flex-fill">
                                                <button className="nav-link w-100" data-bs-toggle="tab" data-bs-target="#teacher-create-account">Öğretmen Kayıt</button>
                                            </li>
                                        </ul> 
                                        <div className="tab-content pt-3">
                                            <div className="tab-pane fade show active student-create-account" id="student-create-account">
                                                <form className="row g-2 needs-validation" noValidate>
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label htmlFor="studentName" className="form-label mb-0">Ad</label>
                                                                    <input type="text" name="studentName" className="form-control" id="studentName" required/>
                                                                <div className="invalid-feedback">Lütfen adınızı giriniz!</div>
                                                            </div>
                                                            <div className="col-6">
                                                                <label htmlFor="studentSurname" className="form-label mb-0">Soyad</label>
                                                                    <input type="text" name="studentSurname" className="form-control" id="studentSurname" required/>
                                                                <div className="invalid-feedback">Lütfen soyadınızı giriniz!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="schoolNumber" className="form-label mb-0">Okul Numarası</label>
                                                            <input type="text" name="schoolNumber" className="form-control" id="schoolNumber" required/>
                                                        <div className="invalid-feedback">Lütfen okul numaranızı giriniz!</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="studentEmail" className="form-label mb-0">E-Posta Adresi</label>
                                                            <input type="email" name="studentEmail" className="form-control" id="studentEmail" required/>
                                                        <div className="invalid-feedback">Lütfen geçerli bir E-Posta adresi giriniz!</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="studentPassword" className="form-label mb-0">Şifre</label>
                                                            <input type="password" name="studentPassword" className="form-control" id="studentPassword" required/>
                                                        <div className="invalid-feedback">Lütfen şifrenizi giriniz!</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="studentPasswordConfirm" className="form-label mb-0">Şifre Tekrar</label>
                                                            <input type="password" name="studentPasswordConfirm" className="form-control" id="studentPasswordConfirm" required/>
                                                        <div className="invalid-feedback">Lütfen şifrenizi tekrar giriniz!</div>
                                                    </div>
                                                    <div className="col-12 pb-1 pt-1">
                                                        <div className="form-check">
                                                            <input className="form-check-input" name="StudentAcceptTerms" type="checkbox" value="true" id="StudentAcceptTerms" required/>
                                                                <label className="form-check-label" htmlFor="StudentAcceptTerms"><a href={ksuLink}>Şartlar ve koşulları</a> kabul ediyorum.</label>
                                                            <div className="invalid-feedback">Göndermeden önce kabul etmelisiniz.</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 pb-1">
                                                        <button className="btn btn-primary w-100" type="submit" >Hesap Oluştur</button>
                                                    </div>
                                                    <div className="col-12">
                                                        <p className="small mb-0">Zaten hesabın var mı ? 
                                                            <Link to={"/login"}> Giriş Yap</Link>
                                                        </p>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="tab-pane fade teacher-create-account" id="teacher-create-account">
                                                <form className="row g-2 needs-validation" noValidate>
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label htmlFor="teacherName" className="form-label mb-0">Ad</label>
                                                                    <input type="text" name="teacherName" className="form-control" id="teacherName" required/>
                                                                <div className="invalid-feedback">Lütfen adınızı giriniz!</div>
                                                            </div>
                                                            <div className="col-6">
                                                                <label htmlFor="teacherSurname" className="form-label mb-0">Soyad</label>
                                                                    <input type="text" name="teacherSurname" className="form-control" id="teacherSurname" required/>
                                                                <div className="invalid-feedback">Lütfen soyadınızı giriniz!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="teacherPhoneNumber" className="form-label mb-0">Telefon Numarası</label>
                                                            <input type="tel" name="teacherPhoneNumber" className="form-control" id="teacherPhoneNumber" required/>
                                                        <div className="invalid-feedback">Lütfen geçerli bir telefon numarası giriniz!</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="teacherEmail" className="form-label mb-0">E-Posta Adresi</label>
                                                            <input type="email" name="teacherEmail" className="form-control" id="teacherEmail" required/>
                                                        <div className="invalid-feedback">Lütfen geçerli bir E-Posta adresi giriniz!</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="teacherePassword" className="form-label mb-0">Şifre</label>
                                                            <input type="password" name="teacherePassword" className="form-control" id="teacherePassword" required/>
                                                        <div className="invalid-feedback">Lütfen şifrenizi giriniz!</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <label htmlFor="teacherePasswordConfirm" className="form-label mb-0">Şifre Tekrar</label>
                                                            <input type="password" name="teacherePasswordConfirm" className="form-control" id="teacherePasswordConfirm" required/>
                                                        <div className="invalid-feedback">Lütfen şifrenizi tekrar giriniz!</div>
                                                    </div>
                                                    <div className="col-12 pt-1 pb-1">
                                                        <div className="form-check">
                                                            <input className="form-check-input" name="teacherAcceptTerms" type="checkbox" value="true" id="teacherAcceptTerms" required/>
                                                                <label className="form-check-label" htmlFor="teacherAcceptTerms"><a href={ksuLink}>Şartlar ve koşulları</a> kabul ediyorum.</label>
                                                            <div className="invalid-feedback">Göndermeden önce kabul etmelisiniz.</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 pb-1">
                                                        <button className="btn btn-primary w-100" type="submit">Hesap Oluştur</button>
                                                    </div>
                                                    <div className="col-12">
                                                        <p className="small mb-0">Zaten hesabın var mı ? 
                                                            <Link to={"/login"}> Giriş Yap</Link>
                                                        </p>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
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
        <BootstrapValidations/>
    </>
  )
}

export default UserRegister