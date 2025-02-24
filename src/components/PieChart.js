import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  return (
    <div className="bg-white p-5 shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-4">Expenses by Head</h3>
      <div className="w-[350px] h-[350px] mx-auto">
        {data.labels ? <Pie data={data} /> : <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
};

export default PieChart;
