import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/DashboardAdmin.css";

import { SideBar } from "../Components/admin_dashboard/SideBar";
import { ManageUsers } from "../Components/ManageUsers";
import { ProjectsTable } from "../Components/ProjectsTable";
import { Reports } from "../Components/Reports"; 
import { ManageAwkaf } from "./ManageAwkaf";


import { AdminContext } from "../Components/AdminProvider";
import AdminFormBuilder from "../Components/AdminFormBuilder";
export const DashboardAdmin = () => {
  
  const navigate = useNavigate();
  const { isEditing, setIsEditing,activeTab,setActiveTab} = useContext(AdminContext);

  const tabComponents = {
    Users: <ManageUsers />,
    Projects: <ProjectsTable />,
    Reports: <Reports />,  
    Form: <AdminFormBuilder />, 
    ManageProject: <ManageAwkaf />,
  };

  // Handle "Add New" Button Click
  const handleAddNew = () => {
    switch (activeTab) {
      case "Users":
        navigate("/add-user");
        break;
      case "Projects":
        setActiveTab("ManageProject");
        break;
      case "Reports":
        navigate("/generate-report");
        break;
      case "Settings":
        navigate("/settings-page");
        break;
      default:
        break;
    }
  };

  return (
    <>
     {/* <TopBar />*/}
      <div className=" flex gap-60  min-h-screen  ">
        <div>
        <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
        <div className=" w-full p-5  " >
          {/* Breadcrumb Section */}
          <div className="bg-gray-800 py-4 pl-3.5 rounded-lg   relative after:absolute after:-bottom-4 after:left-0 after:h-0.5 after:bg-green-700 after:w-full after:rounded-4xl text-white font-[600] text-lg">
            Admin - {activeTab}
          </div>

          {/* Header Section */}
          <div className="flex items-center mb-5 gap-8">
            
            {activeTab === "Projects" && (
              <button
              onClick={() => {
                handleAddNew();
                setIsEditing(false);
              }}  
                className="bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Add New
              </button>
            )}
          </div>

          {/* Dynamic Content Section */}
          {tabComponents[activeTab] || <p className="text-center text-gray-500">Page Not Found</p>}
        </div>
      </div>
    </>
  );
};
