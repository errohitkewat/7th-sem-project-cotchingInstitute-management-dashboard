import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Attendance } from "../pages/Attendance";
import { Courses } from "../pages/Courses";
import { Dashboard } from "../pages/Dashboard";
import { Exams } from "../pages/Exams";
import { Fees } from "../pages/Fees";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Notices } from "../pages/Notices";
import { Profile } from "../pages/Profile";
import { Register } from "../pages/Register";
import { Reports } from "../pages/Reports";
import { Settings } from "../pages/Settings";
import { StudentDetails } from "../pages/StudentDetails";
import { Students } from "../pages/Students";
import { Teachers } from "../pages/Teachers";
import { Timetable } from "../pages/Timetable";

// import { ResourceDetails } from "../pages/ResourceDetails";
// import { ResourceEdit } from "../pages/ResourceEdit";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/students", element: <Students /> },
          { path: "/students/:id", element: <StudentDetails /> },
          { path: "/teachers", element: <Teachers /> },
          { path: "/courses", element: <Courses /> },
          { path: "/attendance", element: <Attendance /> },
          { path: "/fees", element: <Fees /> },
          { path: "/exams", element: <Exams /> },
          { path: "/notices", element: <Notices /> },
          { path: "/timetable", element: <Timetable /> },
          { path: "/reports", element: <Reports /> },
          { path: "/settings", element: <Settings /> },
          { path: "/profile", element: <Profile /> },
          { path: "*", element: <NotFound /> },


          // {
          //   path: "/details",
          //   element: <ResourceDetails />,
          // },
          // {
          //   path: "/edit",
          //   element: <ResourceEdit />,
          // },



        ],
      },
    ],
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
