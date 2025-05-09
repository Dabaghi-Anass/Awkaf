import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/DashboardAdmin.css";

import { SideBar } from "../Components/admin_dashboard/SideBar";
import { ManageUsers } from "../Components/ManageUsers";
import { ProjectsTable } from "../Components/ProjectsTable";
import { Reports } from "../Components/Reports"; 
import { ManageAwkaf } from "./ManageAwkaf";
import {Add} from '../assets/icons/Add.jsx';

import { AdminContext } from "../Components/AdminProvider";
import AdminFormBuilder from "../Components/AdminFormBuilder";
import { Settings } from "../Components/Settings.jsx";
export const DashboardAdmin = () => {
  
  const navigate = useNavigate();
  const { isEditing, setIsEditing,activeTab,setActiveTab} = useContext(AdminContext);

  const tabComponents = {
    Users: <ManageUsers />,
    Projects: <ProjectsTable />,
    Settings: <Settings />,  
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
          <div className="bg-gray-800 py-4 pl-3.5 rounded-lg   relative  text-white font-[600] text-lg">
            Admin - {activeTab}
          </div>

          {/* Header Section */}
          <div className="flex items-center mb-2 gap-8">
            
            {activeTab === "Projects" && (
              <button
              onClick={() => {
                handleAddNew();
                setIsEditing(false);
              }}  
                className="custom-button mt-5 py-2 px-1 text-[0.9em] rounded-[8px] flex items-center"
              >
               <Add></Add> Add new
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
