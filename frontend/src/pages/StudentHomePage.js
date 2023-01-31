import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import StudentAside from "../components/StudentAside";
import StudentHomeMain from "../components/StudentHomeMain";
import Footer from "../components/Footer";
axios.defaults.withCredentials = true;

const StudentHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      await axios
        .post("http://localhost:3001/api/users/check", {
          withCredentials: true,
        })
        .then((result) => {
          const status = result.data.status;
          const currentUser = result.data.currentUser;

          if (status === "fail") {
            // kullanıcı yoksa
            navigate("/login");
          }
          if (status === "success" && currentUser.role !== "student") {
            // kullanıcı varsa ve kullanıcı öğrenci değilse
            navigate(`/${currentUser.role}/home`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    checkUser();
  }, [navigate]);

  return (
    <>
      <StudentHeader />
      <StudentAside />
      <StudentHomeMain />
      <Footer />
    </>
  );
};

export default StudentHome;
