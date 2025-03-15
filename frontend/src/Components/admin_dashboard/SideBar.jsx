import React, { useState } from "react";

export const SideBar = () => {
  const [activeItem, setActiveItem] = useState(""); // Track selected item

  return (
    <div className="sidebar-container relative left-0 top-0 bg-white h-screen w-[20em] border-r-2 border-gray-400 mt-5">
      <ul className="side-bar-list px-2 w-8/9 border-black border ml-6 rounded-md">
        <li>
          <p className="text-[16px] font-semibold w-full py-2 border-b">Main</p>
          <div
            className={`side-bar-item hover:bg-[#118218] hover:text-white border-black my-5 border-l-4 py-3 pl-2 text-[20px] font-light rounded-r-lg cursor-pointer
              ${
                activeItem === "Dashboard"
                  ? " text-white font-semibold bg-[#118218] "
                  : " text-[#118218] hover:text-green-700"
              }`}
            onClick={() => setActiveItem("Dashboard")}
          >
            Dashboard
          </div>
        </li>

        <li>
          <p className="text-[16px] font-semibold w-full py-2 border-b">User Details</p>
          <div
            className={`side-bar-item hover:bg-[#118218] hover:text-white border-black my-5 border-l-4 py-3 pl-2 text-[20px] font-light rounded-r-lg cursor-pointer
              ${
                activeItem === "Users"
                  ? " text-white font-semibold bg-[#118218]"
                  : " text-[#118218] hover:text-green-700"
              }`}
            onClick={() => setActiveItem("Users")}
          >
            Users
          </div>
        </li>

        <li>
          <p className="text-[16px] font-semibold w-full py-2 border-b">Project Details</p>
          <div
            className={`side-bar-item hover:bg-[#118218] hover:text-white border-black my-5 border-l-4 py-3 pl-2 text-[20px] font-light rounded-r-lg cursor-pointer
              ${
                activeItem === "Awkaf-projects"
                  ? " text-white font-semibold bg-[#118218]"
                  : " text-[#118218] hover:text-green-700"
              }`}
            onClick={() => setActiveItem("Awkaf-projects")}
          >
            Awkaf-projects
          </div>
        </li>
      </ul>
    </div>
  );
};
