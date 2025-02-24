import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Widget from "../components/Widget";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { MdBarChart } from "react-icons/md";
import axios from "axios";

const Dashboard = () => {
  const [expenseHeads, setExpenseHeads] = useState([]);
  const [pieChartData, setPieChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenseHeads();
    fetchExpenseReports();
  }, []);

  // Fetch expense heads with total amounts
  const fetchExpenseHeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/expenses/heads", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setExpenseHeads(response.data);
  
      // Update Pie Chart Data
      setPieChartData({
        labels: response.data.map((head) => head.name),
        datasets: [
          {
            data: response.data.map((head) => head.total_amount),
            backgroundColor: ["#4318FF", "#6AD2FF", "#EFF4FB", "#FFB800"],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching expense heads:", error);
    }
  };
  

  // Fetch expenses over time for Bar Chart
  const fetchExpenseReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/expenses/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Organize expenses per date
      const groupedData = response.data.reduce((acc, expense) => {
        const date = expense.timestamp.split("T")[0]; // Extract YYYY-MM-DD
        acc[date] = (acc[date] || 0) + expense.amount;
        return acc;
      }, {});

      // Prepare Bar Chart Data
      setBarChartData({
        labels: Object.keys(groupedData),
        datasets: [
          {
            label: "Daily Expenses",
            data: Object.values(groupedData),
            backgroundColor: "#6AD2FF",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching expense reports:", error);
    }
  };

  return (
    <div className="w-full p-5">
      <Navbar />

      {/* ✅ Buttons for Actions */}
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={() => navigate("/add-expense")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Add Expense
        </button>
        <button
          onClick={() => navigate("/manage-expenses")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Manage Expenses
        </button>
      </div>

      {/* ✅ Expense Head Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {expenseHeads.map((head) => (
          <Widget
            key={head.id}
            icon={<MdBarChart className="h-7 w-7" />}
            title={head.name}
            subtitle={`Ksh. ${head.total_amount}`}
          />
        ))}
      </div>

      {/* ✅ Charts */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <PieChart data={pieChartData} />
        <BarChart data={barChartData} />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
