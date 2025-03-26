import React from "react";

export const SideBar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { name: "Users", label: "Manage Users" },
    { name: "Projects", label: "Manage Projects" },
    { name: "Reports", label: "Generate Reports" },
    { name: "Settings", label: "Settings" },
  ];

  return (
    <div className="w-[20em] bg-gray-100 p-4 shadow-lg fixed top-0 left-0 h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`cursor-pointer p-2 rounded-md ${
              activeTab === item.name ? "bg-[#118218] text-white" : "text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
