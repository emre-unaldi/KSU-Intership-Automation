import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sideBarMenuOpen } from "../redux/systemConfigurationSlice";
import ksuLogo from "../assets/img/ksu.png";
import profile from "../assets/img/profile-img.jpg";
import messagesProfile from "../assets/img/messages-1.jpg";
axios.defaults.withCredentials = true;

function TeacherHeader() {
  const ksuLink = useSelector((state) => state.system.ksuLink);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await axios
      .post("http://localhost:3001/api/users/logout", {
        withCredentials: true,
      })
      .then((result) => {
        navigate.push(result.data.path, {replace: true});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
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
                <span>Öğretmen</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
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
                  href="users-profile.html"
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
  );
}

export default TeacherHeader;
