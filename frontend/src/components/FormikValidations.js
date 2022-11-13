import * as yup from "yup";

const passwordRegexLowerCase = /(?=.*[a-z])/;
const passwordRegexUpperCase = /(?=.*[A-Z])/;
const passwordRegexNumberCase = /(?=.*[0-9])/;
const schoolNumberRegex = /^((\d{11}))$/;
const teacherPhoneNumberRegex = /^(05(\d{9}))$/;

const loginValidationSchema = yup.object().shape({
  loginEmail: yup
    .string()
    .email("Geçerli bir E-posta adresi giriniz!")
    .trim()
    .required("E-posta adresi giriniz!"),
  loginPassword: yup
    .string()
    .min(8, "Şifreniz en az 8 karakter olmalıdır.")
    .matches(
      passwordRegexLowerCase,
      "Şifreniz en az bir küçük karakter içermelidir."
    )
    .matches(
      passwordRegexUpperCase,
      "Şifrenizi en az bir büyük karakter içermelidir."
    )
    .matches(passwordRegexNumberCase, "Şifrenizi en az bir sayı içermelidir.")
    .max(12, "Şifreniz en fazla 12 karakter olmalıdır.")
    .required("Şifre belirleyiniz!"),
  loginRemember: yup.boolean().required("Google Doğrulamasını tamamlayınız!"),
});

const forgotPasswordValidationSchema = yup.object().shape({
  schoolNumber: yup
    .string()
    .matches(
      schoolNumberRegex,
      "Okul numaranızı doğru ve eksiksiz olarak girmelisiniz."
    )
    .trim()
    .required("Okul numaranızı giriniz!"),
  userEmail: yup
    .string()
    .email("Geçerli bir E-posta adresi giriniz!")
    .required("E-posta adresi giriniz!"),
  remember: yup.boolean().required("Google Doğrulamasını tamamlayınız!"),
});

const studentRegisterValidationSchema = yup.object().shape({
  studentName: yup
    .string()
    .min(3, "Adınız en az 3 karakter olabilir")
    .max(20, "Adınız en fazla 20 karakter olabilir.")
    .trim()
    .required("Adınızı giriniz!"),
  studentSurname: yup
    .string()
    .min(3, "Soyadınız en az 3 karakter olabilir")
    .max(20, "Soyadınız en fazla 20 karakter olabilir.")
    .trim()
    .required("Soyadınızı giriniz!"),
  schoolNumber: yup
    .string()
    .matches(
      schoolNumberRegex,
      "Okul numaranızı doğru ve eksiksiz olarak girmelisiniz."
    )
    .trim()
    .required("Okul numaranızı giriniz!"),
  studentEmail: yup
    .string()
    .email(" geçerli bir E-posta adresi giriniz!")
    .required("E-posta adresi giriniz!"),
  studentPassword: yup
    .string()
    .min(8, "Şifreniz en az 8 karakter olmalıdır.")
    .matches(
      passwordRegexLowerCase,
      "Şifreniz en az bir küçük karakter içermelidir."
    )
    .matches(
      passwordRegexUpperCase,
      "Şifrenizi en az bir büyük karakter içermelidir."
    )
    .matches(passwordRegexNumberCase, "Şifrenizi en az bir sayı içermelidir.")
    .max(12, "Şifreniz en fazla 12 karakter olmalıdır.")
    .required("Şifre belirleyiniz!"),
  studentPasswordConfirm: yup
    .string()
    .oneOf([yup.ref("studentPassword")], "Şifreler uyuşmamaktadır.")
    .required("Şifrenizi tekrar giriniz!"),
  StudentAcceptTerms: yup
    .boolean()
    .required(" Google Doğrulamasını tamamlayınız!"),
});

const teacherRegisterValidationSchema = yup.object().shape({
  teacherName: yup
    .string()
    .min(3, "Adınız en az 3 karakter olabilir")
    .max(20, "Adınız en fazla 20 karakter olabilir.")
    .trim()
    .required("Adınızı giriniz!"),
  teacherSurname: yup
    .string()
    .min(3, "Adınız en az 3 karakter olabilir")
    .max(20, "Adınız en fazla 20 karakter olabilir.")
    .trim()
    .required("Soyadınızı giriniz!"),
  teacherPhoneNumber: yup
    .string()
    .matches(
      teacherPhoneNumberRegex,
      "Telefon numarası 05xxxxxxxxx formatında olmalıdır."
    )
    .required("Telefon numarası giriniz!"),
  teacherEmail: yup
    .string()
    .email("Geçerli bir E-posta adresi giriniz!")
    .required("E-posta adresi giriniz!"),
  teacherPassword: yup
    .string()
    .min(8, "Şifreniz en az 8 karakter olmalıdır.")
    .matches(
      passwordRegexLowerCase,
      "Şifreniz en az bir küçük karakter içermelidir."
    )
    .matches(
      passwordRegexUpperCase,
      "Şifrenizi en az bir büyük karakter içermelidir."
    )
    .matches(passwordRegexNumberCase, "Şifrenizi en az bir sayı içermelidir.")
    .max(12, "Şifreniz en fazla 12 karakter olmalıdır.")
    .required("Şifre belirleyiniz!"),
  teacherPasswordConfirm: yup
    .string()
    .oneOf([yup.ref("teacherPassword")], "Şifreler uyuşmamaktadır.")
    .required("Şifrenizi tekrar giriniz!"),
  teacherAcceptTerms: yup
    .boolean()
    .required("Google Doğrulamasını tamamlayınız!"),
});

export {
  loginValidationSchema,
  forgotPasswordValidationSchema,
  studentRegisterValidationSchema,
  teacherRegisterValidationSchema,
}
