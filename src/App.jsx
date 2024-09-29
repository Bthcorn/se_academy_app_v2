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
import Feedback from "./pages/admin/Feedback";
import Leaderboard from "./pages/admin/Leaderboard";
import Settings from "./pages/admin/Settings";
import Themes from "./pages/admin/Themes";
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
            path: "quiz/:quizId",
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
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
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
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "themes",
        element: <Themes />,
      },
      {
        path: "courses",
        element: <Courses />,
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
