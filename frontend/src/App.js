import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "./pages/UserLoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import StudentHomePage from "./pages/StudentHomePage";
import TeacherHomePage from "./pages/TeacherHomePage";
import Error404Page from "./pages/Error404Page";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/quill/quill.snow.css";
import "./assets/vendor/quill/quill.bubble.css";
import "./assets/vendor/remixicon/remixicon.css";
import "./assets/vendor/simple-datatables/style.css";
import "./assets/css/style.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<UserLoginPage />} />
        <Route exact path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route exact path="/register" element={<UserRegisterPage />} />
        <Route exact path="/student/home" element={<StudentHomePage />} />
        <Route exact path="/teacher/home" element={<TeacherHomePage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </>
  );
}

export default App;
