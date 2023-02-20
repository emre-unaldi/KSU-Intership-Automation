import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "./FormikValidations";
import { useDispatch, useSelector } from "react-redux";
import { verifyReCaptcha, checkReCaptchaValue } from "../../redux/systemConfigurationSlice";


const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const captchaRef = useRef(null);
  const googleRecaptcha = useSelector((state) => state.system.recaptcha);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm } = useFormik({
    initialValues: {
      schoolNumber: "",
      userEmail: ""
    },
    onSubmit: (values) => {
      resetForm(values = {});
      captchaRef.current.reset();
      dispatch(checkReCaptchaValue());
    },
    validationSchema: forgotPasswordValidationSchema
  });

  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="pt-1 pb-1">
            <h5 className="card-title text-center pb-0 fs-4">
              Şifremi Unuttum
            </h5>
            <p className="text-center small">
              Şifrenizi yenilemek için kişisel bilgilerinizi giriniz
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
                  <label className="bi bi-exclamation-circle-fill">
                    &nbsp;{errors.schoolNumber}
                  </label>
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
                  <label className="bi bi-exclamation-circle-fill">
                    &nbsp;{errors.userEmail}
                  </label>
                </div>
              )}
            </div>
            <div
              className="col-12 pb-1 pt-1"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  ref={captchaRef}
                  onChange={(value) => {
                    value
                      ? dispatch(verifyReCaptcha(value))
                      : dispatch(checkReCaptchaValue());
                  }}
                />
              </div>
              <div>
                {googleRecaptcha.data === false ? (
                  <div
                    style={{
                      color: "#4169E1",
                      fontSize: "17px",
                      paddingTop: "5px",
                    }}
                  >
                    <label className="bi bi-shield-fill-check">
                      &nbsp;Google Doğrulamasını Tamamlayınız
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-12 pb-1">
              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={googleRecaptcha.data === false}
              >
                Şifre Yenile
              </button>
            </div>
            <div className="col-12" align="center">
              <p>
                <Link to={"/"}>Giriş Yap</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
