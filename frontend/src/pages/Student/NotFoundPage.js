import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import notFound from '../../assets/img/not-found.svg'

const NotFoundPage = () => {
  const ksuLink = useSelector((state) => state.system.ksuLink)

  return (
    <>
      <main>
        <div className="container">
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>Aradığınız öğrenci sayfası mevcut değil.</h2>
            <Link className="btn" to={'/student/home'}>
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
        <i className="bi bi-arrow-up-short"/>
      </a>
    </>
  )
}

export default NotFoundPage
