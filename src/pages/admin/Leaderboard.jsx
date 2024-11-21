import React, { useEffect } from "react";
import Leaderboard_component from "../../components/admin-leaderboard/leaderboard_component";
import axios from "axios";
import { Config } from "../../components/config";

export default function Leaderboard() {
  const sampleUserData = [
    {
      username: "John Doe",
      user_id: "U12345",
      year: "Senior",
      email: "johndoe@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 5,
      points: 3200,
      status: "Active",
      total_studytime: 120,
    },
    {
      username: "Jane Smith",
      user_id: "U12346",
      year: "Junior",
      email: "janesmith@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 4,
      points: 2800,
      status: "Active",
      total_studytime: 100,
    },
    {
      username: "Mike Taylor",
      user_id: "U12347",
      year: "Sophomore",
      email: "miketaylor@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 3,
      points: 2200,
      status: "Inactive",
      total_studytime: 80,
    },
    {
      username: "Emily Clark",
      user_id: "U12348",
      year: "Freshman",
      email: "emilyclark@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 1,
      points: 1000,
      status: "Active",
      total_studytime: 60,
    },
    {
      username: "Sarah Johnson",
      user_id: "U12349",
      year: "Post-Grad",
      email: "sarahjohnson@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 6,
      points: 3400,
      status: "Active",
      total_studytime: 130,
    },
    {
      username: "George Williams",
      user_id: "U12350",
      year: "Senior",
      email: "georgewilliams@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 5,
      points: 2900,
      status: "Inactive",
      total_studytime: 110,
    },
    {
      username: "Laura Brown",
      user_id: "U12351",
      year: "Junior",
      email: "laurabrown@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 4,
      points: 2700,
      status: "Active",
      total_studytime: 105,
    },
    {
      username: "David Harris",
      user_id: "U12352",
      year: "Sophomore",
      email: "davidharris@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 3,
      points: 2400,
      status: "Active",
      total_studytime: 90,
    },
    {
      username: "Sophia Moore",
      user_id: "U12353",
      year: "Freshman",
      email: "sophiamoore@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 1,
      points: 1500,
      status: "Inactive",
      total_studytime: 70,
    },
    {
      username: "Chris Evans",
      user_id: "U12354",
      year: "Post-Grad",
      email: "chrisevans@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 6,
      points: 3500,
      status: "Active",
      total_studytime: 140,
    },
    {
      username: "Jessica Lewis",
      user_id: "U12355",
      year: "Senior",
      email: "jessicalewis@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 5,
      points: 3100,
      status: "Active",
      total_studytime: 120,
    },
    {
      username: "James White",
      user_id: "U12356",
      year: "Junior",
      email: "jameswhite@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 4,
      points: 2500,
      status: "Inactive",
      total_studytime: 100,
    },
    {
      username: "Olivia Hall",
      user_id: "U12357",
      year: "Sophomore",
      email: "oliviahall@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 3,
      points: 2300,
      status: "Active",
      total_studytime: 85,
    },
    {
      username: "Daniel Allen",
      user_id: "U12358",
      year: "Freshman",
      email: "danielallen@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 1,
      points: 1200,
      status: "Active",
      total_studytime: 65,
    },
    {
      username: "Ella King",
      user_id: "U12359",
      year: "Post-Grad",
      email: "ellaking@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 7,
      points: 3800,
      status: "Active",
      total_studytime: 150,
    },
    {
      username: "Liam Wright",
      user_id: "U12360",
      year: "Senior",
      email: "liamwright@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 5,
      points: 3300,
      status: "Active",
      total_studytime: 125,
    },
    {
      username: "Ava Scott",
      user_id: "U12361",
      year: "Junior",
      email: "avascott@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 4,
      points: 2600,
      status: "Active",
      total_studytime: 110,
    },
    {
      username: "Lucas Green",
      user_id: "U12362",
      year: "Sophomore",
      email: "lucasgreen@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 3,
      points: 2000,
      status: "Inactive",
      total_studytime: 75,
    },
    {
      username: "Isabella Baker",
      user_id: "U12363",
      year: "Freshman",
      email: "isabellabaker@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 1,
      points: 1300,
      status: "Active",
      total_studytime: 60,
    },
    {
      username: "Henry Turner",
      user_id: "U12364",
      year: "Post-Grad",
      email: "henryturner@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 6,
      points: 3400,
      status: "Active",
      total_studytime: 130,
    },
    {
      username: "Mia Parker",
      user_id: "U12365",
      year: "Senior",
      email: "miaparker@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 5,
      points: 3150,
      status: "Inactive",
      total_studytime: 115,
    },
    {
      username: "Noah Collins",
      user_id: "U12366",
      year: "Junior",
      email: "noahcollins@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 4,
      points: 2700,
      status: "Active",
      total_studytime: 95,
    },
    {
      username: "Charlotte Adams",
      user_id: "U12367",
      year: "Sophomore",
      email: "charlotteadams@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 3,
      points: 2250,
      status: "Active",
      total_studytime: 85,
    },
    {
      username: "Mason Murphy",
      user_id: "U12368",
      year: "Freshman",
      email: "masonmurphy@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 2,
      points: 1100,
      status: "Active",
      total_studytime: 55,
    },
    {
      username: "Amelia Hughes",
      user_id: "U12369",
      year: "Post-Grad",
      email: "ameliahughes@example.com",
      password: "password123",
      avatar_image: "https://via.placeholder.com/150",
      level: 6,
      points: 3600,
      status: "Active",
      total_studytime: 140,
    },
    {
      username: "Cusson Laohapatanawong",
      user_id: "66010988",
      year: "Sophomore",
      email: "cusson.spoon@gmail.com",
      password: "ObviouslyNot",
      avatar_image:
        "https://upload-os-bbs.hoyolab.com/upload/2023/11/14/287007142/f77db0dc92f337be5a6c1752ae5cb00f_2479854509814665732.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70",
      level: 1000,
      points: 600000,
      status: "Active",
      total_studytime: 1000000,
    },
    {
      username: "Teemy Subarashi",
      user_id: "66011111",
      year: "Sophomore",
      email: "Teemy17@gmail.com",
      password: "supbro",
      avatar_image: "https://via.placeholder.com/150",
      level: 999,
      points: 500000,
      status: "Active",
      total_studytime: 90000,
    },
  ];

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [userImages, setUserImages] = React.useState({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get(Config.API_URL + "/user/get_all", {
        headers: {
          Authorization: Config.AUTH_TOKEN(),
        },
      });

      if (response.status === 200) {
        setUsers(response.data);
        for (let i = 0; i < response.data.length; i++) {
          const user = response.data[i];
          try {
            const response = await axios.get(user.avatar, {
              headers: {
                Authorization: Config.AUTH_TOKEN(),
              },
            });
            setUserImages((prev) => ({
              ...prev,
              [user.id]: `data:image/jpeg;base64,${response.data}`,
            }));
          } catch (error) {
            console.error(
              "Error fetching image for user:",
              user.user_id,
              error,
            );
          }
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Users:", users);

  return (
    <div className="w-full p-6">
      <Leaderboard_component users={users} userImages={userImages} />
    </div>
  );
}
