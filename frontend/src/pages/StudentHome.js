import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sideBarMenuOpen } from "../redux/systemConfigurationSlice";
import ksuLogo from "../assets/img/ksu.png";
import profile from "../assets/img/profile-img.jpg";
import messagesProfile from "../assets/img/messages-1.jpg";
axios.defaults.withCredentials = true;

const StudentHome = () => {
  const ksuLink = useSelector((state) => state.system.ksuLink);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      await axios
        .post("http://localhost:3001/api/users/check", {
          withCredentials: true
        })
        .then((result) => {
          const status = result.data.status;
          const currentUser = result.data.currentUser;

          if (status === "fail") {
            // kullanıcı yoksa
            navigate("/login");
          }
          if (status === "success" && currentUser.role !== "student") {
            // kullanıcı varsa ve kullanıcı öğrenci değilse
            navigate(`/${currentUser.role}/home`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    checkUser();
  }, [navigate]);

  const logoutUser = async () => {
    await axios
      .post("http://localhost:3001/api/users/logout", {
        withCredentials: true
      })
      .then((result) => {
        navigate(result.data.path);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href={ksuLink} className="logo d-flex align-items-center">
            <img src={ksuLogo} alt="" />
            <span className="d-none d-lg-block">KSÜ</span>
          </a>
          <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={() => {
              dispatch(sideBarMenuOpen());
            }}
          ></i>
        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href={ksuLink}
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">5</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  4 Yeni Duyuru Bulunmaktadır.
                  <a href={ksuLink}>
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      Hepsini Gör
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
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
                  <hr className="dropdown-divider" />
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
                  <hr className="dropdown-divider" />
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
                  <hr className="dropdown-divider" />
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
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href={ksuLink}>Tüm Bildirimleri Göster.</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href={ksuLink}
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  3 Yeni Mesajınız Bulunmaktadır.
                  <a href={ksuLink}>
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      Hepsini Gör
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href={ksuLink}>
                    <img
                      src={messagesProfile}
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Vahdet Altun</h4>
                      <p>Belgeleri ilet.</p>
                      <p>4 Dakika Önce</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href={ksuLink}>
                    <img
                      src={messagesProfile}
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Vahdet Altun</h4>
                      <p>Belgeleri ilet.</p>
                      <p>4 Dakika Önce</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href={ksuLink}>
                    <img
                      src={messagesProfile}
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Vahdet Altun</h4>
                      <p>Belgeleri ilet.</p>
                      <p>4 Dakika Önce</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href={ksuLink}>Tüm Mesajları Göster.</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href={ksuLink}
                data-bs-toggle="dropdown"
              >
                <img src={profile} alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  E. ÜNALDI
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Emre ÜNALDI</h6>
                  <span>Öğrenci</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href={ksuLink}
                  >
                    <i className="bi bi-person"></i>
                    <span>Profil</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href={ksuLink}
                  >
                    <i className="bi bi-gear"></i>
                    <span>Hesap Ayarları</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={logoutUser}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Çıkış Yap</span>
                  </button>
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
          Tüm hakları{" "}
          <strong>
            <span>KSÜ</span>
          </strong>{" "}
          tarafından saklıdır. &copy; 2022
        </div>
        <div className="credits">
          Tasarım ve Geliştirme: <a href={ksuLink}>ÜNALDI</a>
        </div>
      </footer>
      <a
        href={ksuLink}
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default StudentHome;
