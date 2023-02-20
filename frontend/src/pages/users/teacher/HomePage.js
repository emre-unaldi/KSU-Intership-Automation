import axios from "axios";
import TeacherHeader from "../../../components/Teacher/TeacherHeader";
import TeacherAside from "../../../components/Teacher/TeacherAside";
import TeacherHomeMain from "../../../components/Teacher/TeacherHomeMain";
import TeacherFooter from "../../../components/Teacher/TeacherFooter";
axios.defaults.withCredentials = true;

const TeacherHome = () => {
  return (
    <>
      <TeacherHeader />
      <TeacherAside />
      <TeacherHomeMain />
      <TeacherFooter />
    </>
  );
};

export default TeacherHome;
