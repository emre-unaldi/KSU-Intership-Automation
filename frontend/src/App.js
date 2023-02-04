import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "./pages/UserLoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import StudentHomePage from "./pages/Student/StudentHomePage";
import TeacherHomePage from "./pages/Teacher/TeacherHomePage";
import Error404Page from "./pages/Error404Page";

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
