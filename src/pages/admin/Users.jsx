import React from 'react'
import UserTable from '../../components/admin-userboard/usertable';

export default function Users() {
  const sampleUserData = [
    { username: 'John Doe', user_id: 'U12345', year: 'Senior', email: 'johndoe@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 5, points: 3200, status: 'Active', total_studytime: 120 },
    { username: 'Jane Smith', user_id: 'U12346', year: 'Junior', email: 'janesmith@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 4, points: 2800, status: 'Active', total_studytime: 100 },
    { username: 'Mike Taylor', user_id: 'U12347', year: 'Sophomore', email: 'miketaylor@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 3, points: 2200, status: 'Inactive', total_studytime: 80 },
    { username: 'Emily Clark', user_id: 'U12348', year: 'Freshman', email: 'emilyclark@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 1, points: 1000, status: 'Active', total_studytime: 60 },
    { username: 'Sarah Johnson', user_id: 'U12349', year: 'Post-Grad', email: 'sarahjohnson@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 6, points: 3400, status: 'Active', total_studytime: 130 },
    { username: 'George Williams', user_id: 'U12350', year: 'Senior', email: 'georgewilliams@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 5, points: 2900, status: 'Inactive', total_studytime: 110 },
    { username: 'Laura Brown', user_id: 'U12351', year: 'Junior', email: 'laurabrown@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 4, points: 2700, status: 'Active', total_studytime: 105 },
    { username: 'David Harris', user_id: 'U12352', year: 'Sophomore', email: 'davidharris@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 3, points: 2400, status: 'Active', total_studytime: 90 },
    { username: 'Sophia Moore', user_id: 'U12353', year: 'Freshman', email: 'sophiamoore@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 1, points: 1500, status: 'Inactive', total_studytime: 70 },
    { username: 'Chris Evans', user_id: 'U12354', year: 'Post-Grad', email: 'chrisevans@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 6, points: 3500, status: 'Active', total_studytime: 140 },
    { username: 'Jessica Lewis', user_id: 'U12355', year: 'Senior', email: 'jessicalewis@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 5, points: 3100, status: 'Active', total_studytime: 120 },
    { username: 'James White', user_id: 'U12356', year: 'Junior', email: 'jameswhite@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 4, points: 2500, status: 'Inactive', total_studytime: 100 },
    { username: 'Olivia Hall', user_id: 'U12357', year: 'Sophomore', email: 'oliviahall@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 3, points: 2300, status: 'Active', total_studytime: 85 },
    { username: 'Daniel Allen', user_id: 'U12358', year: 'Freshman', email: 'danielallen@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 1, points: 1200, status: 'Active', total_studytime: 65 },
    { username: 'Ella King', user_id: 'U12359', year: 'Post-Grad', email: 'ellaking@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 7, points: 3800, status: 'Active', total_studytime: 150 },
    { username: 'Liam Wright', user_id: 'U12360', year: 'Senior', email: 'liamwright@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 5, points: 3300, status: 'Active', total_studytime: 125 },
    { username: 'Ava Scott', user_id: 'U12361', year: 'Junior', email: 'avascott@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 4, points: 2600, status: 'Active', total_studytime: 110 },
    { username: 'Lucas Green', user_id: 'U12362', year: 'Sophomore', email: 'lucasgreen@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 3, points: 2000, status: 'Inactive', total_studytime: 75 },
    { username: 'Isabella Baker', user_id: 'U12363', year: 'Freshman', email: 'isabellabaker@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 1, points: 1300, status: 'Active', total_studytime: 60 },
    { username: 'Henry Turner', user_id: 'U12364', year: 'Post-Grad', email: 'henryturner@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 6, points: 3400, status: 'Active', total_studytime: 130 },
    { username: 'Mia Parker', user_id: 'U12365', year: 'Senior', email: 'miaparker@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 5, points: 3150, status: 'Inactive', total_studytime: 115 },
    { username: 'Noah Collins', user_id: 'U12366', year: 'Junior', email: 'noahcollins@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 4, points: 2700, status: 'Active', total_studytime: 95 },
    { username: 'Charlotte Adams', user_id: 'U12367', year: 'Sophomore', email: 'charlotteadams@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 3, points: 2250, status: 'Active', total_studytime: 85 },
    { username: 'Mason Murphy', user_id: 'U12368', year: 'Freshman', email: 'masonmurphy@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 2, points: 1100, status: 'Active', total_studytime: 55 },
    { username: 'Amelia Hughes', user_id: 'U12369', year: 'Post-Grad', email: 'ameliahughes@example.com', password: 'password123', avatar_image: 'https://via.placeholder.com/150', level: 6, points: 3600, status: 'Active', total_studytime: 140 },
    { username: 'Cusson Laohapatanawong', user_id: '66010988', year: 'Sophomore', email: 'cusson.spoon@gmail.com', password: 'ObviouslyNot', avatar_image: 'https://via.placeholder.com/150', level: 600, points: 600000, status: 'Active', total_studytime: 80000 },
    { username: 'Teemy Subarashi', user_id: '66011111', year: 'Sophomore', email: 'Teemy17@gmail.com', password: 'NegaButt', avatar_image: 'https://via.placeholder.com/150', level: 1000, points: 9999999999, status: 'Active', total_studytime: 89465132 },

  ];
  
  

  return (
    <div className="p-6 w-full">
      <UserTable users={sampleUserData} />
    </div>
  );
}