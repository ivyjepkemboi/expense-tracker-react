import React from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline, IoMdInformationCircleOutline } from "react-icons/io";
import avatar from "../assets/img/avatars/avatar1.png"; // Ensure this path is correct

const Navbar = ({ brandText }) => {
  return (
    <nav className="sticky top-0 z-40 flex w-full items-center justify-between bg-transparent p-4 backdrop-blur-lg">
      {/* Left Section - Page Title */}
      <div className="">
         <Link
            to="#"
            className=" shrink text-[33px] font-bold capitalize text-blue-700 align-center"
          >
            Expensa
          </Link>    
        </div>

      {/* Right Section - Search, Notifications, Profile */}
      <div className="flex items-center space-x-6">
        {/* Search Box */}
        <div className="flex items-center rounded-full bg-gray-200 px-3 py-2">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 w-full bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>

        {/* Notification Icon */}
        <IoMdNotificationsOutline className="text-xl text-gray-600 cursor-pointer" />

        {/* Info Icon */}
        <IoMdInformationCircleOutline className="text-xl text-gray-600 cursor-pointer" />

        {/* Profile Picture */}
        <div className="cursor-pointer">
          <img className="h-10 w-10 rounded-full" src={avatar} alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
