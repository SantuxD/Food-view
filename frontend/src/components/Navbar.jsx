import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = ({theme, setTheme}) => {
  const [isOpen, setIsopen] = useState(false);
  return (
    <>
      <nav className="bg-gray-100 dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              FoodView
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link to="/user/register" className="hover:underline">
                User Register
              </Link>
              <Link to="/user/login" className="hover:underline">
                User Login
              </Link>
              <Link to="/food-partner/register" className="hover:underline">
                Partner Register
              </Link>
              <Link to="/food-partner/login" className="hover:underline">
                Partner Login
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsopen(!isOpen)}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-gray-100 dark:bg-gray-800 px-4 pb-4 space-y-2">
            <Link to="/user/register" className="block hover:underline">
              User Register
            </Link>
            <Link to="/user/login" className="block hover:underline">
              User Login
            </Link>
            <Link to="/food-partner/register" className="block hover:underline">
              Partner Register
            </Link>
            <Link to="/food-partner/login" className="block hover:underline">
              Partner Login
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full text-left p-2 rounded-md bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? " ☀ " : "🌙 "}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
