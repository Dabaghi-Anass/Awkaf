import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../Components/admin_dashboard/SideBar";
import { ManageUsers } from "./Components/ManageUsers";
import { ManageAwkaf } from "./Components/ManageAwkaf";
import { Add } from '../../assets/icons/Add.jsx';
import { AdminContext } from "../../Components/AdminProvider";

import { Settings } from "./Components/Settings.jsx";
import { ProjectsTable } from "./Components/ProjectsTable";


export const DashboardAdmin = () => {
  const navigate = useNavigate();
  const { setIsEditing, activeTab, setActiveTab, setProjectData, defaultProject } = useContext(AdminContext);

  const tabComponents = {
    Users: <ManageUsers />,
    Projects: <ProjectsTable />,
    Settings: <Settings />,  
    ManageProject: <ManageAwkaf />,
    
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setProjectData(defaultProject);
    setActiveTab("ManageProject");
  };

  // Get user-friendly tab titles
  const getTabTitle = (tab) => {
    const titles = {
      Users: "User Management",
      Projects: "Projects",
      Settings: "Account Settings",
      ManageProject: "Project Management",
    };
    return titles[tab] || tab;
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full z-40">
          <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6">
          {/* Breadcrumb Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 py-5 px-6 rounded-xl shadow-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white font-bold text-2xl mb-1">
                  {getTabTitle(activeTab)}
                </h1>
                <p className="text-gray-300 text-sm">
                  Admin Dashboard / {getTabTitle(activeTab)}
                </p>
              </div>

              {/* Add New Button for Projects */}
              {activeTab === "Projects" && (
                <button
                  onClick={handleAddNew}  
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Add />
                  <span>Add New Project</span>
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Content Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-200px)]">
            {tabComponents[activeTab] || (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-6xl text-gray-300 mb-4">⚠️</div>
                  <p className="text-gray-500 text-lg font-medium">Page Not Found</p>
                  <p className="text-gray-400 text-sm mt-2">The requested page does not exist</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};