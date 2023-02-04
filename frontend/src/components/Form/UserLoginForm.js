import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidationSchema } from "./FormikValidations";
axios.defaults.withCredentials = true;

const UserLoginForm = () => {
  const navigate = useNavigate();
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
      loginEmail: "",
      loginPassword: "",
    },
    onSubmit: async (values) => {
      //console.log(JSON.stringify(values));

      resetForm({ values: "" });
      captchaRef.current.reset();
      setGoogleRecaptchaValue((googleRecaptchaValue = false));

      await axios
        .post("http://localhost:3001/api/users/login",
          {
            email: values.loginEmail,
            password: values.loginPassword,
          },
          { withCredentials: true }
        )
        .then((result) => {
          console.log(result);
          navigate(result.data.path);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validationSchema: loginValidationSchema,
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
                    &nbsp;{errors.loginEmail}
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
                    &nbsp;{errors.loginPassword}
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
  );
};

export default UserLoginForm;
