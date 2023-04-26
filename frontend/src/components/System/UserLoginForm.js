import React, { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginValidationSchema } from './FormikValidations'
import { useDispatch, useSelector } from 'react-redux'
import { verifyReCaptcha, checkReCaptchaValue } from '../../redux/systemSlice'
import { loginUser } from '../../redux/userSlice'
axios.defaults.withCredentials = true

const UserLoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const captchaRef = useRef(null)
  const googleRecaptcha = useSelector((state) => state.system.recaptcha)

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
      loginEmail: '',
      loginPassword: '',
    },
    onSubmit: (values) => {
      dispatch(loginUser(values))
        .then((loggedIn) => {
          if (loggedIn?.meta?.requestStatus === 'fulfilled') {
            if (loggedIn?.payload?.status === 'success') {
              console.log(loggedIn.payload.message)
              navigate(`${loggedIn.payload.user[0].role}/home`)
            } else {
              console.log(loggedIn.payload.message)
              navigate('/')
            }
          } else {
            console.log('User login failed. Try logging in again')
          }
        })
        .catch((err) => {
          console.log(err)
        })
      resetForm((values = {}))
      captchaRef.current.reset()
      dispatch(checkReCaptchaValue())
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
                <div style={{ color: 'red' }}>
                  <label className="bi bi-exclamation-octagon">
                    &nbsp;{errors.loginEmail}
                  </label>
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
                <div style={{ color: 'red' }}>
                  <label className="bi bi-exclamation-octagon">
                    &nbsp;{errors.loginPassword}
                  </label>
                </div>
              )}
            </div>
            <div
              className="col-12 pb-1 pt-1"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  ref={captchaRef}
                  onChange={(value) => {
                    value
                      ? dispatch(verifyReCaptcha(value))
                      : dispatch(checkReCaptchaValue())
                  }}
                />
              </div>
              <div>
                {googleRecaptcha.data === false ? (
                  <div
                    style={{
                      color: '#4169E1',
                      fontSize: '17px',
                      paddingTop: '5px',
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
                Giriş Yap
              </button>
            </div>
            <div className="col-12">
              <p className="small mb-0">
                Hesabınız yok mu?
                <Link to={'/register'}> Hesap Oluştur</Link>
              </p>
            </div>
            <div className="col-12" align="right">
              <Link to={'/forgotPassword'}>Şifremi Unuttum</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserLoginForm
