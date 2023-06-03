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
import ApplicationCompletedPage from './Student/InternshipForm/ApplicationCompletedPage'
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
import TeacherProfileLayout from './Teacher/profile/ProfileLayout'
import TeacherAboutPage from './Teacher/profile/AboutPage'
import TeacherEditPage from './Teacher/profile/EditPage'
import TeacherChangePasswordPage from './Teacher/profile/ChangePasswordPage'
import TeacherNotFoundPage from './Teacher/NotFoundPage'
// PrivateRoute
import AuthPrivateRoute from '../components/System/AuthPrivateRoute'
import StudentPrivateRoute from '../components/System/StudentPrivateRoute'
import TeacherPrivateRoute from '../components/System/TeacherPrivateRoute'

const routes = [
  {
    path: '/',
    element: <GeneralLayout />,
    auth: true,
    children: [
      { index: true, element: <UserLoginPage /> },
      { path: 'register', element: <UserRegisterPage /> },
      { path: 'forgotPassword', element: <ForgotPasswordPage /> },
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
          { path: 'companyApproval', element: <CompanyApprovalPage /> },
          { path: 'companyApprovalWait', element: <CompanyApprovalWaitPage /> },
          { path: 'consultantApprovalWait', element: <ConsultantApprovalWaitPage />},
          { path: 'applicationCompleted', element: <ApplicationCompletedPage />}
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
    if (route?.children) {
      route.children = privateRouteMap(route.children)
    }
    return route
  })

export default privateRouteMap(routes)
