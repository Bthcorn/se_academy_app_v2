import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserLayout from "./components/UserLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorBoundary from "./pages/ErrorBoundary";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/AdminLayout";
import Users from "./pages/admin/Users";
import Feedback from "./pages/admin/Feedback";
import Leaderboard from "./pages/admin/Leaderboard";
import Settings from "./pages/admin/Settings";
import Themes from "./pages/admin/Themes";
import Courses from "./pages/admin/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UCourses from "./pages/UCourses";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import Category from "./pages/Category";
import UCousesDetails from "./pages/UCousesDetails";

// const isAuthenticated = () => {
//   return localStorage.getItem("token") ? true : false;
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<UCourses />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="courses-details/:courseId" element={<UCousesDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="category/:categoryId" element={<Category />} />
      </Route>
      ,
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="themes" element={<Themes />} />
        <Route path="courses" element={<Courses />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
