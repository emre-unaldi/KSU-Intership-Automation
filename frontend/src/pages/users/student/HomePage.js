import axios from "axios";
import StudentHeader from "../../../components/Student/StudentHeader";
import StudentAside from "../../../components/Student/StudentAside";
import StudentHomeMain from "../../../components/Student/StudentHomeMain";
import StudentFooter from "../../../components/Student/StudentFooter"
axios.defaults.withCredentials = true;

const StudentHome = () => {

  return (
    <>
      <StudentHeader />
      <StudentAside />
      <StudentHomeMain />
      <StudentFooter/>
    </>
  );
};

export default StudentHome;
