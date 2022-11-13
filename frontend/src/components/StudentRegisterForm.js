import React from "react";
import { useFormik } from "formik";
import { studentRegisterValidationSchema } from "./FormikValidations";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentRegisterForm = () => {
  const ksuLink = useSelector((state) => state.system.ksuLink);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
      initialValues: {
        studentName: "",
        studentSurname: "",
        schoolNumber: "",
        studentEmail: "",
        studentPassword: "",
        studentPasswordConfirm: "",
        StudentAcceptTerms: "",
      },
      onSubmit: (values) => {
        console.log(JSON.stringify(values));
      },
      validationSchema: studentRegisterValidationSchema,
    });

  return (
    <>
      <div
        className="tab-pane fade show active student-create-account"
        id="student-create-account"
      >
        <form
          className="row g-2 needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <label htmlFor="studentName" className="form-label mb-0">
                  Ad
                </label>
                <input
                  type="text"
                  name="studentName"
                  className="form-control"
                  id="studentName"
                  value={values.studentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.studentName && touched.studentName && (
                  <div style={{ color: "red" }}>
                    <i className="bi bi-exclamation-octagon">
                      {errors.studentName}
                    </i>
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="studentSurname" className="form-label mb-0">
                  Soyad
                </label>
                <input
                  type="text"
                  name="studentSurname"
                  className="form-control"
                  id="studentSurname"
                  value={values.studentSurname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.studentSurname && touched.studentSurname && (
                  <div style={{ color: "red" }}>
                    <i className="bi bi-exclamation-octagon">
                      {errors.studentSurname}
                    </i>
                  </div>
                )}
              </div>
            </div>
          </div>
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
            <label htmlFor="studentEmail" className="form-label mb-0">
              E-Posta Adresi
            </label>
            <input
              type="email"
              name="studentEmail"
              className="form-control"
              id="studentEmail"
              value={values.studentEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.studentEmail && touched.studentEmail && (
              <div style={{ color: "red" }}>
                <i className="bi bi-exclamation-octagon">
                  {errors.studentEmail}
                </i>
              </div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="studentPassword" className="form-label mb-0">
              Şifre
            </label>
            <input
              type="password"
              name="studentPassword"
              className="form-control"
              id="studentPassword"
              value={values.studentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.studentPassword && touched.studentPassword && (
              <div style={{ color: "red" }}>
                <i className="bi bi-exclamation-octagon">
                  {errors.studentPassword}
                </i>
              </div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="studentPasswordConfirm" className="form-label mb-0">
              Şifre Tekrar
            </label>
            <input
              type="password"
              name="studentPasswordConfirm"
              className="form-control"
              id="studentPasswordConfirm"
              value={values.studentPasswordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.studentPasswordConfirm && touched.studentPasswordConfirm && (
              <div style={{ color: "red" }}>
                <i className="bi bi-exclamation-octagon">
                  {errors.studentPasswordConfirm}
                </i>
              </div>
            )}
          </div>
          <div className="col-12 pb-1 pt-1">
            <div className="form-check">
              <input
                className="form-check-input"
                name="StudentAcceptTerms"
                type="checkbox"
                id="StudentAcceptTerms"
                value={values.StudentAcceptTerms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className="form-check-label" htmlFor="StudentAcceptTerms">
                <a href={ksuLink}>Şartlar ve koşulları</a> kabul ediyorum.
              </label>
              {errors.StudentAcceptTerms && touched.StudentAcceptTerms && (
                <div style={{ color: "red" }}>
                  <i className="bi bi-exclamation-octagon">
                    {errors.StudentAcceptTerms}
                  </i>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 pb-1">
            <button className="btn btn-primary w-100" type="submit">
              Hesap Oluştur
            </button>
          </div>
          <div className="col-12">
            <p className="small mb-0">
              Zaten hesabın var mı ?<Link to={"/login"}> Giriş Yap</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentRegisterForm;
