import React from "react";
import AddExpense from "../components/AddExpense";
import { useNavigate } from "react-router-dom";

const AddExpensePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-5">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">Add New Expense</h1>

      {/* Expense Form Component */}
      <AddExpense refreshDashboard={() => {}} />
    </div>
  );
};

export default AddExpensePage;
