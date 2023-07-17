// System
import GeneralLayout from './System/GeneralLayout'
import UserLoginPage from './System/UserLoginPage'
import ForgotPasswordPage from './System/ForgotPasswordPage'
import UserRegisterPage from './System/UserRegisterPage'
import GeneralNotFoundPage from './System/NotFoundPage'
// Student
import StudentLayout from './Student/StudentLayout'
import StudentHomePage from './Student/HomePage'
import InternshipDocumentsPage from './Student/InternshipDocumentsPage'
import InternshipProcessPage from './Student/InternshipProcessPage'
import InternshipLayout from './Student/InternshipForm/InternshipFormLayout'
import SelectionPage from './Student/InternshipForm/SelectionPage'
import InstructionsPage from './Student/InternshipForm/InstructionsPage'
import CompanyInformationPage from './Student/InternshipForm/CompanyInformationPage'
import CompanyApprovalPage from './Student/InternshipForm/CompanyApprovalPage'
import CompanyApprovalWaitPage from './Student/InternshipForm/CompanyApprovalWaitPage'
import ConsultantApprovalWaitPage from './Student/InternshipForm/ConsultantApprovalWaitPage'
import StudentProfileLayout from './Student/Profile/ProfileLayout'
import StudentAboutPage from './Student/Profile/AboutPage'
import StudentEditPage from './Student/Profile/EditPage'
import StudentChangePasswordPage from './Student/Profile/ChangePasswordPage'
import StudentNotFoundPage from './Student/NotFoundPage'
// Teacher
import TeacherLayout from './Teacher/TeacherLayout'
import TeacherHomePage from './Teacher/HomePage'
import InternshipApplicationsPage from './Teacher/InternshipApplicationsPage'
import InternshipStudentsViewPage from './Teacher/InternshipStudentsViewPage'
import InternshipTeamPage from './Teacher/InternshipTeamPage'
import TeacherProfileLayout from './Teacher/Profile/ProfileLayout'
import TeacherAboutPage from './Teacher/Profile/AboutPage'
import TeacherEditPage from './Teacher/Profile/EditPage'
import TeacherChangePasswordPage from './Teacher/Profile/ChangePasswordPage'
import TeacherNotFoundPage from './Teacher/NotFoundPage'
// Admin
import AdminLayout from './Admin/AdminLayout'
import AdminHomePage from './Admin/HomePage'
import EducationPeriodOpenClosePage from './Admin/EducationPeriodOpenClosePage'
import InternshipGradeDateRangesPage from './Admin/InternshipGradeDateRangesPage'
import AnnouncementsPage from './Admin/AnnouncementsPage'
import StudentsPage from "./Admin/StudentsPage";
import TeachersPage from "./Admin/TeachersPage";
import InternshipPage from "./Admin/InternshipPage";
import AdminProfileLayout from './Admin/Profile/ProfileLayout'
import AdminAboutPage from './Admin/Profile/AboutPage'
import AdminEditPage from './Admin/Profile/EditPage'
import AdminChangePasswordPage from './Admin/Profile/ChangePasswordPage'
import AdminNotFoundPage from './Admin/NotFoundPage'
// PrivateRoute
import AuthPrivateRoute from '../components/System/PrivateRoutes/AuthPrivateRoute'
import StudentPrivateRoute from '../components/System/PrivateRoutes/StudentPrivateRoute'
import TeacherPrivateRoute from '../components/System/PrivateRoutes/TeacherPrivateRoute'
import AdminPrivateRoute from '../components/System/PrivateRoutes/AdminPrivateRoute'

const routes = [
  {
    path: '/',
    element: <GeneralLayout />,
    auth: true,
    children: [
      { index: true, element: <UserLoginPage /> },
      { path: 'register', element: <UserRegisterPage /> },
      { path: 'forgotPassword', element: <ForgotPasswordPage /> },
      { path: 'companyApproval', element: <CompanyApprovalPage /> },
      { path: '*', element: <GeneralNotFoundPage /> }
    ]
  },
  {
    path: 'student',
    element: <StudentLayout />,
    student: true,
    children: [
      { path: 'home', element: <StudentHomePage /> },
      { path: 'internshipDocuments', element: <InternshipDocumentsPage /> },
      { path: 'internshipProcess', element: <InternshipProcessPage /> },
      {
        path: 'internshipForm',
        element: <InternshipLayout />,
        children: [
          { path: 'selection', element: <SelectionPage /> },
          { path: 'instructions', element: <InstructionsPage /> },
          { path: 'companyInformation', element: <CompanyInformationPage /> },
          { path: 'companyApprovalWait', element: <CompanyApprovalWaitPage /> },
          { path: 'consultantApprovalWait', element: <ConsultantApprovalWaitPage />}
        ]
      },
      {
        path: 'profile',
        element: <StudentProfileLayout />,
        children: [
          { path: 'about', element: <StudentAboutPage /> },
          { path: 'edit', element: <StudentEditPage /> },
          { path: 'changePassword', element: <StudentChangePasswordPage /> }
        ]
      },
      { path: '*', element: <StudentNotFoundPage /> }
    ]
  },
  {
    path: 'teacher',
    element: <TeacherLayout />,
    teacher: true,
    children: [
      { path: 'home', element: <TeacherHomePage /> },
      { path: 'internshipApplications', element: <InternshipApplicationsPage /> },
      { path: 'internshipStudentsView', element: <InternshipStudentsViewPage /> },
      { path: 'internshipTeam', element: <InternshipTeamPage /> },
      {
        path: 'profile',
        element: <TeacherProfileLayout />,
        children: [
          { path: 'about', element: <TeacherAboutPage /> },
          { path: 'edit', element: <TeacherEditPage /> },
          { path: 'changePassword', element: <TeacherChangePasswordPage /> }
        ]
      },
      { path: '*', element: <TeacherNotFoundPage /> }
    ]
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    admin: true,
    children: [
      { path: 'home', element: <AdminHomePage /> },
      { path: 'educationPeriod', element: <EducationPeriodOpenClosePage /> },
      { path: 'dateRanges', element: <InternshipGradeDateRangesPage /> },
      { path: 'announcements', element: <AnnouncementsPage /> },
      { path: 'students', element: <StudentsPage /> },
      { path: 'teachers', element: <TeachersPage /> },
      { path: 'internships', element: <InternshipPage /> },
      {
        path: 'profile',
        element: <AdminProfileLayout />,
        children: [
          { path: 'about', element: <AdminAboutPage /> },
          { path: 'edit', element: <AdminEditPage /> },
          { path: 'changePassword', element: <AdminChangePasswordPage /> }
        ]
      },
      { path: '*', element: <AdminNotFoundPage /> }
    ]
  }
]

const privateRouteMap = (routes) =>
  routes.map((route) => {
    if (route?.auth) {
      route.element = <AuthPrivateRoute>{route.element}</AuthPrivateRoute>
    }
    if (route?.student) {
      route.element = <StudentPrivateRoute>{route.element}</StudentPrivateRoute>
    }
    if (route?.teacher) {
      route.element = <TeacherPrivateRoute>{route.element}</TeacherPrivateRoute>
    }
    if (route?.admin) {
      route.element = <AdminPrivateRoute>{route.element}</AdminPrivateRoute>
    }
    if (route?.children) {
      route.children = privateRouteMap(route.children)
    }
    return route
  })

export default privateRouteMap(routes)
