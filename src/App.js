import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Tables from "./pages/Tables";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddExpensePage from "./pages/AddExpensePage";
import ManageExpenses from "./pages/ManageExpenses";

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1 p-5">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/add-expense" element={<AddExpensePage />} />
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/manage-expenses" element={<ManageExpenses />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
