import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = ({ data }) => {
  return (
    <div className="bg-white p-5 shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-4">Daily Expenses</h3>
      {data.labels ? <Bar data={data} /> : <p className="text-center">Loading...</p>}
    </div>
  );
};

export default BarChart;
