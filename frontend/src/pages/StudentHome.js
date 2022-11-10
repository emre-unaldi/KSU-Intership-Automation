import React from 'react';
import ksuLogo from '../assets/img/ksu.png';
import profile from "../assets/img/profile-img.jpg";
import messagesProfile from "../assets/img/messages-1.jpg";

const StudentHome = () => {
    
    const ksuLink = "https://www.ksu.edu.tr";
    let active = true;
    const getWidth = window.screen.width;
    
    const menuOpen = () => {
        if (active === true) {
            document.querySelector('.sidebar').style.left = "0";
            if(getWidth > 800){
                document.querySelector('#main').style.marginLeft = "300px";
                document.querySelector('#footer').style.marginLeft = "300px";
            }
            active = false;
        } else {
            document.querySelector('.sidebar').style.left = "-300px";
            if(getWidth > 800){
                document.querySelector('#main').style.marginLeft = "0";
                document.querySelector('#footer').style.marginLeft = "0";
            }
            active = true;
        }
    }
   
  return (
    <>
        <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">

        <a href={ksuLink} className="logo d-flex align-items-center">
            <img src={ksuLogo} alt=""/>
            <span className="d-none d-lg-block">KSÜ</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn" onClick={menuOpen}></i>
        </div>

        <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

            <li className="nav-item dropdown">


            <a className="nav-link nav-icon" href={ksuLink} data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">5</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                4 Yeni Duyuru Bulunmaktadır.
                <a href={ksuLink}><span className="badge rounded-pill bg-primary p-2 ms-2">Hepsini Gör</span></a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                    <h4>Uyarı</h4>
                    <p>Staj evraklarını imzalatın.</p>
                    <p>30 dakika önce</p>
                </div>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                    <h4>Uyarı 2</h4>
                    <p>Danışman onayını alın.</p>
                    <p>10 dakika önce</p>
                </div>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                    <h4>İlan</h4>
                    <p>Staj notları ilan edildi</p>
                    <p>20 dakika önce</p>
                </div>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                    <h4>Bilgilendirme</h4>
                    <p>Staj evraklarını tarih aralığında iletin.</p>
                    <p>40 dakika önce</p>
                </div>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="dropdown-footer">
                <a href={ksuLink}>Tüm Bildirimleri Göster.</a>
                </li>
            </ul>

            </li>

            <li className="nav-item dropdown">

            <a className="nav-link nav-icon" href={ksuLink} data-bs-toggle="dropdown">
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                    3 Yeni Mesajınız Bulunmaktadır.
                <a href={ksuLink}><span className="badge rounded-pill bg-primary p-2 ms-2">Hepsini Gör</span></a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="message-item">
                <a href={ksuLink}>
                    <img src={messagesProfile} alt="" className="rounded-circle"/>
                    <div>
                    <h4>Vahdet Altun</h4>
                    <p>Belgeleri ilet.</p>
                    <p>4 Dakika Önce</p>
                    </div>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="message-item">
                    <a href={ksuLink}>
                    <img src={messagesProfile} alt="" className="rounded-circle"/>
                    <div>
                        <h4>Vahdet Altun</h4>
                        <p>Belgeleri ilet.</p>
                        <p>4 Dakika Önce</p>
                    </div>
                    </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>
                
                <li className="message-item">
                    <a href={ksuLink}>
                    <img src={messagesProfile} alt="" className="rounded-circle"/>
                    <div>
                        <h4>Vahdet Altun</h4>
                        <p>Belgeleri ilet.</p>
                        <p>4 Dakika Önce</p>
                    </div>
                    </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li className="dropdown-footer">
                <a href={ksuLink}>Tüm Mesajları Göster.</a>
                </li>

            </ul>

            </li>

            <li className="nav-item dropdown pe-3">

            <a className="nav-link nav-profile d-flex align-items-center pe-0" href={ksuLink} data-bs-toggle="dropdown">
                <img src={profile} alt="Profile" className="rounded-circle"/>
                <span className="d-none d-md-block dropdown-toggle ps-2">E. ÜNALDI</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                <h6>Emre ÜNALDI</h6>
                <span>Öğrenci</span>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <a className="dropdown-item d-flex align-items-center" href={ksuLink}>
                    <i className="bi bi-person"></i>
                    <span>Profil</span>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <a className="dropdown-item d-flex align-items-center" href={ksuLink}>
                    <i className="bi bi-gear"></i>
                    <span>Hesap Ayarları</span>
                </a>
                </li>
                <li>
                <hr className="dropdown-divider"/>
                </li>

                <li>
                <a className="dropdown-item d-flex align-items-center" href={ksuLink}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Çıkış Yap</span>
                </a>
                </li>

            </ul>

            </li>

        </ul>
        </nav>

        </header>

        <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">


        <li className="nav-item">
            <a className="nav-link" href={ksuLink}>
            <i className="bi bi-house-fill"></i>
            <span>Menü</span>
            </a>
        </li>

        <li className="nav-item">
            <a className="nav-link collapsed" href={ksuLink}>
            <i className="bi bi-calendar-plus-fill"></i>
            <span>Staj Formu</span>
            </a>
        </li>

        <li className="nav-item">
            <a className="nav-link collapsed" href={ksuLink}>
            <i className="bi bi-folder-symlink-fill"></i>
            <span>Staj Evrakları</span>
            </a>
        </li>

        <li className="nav-item">
            <a className="nav-link collapsed" href={ksuLink}>
            <i className="bi bi-collection-fill"></i>
            <span>Staj Süreci</span>
            </a>
        </li>

        </ul>
        </aside>

        <main id="main" className="main">
        <section className="section">
            <div className="row">
                <div className="col-xl-8">

                    <div className="card">
                        <div className="card-body pt-4 d-flex flex-column align-items-center">
                        <h2>Kevin Anderson</h2>
                        <h3>Web Designer</h3>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body pt-4 d-flex flex-column align-items-center">
                        <h2>Kevin Anderson</h2>
                        <h3>Web Designer</h3>
                        </div>
                    </div>

                </div>

                <div className="col-xl-4">

                    <div className="card">
                        <div className="card-body  pt-4 d-flex flex-column align-items-center">
                            <h2>Kevin Anderson</h2>
                            <h3>Web Designer</h3>
                        </div>            
                    </div>

                </div>
            </div>
        </section>
        </main>

        <footer id="footer" className="footer">
        <div className="copyright">
        Tüm hakları <strong><span>KSÜ</span></strong> tarafından saklıdır. &copy; 2022
        </div>
        <div className="credits">
        Tasarım ve Geliştirme: <a href={ksuLink}>ÜNALDI</a>
        </div>
        </footer>

        <a href={ksuLink} className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

    </>
  )
}

export default StudentHome