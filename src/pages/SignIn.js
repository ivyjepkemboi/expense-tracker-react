import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username: email,  // Adjust field names based on your backend
        password: password,
      });

      // Store token in localStorage
      localStorage.setItem("token", response.data.access_token);
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Section - Sign In Form */}
      <div className="flex w-full flex-col justify-center items-center px-6 lg:w-1/2">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Sign In</h2>
        <p className="mb-6 text-gray-600">Enter your email and password to sign in!</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignIn} className="w-full max-w-xs">
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username*</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-3 text-white font-medium hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-sm text-gray-600">
  Not registered yet?
  <a href="/signup" className="ml-1 text-blue-500 hover:text-blue-600">
    Create an account
  </a>
</p>

      </div>
    </div>
  );
}
