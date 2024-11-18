import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserLayout from "./components/UserLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorBoundary from "./pages/ErrorBoundary";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/AdminLayout";
import Users from "./pages/admin/Users";
import UserEdit from "./components/admin-userboard/user_edit.jsx";
import Leaderboard from "./pages/admin/Leaderboard";
import Courses from "./pages/admin/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Course from "./pages/Course.jsx";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import Category from "./pages/Category";
import CourseIdPage from "./pages/CourseIdPage.jsx";
import ChapterIdPage from "./pages/ChapterIdPage.jsx";
import Signup from "./pages/Signup.jsx";
import Quiz from "./pages/Quiz.jsx";
import AuthProvider from "./hooks/AuthContext.jsx";
import RouteGuard from "./hooks/RouteGuard.jsx";
import CourseVideos from "./pages/admin/CourseVideos.jsx";
import AdminGuard from "./hooks/AdminGuard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-courses",
        element: (
          <RouteGuard>
            <MyCourses />
          </RouteGuard>
        ),
      },
      {
        path: "course/:courseId",
        element: <CourseIdPage />,
        children: [
          {
            path: "chapter/:chapterId",
            element: <ChapterIdPage />,
          },
          {
            path: "quiz",
            element: <Quiz />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "category/:categoryId",
        element: <Category />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "dashboard",
        element: (
          
            <Dashboard />
         
        ),
      },
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: "edit",
            element: <UserEdit />,
          },
        ],
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "courses",
        element: (
          <AdminGuard>
            <Courses />
          </AdminGuard>
        ),
      },
      {
        path: "course/:courseId/videos",
        element: <CourseVideos />,
      },
      {
        path: "category",
        children: [
          {
            path: ":categoryId",
            element: <Category />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
