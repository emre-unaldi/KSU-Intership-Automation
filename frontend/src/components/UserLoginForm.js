import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidationSchema } from "../components/FormikValidations";
import { loginInitialValues } from "../components/ValidationsValues";

const UserLoginForm = () => {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
      initialValues: loginInitialValues,
      onSubmit: (values) => {
        console.log(JSON.stringify(values));
      },
      validationSchema: loginValidationSchema,
    })

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="pt-1 pb-1">
            <h5 className="card-title text-center pb-0 fs-4">
              Hesabınıza Giriş Yapın
            </h5>
            <p className="text-center small">
              Giriş yapmak için kişisel bilgilerinizi giriniz!
            </p>
          </div>
          <form
            className="row g-2 needs-validation"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="col-12">
              <label htmlFor="loginEmail" className="form-label mb-0">
                E-posta Adresi
              </label>
              <input
                type="email"
                name="loginEmail"
                className="form-control"
                id="loginEmail"
                value={values.loginEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.loginEmail && touched.loginEmail && (
                <div style={{ color: "red" }}>
                  <i className="bi bi-exclamation-octagon">
                    {errors.loginEmail}
                  </i>
                </div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="loginPassword" className="form-label mb-0">
                Şifre
              </label>
              <input
                type="password"
                name="loginPassword"
                className="form-control"
                id="loginPassword"
                value={values.loginPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.loginPassword && touched.loginPassword && (
                <div style={{ color: "red" }}>
                  <i className="bi bi-exclamation-octagon">
                    {errors.loginPassword}
                  </i>
                </div>
              )}
            </div>
            <div className="col-12 pb-1 pt-1">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="loginRemember"
                  id="loginRememberMe"
                  value={values.loginRemember}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="loginRememberMe">
                  Google Recaptcha
                </label>
                {errors.loginRemember && touched.loginRemember && (
                  <div style={{ color: "red" }}>
                    <i className="bi bi-exclamation-octagon">
                      {errors.loginRemember}
                    </i>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 pb-1">
              <button className="btn btn-primary w-100" type="submit">
                Giriş Yap
              </button>
            </div>
            <div className="col-12">
              <p className="small mb-0">
                Hesabınız yok mu?
                <Link to={"/register"}> Hesap Oluştur</Link>
              </p>
            </div>
            <div className="col-12" align="right">
              <Link to={"/forgotPassword"}>Şifremi Unuttum</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserLoginForm
