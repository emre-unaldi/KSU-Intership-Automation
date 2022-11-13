import React from "react";
import { Link } from "react-router-dom";
import notFound from "../assets/img/not-found.svg";

const Error404 = () => {
  const ksuLink = "https://www.ksu.edu.tr";

  return (
    <>
      <main>
        <div className="container">
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>Aradığınız sayfa mevcut değil.</h2>
            <Link className="btn" to={"/student/home"}>
              Anasayfaya Dön
            </Link>
            <img
              src={notFound}
              className="img-fluid py-5"
              alt="Page Not Found"
            />
            <div className="credits">
              Tasarım ve Geliştirme <a href={ksuLink}>UNALDİ</a>
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
  )
}

export default Error404
