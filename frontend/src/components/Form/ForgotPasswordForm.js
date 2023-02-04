import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "./FormikValidations";

const ForgotPasswordForm = () => {
  const captchaRef = useRef(null);
  let [googleRecaptchaValue, setGoogleRecaptchaValue] = useState(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      schoolNumber: "",
      userEmail: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));

      resetForm({ values: "" });
      captchaRef.current.reset();
      setGoogleRecaptchaValue((googleRecaptchaValue = false));
    },
    validationSchema: forgotPasswordValidationSchema,
  });

  const captchaOnChange = async (value) => {
    console.log("Captcha value = ", value);
    const token = captchaRef.current.getValue();

    await axios
      .post(process.env.REACT_APP_API_URL, { token })
      .then((res) => {
        setGoogleRecaptchaValue((googleRecaptchaValue = res.data));
        console.log(googleRecaptchaValue);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                    &nbsp;{errors.schoolNumber}
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
                    &nbsp;{errors.userEmail}
                  </i>
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
                  onChange={captchaOnChange}
                />
              </div>
              <div>
                {googleRecaptchaValue === false ? (
                  <div
                    style={{
                      color: "#4169E1",
                      fontSize: "17px",
                      paddingTop: "5px",
                    }}
                  >
                    <i className="bi bi-chat-right-text-fill">
                      &nbsp;Google Doğrulamasını Tamamlayınız
                    </i>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-12 pb-1">
              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={googleRecaptchaValue === false}
              >
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
  );
};

export default ForgotPasswordForm;
