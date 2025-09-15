import React from "react";
import { Link } from "react-router-dom";

const FoodPartnerRegister = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold  text-center text-gray-800 mb-6 dark:text-white">
          FoodPartner Register
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="Enter Your Full Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="email"
              placeholder="Enter Your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Details
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="Enter Your Contact Details"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              address
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              placeholder="Enter Your address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>

          <button className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/food-partner/login"
            className="text-blue-600 hover:underline"
          >
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
