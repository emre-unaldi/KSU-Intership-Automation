import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "../components/FormikValidations";
import { forgotPasswordInitialValues } from "../components/ValidationsValues";

const ForgotPasswordForm = () => {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
      initialValues: forgotPasswordInitialValues,
      onSubmit: (values) => {
        console.log(JSON.stringify(values));
      },
      validationSchema: forgotPasswordValidationSchema,
    })

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="pt-1 pb-1">
            <h5 className="card-title text-center pb-0 fs-4">
              Şifremi Unuttum
            </h5>
            <p className="text-center small">
              Şifrenizi yenilemek için kişisel bilgilerinizi giriniz!
            </p>
          </div>
          <form
            className="row g-2 needs-validation"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="col-12">
              <label htmlFor="schoolNumber" className="form-label mb-0">
                Okul Numarası
              </label>
              <input
                type="text"
                name="schoolNumber"
                className="form-control"
                id="schoolNumber"
                maxLength={11}
                value={values.schoolNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.schoolNumber && touched.schoolNumber && (
                <div style={{ color: "red" }}>
                  <i className="bi bi-exclamation-octagon">
                    {errors.schoolNumber}
                  </i>
                </div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="userEmail" className="form-label mb-0">
                E-Posta Adresi
              </label>
              <input
                type="email"
                name="userEmail"
                className="form-control"
                id="userEmail"
                value={values.userEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userEmail && touched.userEmail && (
                <div style={{ color: "red" }}>
                  <i className="bi bi-exclamation-octagon">
                    {errors.userEmail}
                  </i>
                </div>
              )}
            </div>
            <div className="col-12 pb-1 pt-1">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                  id="rememberMe"
                  value={values.remember}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Google Recaptcha
                </label>
                {errors.remember && touched.remember && (
                  <div style={{ color: "red" }}>
                    <i className="bi bi-exclamation-octagon">
                      {errors.remember}
                    </i>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 pb-1">
              <button className="btn btn-primary w-100" type="submit">
                Şifre Yenile
              </button>
            </div>
            <div className="col-12" align="center">
              <p>
                <Link to={"/login"}>Giriş Yap</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordForm
