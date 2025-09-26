import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/Api";


const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/user/register", formData);
      setMessage(res.data.message || "Registered Successfully!");
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
      navigate("/")

    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Something Went Wrong❌");
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">

        {message && (
          <p className="mb-4 p-3 text-center rounded-lg bg-green-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            {message}
          </p>
        )}


        <h1 className="text-2xl font-bold  text-center text-gray-800 mb-6 dark:text-white">
          User Register
        </h1>

        <form className="space-y-4" onSubmit={handelSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter Your Full Name"
              value={formData.fullName}
              onChange={handelChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="email"
              id="email"
              type="email"
              placeholder="Enter Your email"
              value={formData.email}
              onChange={handelChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handelChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link to="/user/login" className="text-blue-600 hover:underline gap-4">
            login
          </Link>
        </p>


      </div>
    </div>
  );
};

export default UserRegister;
