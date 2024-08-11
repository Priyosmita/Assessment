'use client'
import React, { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="w-[calc(100%-4rem)] h-16 bg-[#1f2125] flex items-center justify-between px-4 fixed top-0 z-10 border-b border-[#2c3236]">
      {/* Left side (Logo) */}
      <h3 className="font-semibold ml-4 text-white">Onebox</h3>

      {/* Right side icons */}
      <div className="flex items-center space-x-6">
        {/* Workspace Dropdown */}
        

        {/* Custom Theme Toggle Switch */}
        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={darkMode}
            onChange={toggleTheme}
            className="toggle-checkbox absolute opacity-0 w-0 h-0"
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-[#333] cursor-pointer transition-colors duration-300 ease-in-out relative"
          >
            {/* Slider Circle */}
            <div
              className={`absolute left-0 top-0 w-4 h-4 mt-1 ml-1 bg-gray-400 rounded-full transition-transform duration-300 ease-in-out ${
                darkMode ? 'transform translate-x-6 bg-gray-700' : ''
              }`}
            />

            {/* Sun and Moon Icons */}
            <span
              className={`absolute right-0.5 transition-opacity duration-300 ease-in-out ${
                darkMode ? 'opacity-0' : 'opacity-100'
              }`}
            >
              🌞
            </span>
            <span
              className={`absolute left-0.5 transition-opacity duration-300 ease-in-out ${
                darkMode ? 'opacity-100' : 'opacity-0'
              }`}
            >
              🌙
            </span>
          </label>
        </div>
        <div className="relative">
          <div
            className="flex items-center cursor-pointer text-white hover:text-gray-300"
            onClick={toggleDropdown}
          >
            <span>Tim's Workspace</span>
            <FaChevronDown className="ml-1" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2c3236] border border-[#333] rounded-md shadow-lg z-20">
              <ul className="py-2">
                <li
                  className="px-4 py-2 text-white hover:bg-[#3d4147] cursor-pointer"
                  onClick={() => {
                    // Handle view profile action
                    console.log("View Profile Clicked");
                    setDropdownOpen(false);
                  }}
                >
                  View Profile
                </li>
              </ul>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;