import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { teacherRegisterValidationSchema } from "./FormikValidations";

const TeacherRegisterForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        teacherName: "",
        teacherSurname: "",
        teacherPhoneNumber: "",
        teacherEmail: "",
        teacherPassword: "",
        teacherPasswordConfirm: "",
        userType: "teacher",
      },
      onSubmit: async (values) => {
        //console.log(JSON.stringify(values));

        await axios
          .post("http://localhost:3001/api/users/signup", 
          {
            name: values.teacherName,
            surname: values.teacherSurname,
            phoneNumber: values.teacherPhoneNumber,
            email: values.teacherEmail,
            password: values.teacherPassword,
            role: values.userType,
          })
          .then((result) => {
            console.log(result);
            navigate(result.data.path);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      validationSchema: teacherRegisterValidationSchema,
    });

  return (
    <>
      <div
        className="tab-pane fade teacher-create-account"
        id="teacher-create-account"
      >
        <form
          className="row g-2 needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <label htmlFor="teacherName" className="form-label mb-0">
                  Ad
                </label>
                <input
                  type="text"
                  name="teacherName"
                  className="form-control"
                  id="teacherName"
                  value={values.teacherName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.teacherName && touched.teacherName && (
                  <div style={{ color: "red" }}>
                    <i className="bi bi-exclamation-octagon">
                      {errors.teacherName}
                    </i>
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="teacherSurname" className="form-label mb-0">
                  Soyad
                </label>
                <input
                  type="text"
                  name="teacherSurname"
                  className="form-control"
                  id="teacherSurname"
                  value={values.teacherSurname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.teacherSurname && touched.teacherSurname && (
                  <div style={{ color: "red" }}>
                    <i className="bi bi-exclamation-octagon">
                      {errors.teacherSurname}
                    </i>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="teacherPhoneNumber" className="form-label mb-0">
              Telefon Numaras??
            </label>
            <input
              type="tel"
              name="teacherPhoneNumber"
              className="form-control"
              id="teacherPhoneNumber"
              maxLength={11}
              value={values.teacherPhoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.teacherPhoneNumber && touched.teacherPhoneNumber && (
              <div style={{ color: "red" }}>
                <i className="bi bi-exclamation-octagon">
                  {errors.teacherPhoneNumber}
                </i>
              </div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="teacherEmail" className="form-label mb-0">
              E-Posta Adresi
            </label>
            <input
              type="email"
              name="teacherEmail"
              className="form-control"
              id="teacherEmail"
              value={values.teacherEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.teacherEmail && touched.teacherEmail && (
              <div style={{ color: "red" }}>
                <i className="bi bi-exclamation-octagon">
                  {errors.teacherEmail}
                </i>
              </div>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="teacherPassword" className="form-label mb-0">
              ??ifre
            </label>
            <input
              type="password"
              name="teacherPassword"
              className="form-control"
              id="teacherPassword"
              value={values.teacherPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.teacherPassword && touched.teacherPassword && (
              <div style={{ color: "red" }}>
                <i className="bi bi-exclamation-octagon">
                  {errors.teacherPassword}
                </i>
              </div>
            )}
          </div>
          <div className="col-12 pb-2">
            <label htmlFor="teacherPasswordConfirm" className="form-label mb-0">
              ??ifre Tekrar
            </label>
            <input
              type="password"
              name="teacherPasswordConfirm"
              className="form-control"
              id="teacherPasswordConfirm"
              value={values.teacherPasswordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.teacherPasswordConfirm &&
              touched.teacherPasswordConfirm && (
                <div style={{ color: "red" }}>
                  <i className="bi bi-exclamation-octagon">
                    {errors.teacherPasswordConfirm}
                  </i>
                </div>
              )}
          </div>
          <div className="col-12 pb-1">
            <button className="btn btn-primary w-100" type="submit">
              Hesap Olu??tur
            </button>
          </div>
          <div className="col-12">
            <p className="small mb-0">
              Zaten hesab??n var m?? ?<Link to={"/login"}> Giri?? Yap</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default TeacherRegisterForm;
