// General
import GeneralLayout from "./users/general/index";
import UserLoginPage from "./users/general/UserLoginPage";
import ForgotPasswordPage from "./users/general/ForgotPasswordPage";
import UserRegisterPage from "./users/general/UserRegisterPage";
import GeneralNotFoundPage from "./users/general/NotFoundPage";
// Student
import StudentLayout from "./users/student/StudentLayout";
import StudentHomePage from "./users/student/HomePage";
import InternshipDocumentsPage from "./users/student/InternshipDocumentsPage";
import InternshipProcessPage from "./users/student/InternshipProcessPage";
import InternshipLayout from "./users/student/InternshipForm/InternshipFormLayout";
import SelectionPage from "./users/student/InternshipForm/SelectionPage";
import InstructionsPage from "./users/student/InternshipForm/InstructionsPage";
import CompanyInformationPage from "./users/student/InternshipForm/CompanyInformationPage";
import CompanyApprovalStatusPage from "./users/student/InternshipForm/CompanyApprovalStatusPage";
import CompanyApprovalWaitPage from "./users/student/InternshipForm/CompanyApprovalWaitPage";
import ConsultantApprovalWaitPage from "./users/student/InternshipForm/ConsultantApprovalWaitPage";
import ApplicationCompletedPage from "./users/student/InternshipForm/ApplicationCompletedPage";
import StudentProfileLayout from "./users/student/profile/ProfileLayout";
import StudentAboutPage from "./users/student/profile/AboutPage";
import StudentEditPage from "./users/student/profile/EditPage";
import StudentChangePasswordPage from "./users/student/profile/ChangePasswordPage";
import StudentNotFoundPage from "./users/student/NotFoundPage";
// Teacher
import TeacherLayout from "./users/teacher/TeacherLayout";
import TeacherHomePage from "./users/teacher/HomePage";
import InternshipApplicationsPage from "./users/teacher/InternshipApplicationsPage";
import InternshipStudentsViewPage from "./users/teacher/InternshipStudentsViewPage";
import InternshipTeamPage from "./users/teacher/InternshipTeamPage";
import TeacherProfileLayout from "./users/teacher/profile/ProfileLayout";
import TeacherAboutPage from "./users/teacher/profile/AboutPage";
import TeacherEditPage from "./users/teacher/profile/EditPage";
import TeacherChangePasswordPage from "./users/teacher/profile/ChangePasswordPage";
import TeacherNotFoundPage from "./users/teacher/NotFoundPage";
// PrivateRoute
import AuthPrivateRoute from "../components/System/AuthPrivateRoute";
import StudentPrivateRoute from "../components/System/StudentPrivateRoute";
import TeacherPrivateRoute from "../components/System/TeacherPrivateRoute";

const routes = [
  {
    path: "/", element: <GeneralLayout />, auth: true,
    children: 
    [
      { index: true, element: <UserLoginPage /> },
      { path: "register", element: <UserRegisterPage /> },
      { path: "forgotPassword", element: <ForgotPasswordPage /> },
      { path: "*", element: <GeneralNotFoundPage /> }
    ]
  },
  {
    path: "student",
    element: <StudentLayout />,
    student: true,
    children: 
    [
      { path: "home", element: <StudentHomePage /> },
      { path: "internshipDocuments", element: <InternshipDocumentsPage /> },
      { path: "internshipProcess", element: <InternshipProcessPage /> },
      { path: "internshipForm", element: <InternshipLayout />,
        children: 
        [
          { path: "selection", element: <SelectionPage /> },
          { path: "instructions", element: <InstructionsPage /> },
          { path: "companyInformation", element: <CompanyInformationPage /> },
          { path: "companyApprovalStatus/:ogr_id", element: <CompanyApprovalStatusPage /> },
          { path: "companyApprovalWait", element: <CompanyApprovalWaitPage /> },
          { path: "consultantApprovalWait", element: <ConsultantApprovalWaitPage /> },
          { path: "applicationCompleted", element: <ApplicationCompletedPage /> }
        ]
      },
      { path: "profile", element: <StudentProfileLayout />,
        children: 
        [
          { path: "about", element: <StudentAboutPage /> },
          { path: "edit", element: <StudentEditPage /> },
          { path: "changePassword", element: <StudentChangePasswordPage /> }
        ]
      },
      { path: "*", element: <StudentNotFoundPage /> }
    ]
  },
  {
    path: "teacher", element: <TeacherLayout />, teacher: true,
    children: 
    [
      { path: "home", element: <TeacherHomePage /> },
      { path: "internshipApplications", element: <InternshipApplicationsPage /> },
      { path: "internshipStudentsView", element: <InternshipStudentsViewPage /> },
      { path: "internshipTeam", element: <InternshipTeamPage /> },
      { path: "profile", element: <TeacherProfileLayout />,
        children: 
        [
          { path: "about", element: <TeacherAboutPage /> },
          { path: "edit", element: <TeacherEditPage /> },
          { path: "changePassword", element: <TeacherChangePasswordPage /> }
        ]
      },
      { path: "*", element: <TeacherNotFoundPage /> }
    ]
  }
];

const privateRouteMap = (routes) =>
  routes.map( (route) => {
    if (route?.auth) {
      route.element = <AuthPrivateRoute>{route.element}</AuthPrivateRoute>
    }
    if (route?.student) {
      route.element = <StudentPrivateRoute>{route.element}</StudentPrivateRoute>
    }
    if (route?.teacher) {
      route.element = <TeacherPrivateRoute>{route.element}</TeacherPrivateRoute>
    }
    if (route?.children) {
      route.children = privateRouteMap(route.children);
    }
    return route;
  });

export default privateRouteMap(routes);
