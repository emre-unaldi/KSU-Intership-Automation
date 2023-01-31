import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeacherHeader from "../components/TeacherHeader";
import TeacherAside from "../components/TeacherAside";
import TeacherHomeMain from "../components/TeacherHomeMain";
import Footer from "../components/Footer";
axios.defaults.withCredentials = true;

const TeacherHome = () => {
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
          if (status === "success" && currentUser.role !== "teacher") {
            // kullanıcı varsa ve kullanıcı öğretmen değilse
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
      <TeacherHeader />
      <TeacherAside />
      <TeacherHomeMain />
      <Footer />
    </>
  );
};

export default TeacherHome;
