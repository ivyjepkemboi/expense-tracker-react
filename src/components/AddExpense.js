import React, { useState, useEffect } from "react";
import axios from "axios";

const AddExpense = ({ refreshDashboard }) => {
  const [expenseHeads, setExpenseHeads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedHead, setSelectedHead] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

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

  // Fetch Categories based on selected Expense Head
  const fetchCategories = async (headId) => {
    if (!headId) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://expense-tracker-flask-c0dd.onrender.com//expenses/categories/${headId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
      setSelectedCategory("");
      setSubcategories([]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch Subcategories based on selected Category
  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://expense-tracker-flask-c0dd.onrender.com/expenses/subcategories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubcategories(response.data);
      setSelectedSubcategory("");
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !amount) {
      setError("Title, Amount, and Expense Head are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/expenses/add",
        {
          title,
          amount,
          subcategory_id: selectedSubcategory,
          description, // Optional
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear form fields
      setTitle("");
      setAmount("");
      setDescription("");
      setSelectedHead("");
      setSelectedCategory("");
      setSelectedSubcategory("");

      // Refresh dashboard
      if (refreshDashboard) refreshDashboard();
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add New Expense</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Expense Head Selection */}
        <label className="block text-sm font-medium text-gray-700">Expense Head*</label>
        <select
          value={selectedHead}
          onChange={(e) => {
            setSelectedHead(e.target.value);
            fetchCategories(e.target.value);
          }}
          className="w-full border rounded-lg px-4 py-2 mb-4"
          required
        >
          <option value="">Select Expense Head</option>
          {expenseHeads.map((head) => (
            <option key={head.id} value={head.id}>
              {head.name}
            </option>
          ))}
        </select>

        {/* Category Selection */}
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            fetchSubcategories(e.target.value);
          }}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategory Selection */}
        <label className="block text-sm font-medium text-gray-700">Subcategory*</label>
        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Title Input */}
        <label className="block text-sm font-medium text-gray-700">Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
          required
        />

        {/* Amount Input */}
        <label className="block text-sm font-medium text-gray-700">Amount (Kshs.)*</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
          required
        />

        {/* Description (Optional) */}
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        ></textarea>

        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
