import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import ForgotPassword from "./pages/ForgotPassword";
import UserRegister from "./pages/UserRegister";
import StudentHome from "./pages/StudentHome";
import TeacherHome from "./pages/TeacherHome";
import Error404 from "./pages/Error404";
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
        <Route exact path="/login" element={<UserLogin />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/register" element={<UserRegister />} />
        <Route exact path="/student/home" element={<StudentHome />} />
        <Route exact path="/teacher/home" element={<TeacherHome />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
