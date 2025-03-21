// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");

    setToken(null);

    window.location.href = "/login";
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-teal-300 to-blue-500 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">MyApp</Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      <ul
        className={`lg:flex lg:space-x-6 justify-center text-white font-medium mt-4 lg:mt-0 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        {!token && (
          <li>
            <Link
              to="/register"
              className="px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
            >
              Register
            </Link>
          </li>
        )}

        <li>
          <Link
            to="/tasklist"
            className="px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Task List
          </Link>
        </li>

        <li>
          <Link
            to="/addtask"
            className="px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Add Task
          </Link>
        </li>
        {token && (
          <li>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
