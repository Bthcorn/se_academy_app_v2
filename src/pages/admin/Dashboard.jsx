import React, {useState, useEffect} from "react";
import axios from "axios";
import { Config } from "../../components/config";
import { Eye, User, UserPlus, Star } from "lucide-react";
import RecentEnrolled from "../../components/admin-dashboard/recent_enrolled";
import TopPageCard from "../../components/admin-dashboard/toppagecard";
import UserByYear from "../../components/admin-dashboard/userbyyear";
import EnrolledVsStudiedLineGraph from "../../components/admin-dashboard/enrolled_vs_studied_linegraph";
import TotalEnrolledBarChart from "../../components/admin-dashboard/totalenrolled_barchart";
import TotalStudiedBarChart from "../../components/admin-dashboard/totalstudied_barchart";

export default function Dashboard() {
  // Fetch all users from the api
  const fetch_users = async () => {
    try {
      const response = await axios.get(Config.API_URL + `/user/get_all`, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all enrollments from the api
  const fetch_enrollments = async () => {
    try {
      const response = await axios.get(Config.API_URL + `/enrolled_course/get_all`, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  // fetch enrollments summary
  const fetch_enrollments_summary = async () => {
    try {
      const response = await axios.get(Config.API_URL + `/enrolled_course/get_enrollment_summary`, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching enrollments summary:", error);
    }
  };
  

  // Fetch all courses from the api
  const fetch_courses = async () => {
    try {
      const response = await axios.get(Config.API_URL + `/course/get_courses`, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

    // Fetch all achievements from the api
  const fetch_achievements = async () => {
    try {
      const response = await axios.get(Config.API_URL + `/achievement/get_all`, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  // Fetch all quizzes from the api
  const fetch_quizzes = async () => {
    try {
      const response = await axios.get(Config.API_URL + `/quiz/get_all`, {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };


  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [enrollments_summary, setEnrollmentsSummary] = useState([]);
  const [courses, setCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      const data = await fetch_users();
      setUsers(data);
    };
    const fetchAndSetEnrollments = async () => {
      const data = await fetch_enrollments();
      setEnrollments(data);
    };
    const fetchAndSetEnrollmentsSummary = async () => {
      const data = await fetch_enrollments_summary();
      setEnrollmentsSummary(data);
    };
    const fetchAndSetCourses = async () => {
      const data = await fetch_courses();
      setCourses(data);
    };
    const fetchAndSetAchievements = async () => {
      const data = await fetch_achievements();
      setAchievements(data);
    };
    const fetchAndSetQuizzes = async () => {
      const data = await fetch_quizzes();
      setQuizzes(data);
    };

    fetchAndSetUsers();
    fetchAndSetEnrollments();
    fetchAndSetEnrollmentsSummary();
    fetchAndSetCourses();
    fetchAndSetAchievements();
    fetchAndSetQuizzes();
  }, []);
  
  // Data that will be displayed in the top page cards
  var first_field_data = users.length;
  var second_field_data = courses.length;
  var third_field_data = achievements.length;
  var forth_field_data = quizzes.length;

  // Data for Doughnut chart
  const students_per_year_data = {
    "first year": users.filter((user) => user.role.toLowerCase() === "freshman").length,
    "second year": users.filter((user) => user.role.toLowerCase() === "sophomore").length,
    "third year": users.filter((user) => user.role.toLowerCase() === "junior").length,
    "fourth year": users.filter((user) => user.role.toLowerCase() === "senior").length,
    "graduated": users.filter((user) => user.role.toLowerCase() === "graduated").length,
  };

  var enrolled_vs_studied_data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    enrolled: enrollments_summary,
    studied: [3, 8, 13, 6, 10, 7, 12, 17, 16, 21, 14, 23],
  };

  return (
    <>
      <div className="grid min-h-screen grid-cols-4 gap-6">
        <h1 className="col-span-4 text-3xl font-bold">Welcome back, Admin</h1>
        <p className="col-span-4">Observe various reports and activities</p>
        {/* First row - 4 fields */}
        <div className="col-span-4 flex justify-between">
          <TopPageCard
            title="Users"
            count={first_field_data}
            percentage=" xx.x %"
            icon={<Eye size={20} className="text-gray-400" />}
            isIncrease={true}
          />
          <TopPageCard
            title="Courses"
            count={second_field_data}
            percentage="xx.x %"
            icon={<User size={20} className="text-gray-400" />}
            isIncrease={false}
          />
          <TopPageCard
            title="Achievements"
            count={third_field_data}
            percentage="xx.x%"
            icon={<UserPlus size={20} className="text-gray-400" />}
            isIncrease={true}
          />
          <TopPageCard
            title="Quizzes"
            count={forth_field_data}
            percentage="xx.x%"
            icon={<Star size={20} className="text-gray-400" />}
            isIncrease={true}
          />
        </div>

        {/* Second row - Large chart on the left, two smaller charts stacked on the right */}
        <div className="col-span-2 rounded-lg bg-[#1E293B] p-4 shadow-lg">
          <EnrolledVsStudiedLineGraph data={enrolled_vs_studied_data} />
        </div>

        <div className="col-span-2 grid grid-rows-2 gap-4">
          {/* Two smaller components stacked vertically */}
          <div className="rounded-lg bg-[#1E293B] p-4 shadow-lg">
            <TotalEnrolledBarChart data={enrolled_vs_studied_data} />
          </div>
          <div className="rounded-lg bg-[#1E293B] p-4 shadow-lg">
            <TotalStudiedBarChart data={enrolled_vs_studied_data} />
          </div>
        </div>

        {/* Third row - Half doughnut chart (UserByYear) and Recent Enrolled */}
        <div className="col-span-2 row-span-1 rounded-lg bg-[#1E293B] p-4 shadow-lg">
          <UserByYear data={students_per_year_data} />
        </div>

        <div className="col-span-2 row-span-1 rounded-lg bg-[#1E293B] p-4 shadow-lg">
          <RecentEnrolled data={enrollments} />
        </div>
      </div>
    </>
  );
}
