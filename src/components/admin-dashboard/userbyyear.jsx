import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserByYear({ data }) {
  // Sample data structure: data will be passed via props
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Users by Year',
        data: Object.values(data),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 0,
      },
    ],
  };

  // Options to create the half-doughnut effect
  const options = {
    rotation: -90, // Start from the top
    circumference: 180, // Only show half of the doughnut
    cutout: '70%', // Adjust the size of the inner hole
    plugins: {
      legend: {
        display: false, // Hiding default legend to customize it
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false, // Allow for custom height and width
  };

  // Calculate total users for display
  const totalUsers = Object.values(data).reduce((acc, num) => acc + num, 0);

  return (
    <div className="p-4 bg-[#1E293B] rounded-lg shadow-lg w-full">
      {/* Render Half-Doughnut Chart with Reduced Height and Width */}
      <div className="flex justify-center">
        <div style={{ width: '300px', height: '300px' }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </div>

      {/* Display Total Users below the chart */}
      <div className="flex justify-center items-center my-4">
        <h2 className="text-lg font-semibold text-white">{totalUsers}</h2>
      </div>

      <div className="flex justify-center items-center text-gray-400 text-xs mb-4">
        <p>Users by Year</p>
      </div>

      {/* Custom Legend */}
      {Object.keys(data).map((year, index) => (
        <div key={index} className="flex justify-between text-white mt-4">
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}></span>
            <p>{year}</p>
          </div>
          <p className="text-gray-400">{Object.values(data)[index]}</p>
        </div>
      ))}
    </div>
  );
}
