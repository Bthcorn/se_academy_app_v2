import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserByYear({ data }) {
  const { darkMode } = useTheme(); // Access theme state

  const lightColors = ["#ffd3ee", "#ffc8ea", "#ffb1e1", "#ff8ed3", "#ff3bb2"];
  const darkColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Users by Year",
        data: Object.values(data),
        backgroundColor: darkMode ? darkColors : lightColors,
        hoverBackgroundColor: darkMode ? darkColors : lightColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90, // Start from the top
    circumference: 180, // Only show half of the doughnut
    cutout: "70%", // Adjust the size of the inner hole
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false, // Allow for custom height and width
  };

  const totalUsers = Object.values(data).reduce((acc, num) => acc + num, 0);

  return (
    <div
      className={`p-4 rounded-lg shadow-lg w-full ${
        darkMode ? "bg-[#1E293B]" : "bg-light-accent"
      }`}
    >
      {/* Render Half-Doughnut Chart */}
      <div className="flex justify-center">
        <div style={{ width: "300px", height: "300px" }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </div>

      {/* Display Total Users below the chart */}
      <div className="flex justify-center items-center my-4">
        <h2
          className={`text-lg font-semibold ${
            darkMode ? "text-white" : "text-light-foreground"
          }`}
        >
          {totalUsers}
        </h2>
      </div>

      <div
        className={`flex justify-center items-center text-xs mb-4 ${
          darkMode ? "text-gray-400" : "text-light-muted"
        }`}
      >
        <p>Users by Year</p>
      </div>

      {/* Custom Legend */}
      {Object.keys(data).map((year, index) => (
        <div key={index} className="flex justify-between mt-4">
          <div className="flex items-center">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{
                backgroundColor: chartData.datasets[0].backgroundColor[index],
              }}
            ></span>
            <p
              className={`${
                darkMode ? "text-white" : "text-light-foreground"
              }`}
            >
              {year}
            </p>
          </div>
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-light-muted"
            }`}
          >
            {Object.values(data)[index]}
          </p>
        </div>
      ))}
    </div>
  );
}
