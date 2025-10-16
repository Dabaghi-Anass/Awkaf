import React from "react";
import { useNavigate } from "react-router-dom";

export const SideBar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Users", label: "Manage Users" },
    { name: "Projects", label: "Manage Projects" },
    { name: "Settings", label: "Settings" },
    { name: "dashboardOverview", label: "dashboard" },
    { name: "Logout", label: "Logout" },
  ];

  const handleItemClick = (name) => {
    if (name === "Logout") {
      
      localStorage.removeItem("accessToken");
      navigate("/");
    } else {
      setActiveTab(name);
    }
  };

  return (
    <div className="w-[15em] p-4 bg-gray-800 shadow-lg fixed top-0 left-0 h-full">
      <h2 className="text-[1.7em] font-bold text-white mb-4">Admin Panel</h2>
      <ul className="space-y-2 rounded-[10px] mt-15">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`cursor-pointer p-2 rounded-md ${
              activeTab === item.name
                ? "bg-green-500 text-white"
                : "text-white hover:bg-green-600 hover:text-white transition duration-300 text-sm"
            }`}
            onClick={() => handleItemClick(item.name)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
