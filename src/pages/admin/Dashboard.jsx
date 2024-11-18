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

  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      const data = await fetch_users();
      setUsers(data); // Store the fetched data in state
    };
    const fetchAndSetEnrollments = async () => {
      const data = await fetch_enrollments();
      setEnrollments(data); // Store the fetched data in state
    };

    fetchAndSetUsers(); // Call the async function
    fetchAndSetEnrollments(); // Call the async function
  }, []);
  // const users = await fetch_users();
  console.log(users);
  
  var recent_enrolled_data = [
    {
      username: "Jane Doe",
      enrolled_at: "Sep 10, 2024",
      course_name: "Calculus 1",
      course_id: "C101",
      status: "Approved",
      course_length: 20,
    },
    {
      username: "Jane Smith",
      enrolled_at: "Aug 24, 2024",
      course_name: "Computer Organization",
      course_id: "C102",
      status: "Pending",
      course_length: 25,
    },
    {
      username: "Mike Taylor",
      enrolled_at: "Sep 13, 2024",
      course_name: "Digital Circuit",
      course_id: "C103",
      status: "Approved",
      course_length: 18,
    },
    {
      username: "Emily Clark",
      enrolled_at: "Aug 18, 2024",
      course_name: "Introduction to Logic",
      course_id: "C104",
      status: "Approved",
      course_length: 30,
    },
    {
      username: "Teemy Subarashi",
      enrolled_at: "Sep 16, 2024",
      course_name: "Probability and Statistics",
      course_id: "C105",
      status: "Rejected",
      course_length: 22,
    },
    {
      username: "David Wilson",
      enrolled_at: "Sep 22, 2024",
      course_name: "Physics",
      course_id: "C106",
      status: "Approved",
      course_length: 35,
    },
    {
      username: "Laura Martinez",
      enrolled_at: "Sep 23, 2024",
      course_name: "Biology",
      course_id: "C107",
      status: "Pending",
      course_length: 28,
    },
    {
      username: "James Brown",
      enrolled_at: "Sep 24, 2024",
      course_name: "Chemistry",
      course_id: "C108",
      status: "Approved",
      course_length: 40,
    },
    {
      username: "Sophia Davis",
      enrolled_at: "Sep 25, 2024",
      course_name: "English Literature",
      course_id: "C109",
      status: "Rejected",
      course_length: 18,
    },
    {
      username: "Michael Lee",
      enrolled_at: "Sep 26, 2024",
      course_name: "Algebra",
      course_id: "C110",
      status: "Approved",
      course_length: 32,
    },
    {
      username: "Olivia Harris",
      enrolled_at: "Sep 27, 2024",
      course_name: "Economics",
      course_id: "C111",
      status: "Pending",
      course_length: 24,
    },
    {
      username: "Daniel Evans",
      enrolled_at: "Sep 28, 2024",
      course_name: "History",
      course_id: "C112",
      status: "Approved",
      course_length: 45,
    },
  ];

  var first_field_data = 451;
  var second_field_data = 10;
  var third_field_data = 200;
  var forth_field_data = 1000;

  // Data for Doughnut chart
  const students_per_year_data = {
    "first year": users.filter((user) => user.role.toLowerCase() === "freshman").length,
    "second year": users.filter((user) => user.role.toLowerCase() === "sophomore").length,
    "third year": users.filter((user) => user.role.toLowerCase() === "junior").length,
    "fourth year": users.filter((user) => user.role.toLowerCase() === "senior").length,
    "graduated": users.filter((user) => user.role.toLowerCase() === "graduated").length,
  };

  console.log("Enrollments: ");
  console.log(enrollments);
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
    enrolled: [5, 10, 15, 7, 12, 9, 14, 20, 18, 22, 17, 25],
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
            title="First Field"
            count={first_field_data}
            percentage=" xx.x %"
            icon={<Eye size={20} className="text-gray-400" />}
            isIncrease={true}
          />
          <TopPageCard
            title="Second Field"
            count={second_field_data}
            percentage="xx.x %"
            icon={<User size={20} className="text-gray-400" />}
            isIncrease={false}
          />
          <TopPageCard
            title="Third Field"
            count={third_field_data}
            percentage="xx.x%"
            icon={<UserPlus size={20} className="text-gray-400" />}
            isIncrease={true}
          />
          <TopPageCard
            title="Forth Field"
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
          <RecentEnrolled data={recent_enrolled_data} />
        </div>
      </div>
    </>
  );
}
