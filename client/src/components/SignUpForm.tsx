import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../api/services";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comfirmedPassword, setComfirmedPassword] = useState<string>("");
  const [showComfirmedPassword, setShowComfirmedPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordMatchMessage, setPasswordMatchMessage] = useState<string | null>(null);

  const handlePasswordChange = (value: string) => {
    setComfirmedPassword(value);
    if (value !== password) {
      setPasswordMatchMessage("Passwords do not match");
    } else {
      setPasswordMatchMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== comfirmedPassword) {
      setPasswordMatchMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      console.log(response.data);
      navigate("/login");
      if (response.status === 201) {
        console.log("User created successfully");

        setPasswordMatchMessage(null);
        console.log("Sign-up attempted with:", { name, email, password });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Database Connection Error:", error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full bg-white max-w-md rounded-lg shadow-xl p-8">
        <h1 className="font-bold text-emerald-800 text-2xl mb-6 text-center">
          Sign Up for Washington Trails
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-md border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border rounded-md border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showComfirmedPassword ? "text" : "password"}
                id="confirm-password"
                className="w-full px-3 py-2 border rounded-md border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
                value={comfirmedPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowComfirmedPassword(!showComfirmedPassword)}
              >
                {showComfirmedPassword ? (
                  <Eye size={24} />
                ) : (
                  <EyeOff size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Conditional Alert Message */}
          {passwordMatchMessage && (
            <div className="mb-4 text-red-600 font-medium text-sm">
              {passwordMatchMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-bold py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
