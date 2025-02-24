import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("https://expense-tracker-flask-c0dd.onrender.com/auth/signup", {
        username,
        password,
      });

      setSuccess("Account created successfully! Redirecting to Sign In...");
      
      setTimeout(() => {
        navigate("/signin"); // Redirect to Sign In page after 2 seconds
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Section - Sign Up Form */}
      <div className="flex w-full flex-col justify-center items-center px-6 lg:w-1/2">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Sign Up</h2>
        <p className="mb-6 text-gray-600">Create an account to start tracking your expenses.</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSignUp} className="w-full max-w-xs">
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username*</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm Password*</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-green-500 py-3 text-white font-medium hover:bg-green-600"
          >
            Create Account
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?
          <a href="/signin" className="ml-1 text-blue-500 hover:text-blue-600">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
