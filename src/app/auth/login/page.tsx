"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Static credentials
const STATIC_CREDENTIALS = {
  email: "admin@fhir.com",
  password: "admin123",
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      // Check static credentials
      if (
        email === STATIC_CREDENTIALS.email &&
        password === STATIC_CREDENTIALS.password
      ) {
        // Store token in localStorage
        localStorage.setItem("accessToken", "static-token-12345");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", "Admin User");
        localStorage.setItem("userRoleID", "1");
        localStorage.setItem("userRole", "Administrator");

        // Redirect to workspace
        router.push("/workspace/patients");
      } else {
        setError("Invalid email or password. Try: admin@fhir.com / admin123");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/office-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/20"></div>

      {/* FHIR Logo in Bottom Right */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-2xl">FHIR</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-20 bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">FHIR</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">FHIR Health</h1>
            <p className="text-sm text-gray-600">Information System</p>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome Back!
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          {/* Helper Text */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Demo credentials: admin@fhir.com / admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
