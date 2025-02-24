import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Revenue",
      data: [100, 200, 300, 250, 400],
      borderColor: "blue",
      borderWidth: 2,
    },
  ],
};

const Chart = () => {
  return (
    <div className="bg-white p-5 shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-4">Revenue Growth</h3>
      <Line data={data} />
    </div>
  );
};

export default Chart;
