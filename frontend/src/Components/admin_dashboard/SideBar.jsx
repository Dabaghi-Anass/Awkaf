import React from "react";

export const SideBar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { name: "Users", label: "Manage Users" },
    { name: "Projects", label: "Manage Projects" },
    { name: "Form", label: "Manage Form" },

  ];

  return (
    <div className="w-[15em] bg-green-800 p-4 shadow-lg fixed top-0 left-0 h-full">
      <h2 className="text-sm font-bold text-white mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`cursor-pointer p-2 rounded-md ${
              activeTab === item.name ? "bg-green-500 text-white" : "text-white hover:bg-green-600 transition duration-300 text-sm"
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
