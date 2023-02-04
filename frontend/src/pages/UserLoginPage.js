import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ksuLogo from "../assets/img/ksu.png";
import UserLoginForm from "../components/Form/UserLoginForm";
axios.defaults.withCredentials = true;

const UserLogin = () => {
  const ksuLink = useSelector((state) => state.system.ksuLink);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      await axios
        .post("http://localhost:3001/api/users/check", {
          withCredentials: true,
        })
        .then((result) => {
          const status = result.data.status;
          const currentUser = result.data.currentUser;

          if (status === "success") {
            // kullanıcı varsa
            navigate(`/${currentUser.role}/home`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    checkUser();
  }, [navigate]);

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
                  <UserLoginForm />
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
      <a
        href={ksuLink}
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default UserLogin;
