import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageExpenses = () => {
  const [expenseHeads, setExpenseHeads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedHead, setSelectedHead] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newHead, setNewHead] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenseHeads();
  }, []);

  // Fetch Expense Heads
  const fetchExpenseHeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://expense-tracker-flask-c0dd.onrender.com/expenses/heads", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setExpenseHeads(response.data);
    } catch (error) {
      console.error("Error fetching expense heads:", error);
    }
  };
  

  // Fetch Categories based on Expense Head
  const fetchCategories = async (headId) => {
    if (!headId) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://expense-tracker-flask-c0dd.onrender.com/expenses/categories/${headId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add Expense Head
  const addExpenseHead = async () => {
    if (!newHead) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://expense-tracker-flask-c0dd.onrender.com/expenses/heads",
        { name: newHead },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewHead("");
      fetchExpenseHeads();
    } catch (error) {
      console.error("Error adding expense head:", error);
    }
  };

  // Add Category
  const addCategory = async () => {
    if (!newCategory || !selectedHead) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://expense-tracker-flask-c0dd.onrender.com/expenses/categories",
        { name: newCategory, head_id: selectedHead },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewCategory("");
      fetchCategories(selectedHead);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Add Subcategory
  const addSubcategory = async () => {
    if (!newSubcategory || !selectedCategory) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://expense-tracker-flask-c0dd.onrender.com/expenses/subcategories",
        { name: newSubcategory, category_id: selectedCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewSubcategory("");
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <div className="w-full p-5">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">Manage Expense Data</h1>

      {/* Add Expense Head */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-2">Add Expense Head</h2>
        <input
          type="text"
          value={newHead}
          onChange={(e) => setNewHead(e.target.value)}
          placeholder="Enter Expense Head Name"
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <button
          onClick={addExpenseHead}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Expense Head
        </button>
      </div>

      {/* Add Category */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-2">Add Category</h2>
        <select
          value={selectedHead}
          onChange={(e) => {
            setSelectedHead(e.target.value);
            fetchCategories(e.target.value);
          }}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        >
          <option value="">Select Expense Head</option>
          {expenseHeads.map((head) => (
            <option key={head.id} value={head.id}>
              {head.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter Category Name"
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <button
          onClick={addCategory}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {/* Add Subcategory */}
      <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-2">Add Subcategory</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
          placeholder="Enter Subcategory Name"
          className="w-full px-4 py-2 border rounded-lg mb-2"
        />
        <button
          onClick={addSubcategory}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Subcategory
        </button>
      </div>
    </div>
  );
};

export default ManageExpenses;
