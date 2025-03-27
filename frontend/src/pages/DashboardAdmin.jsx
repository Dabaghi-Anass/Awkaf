import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/DashboardAdmin.css";

import { SideBar } from "../Components/admin_dashboard/SideBar";
import { ManageUsers } from "../Components/ManageUsers";
import { ProjectsTable } from "../Components/ProjectsTable";
import { Reports } from "../Components/Reports"; 
import { Settings } from "../Components/Settings"; 
import { ManageAwkaf } from "./ManageAwkaf";
import { ZakatContext } from "../Components/ZakatProvider";
export const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState("Users");
  const navigate = useNavigate();
  const { isEditing, setIsEditing} = useContext(ZakatContext);

  const tabComponents = {
    Users: <ManageUsers />,
    Projects: <ProjectsTable setActiveTab={setActiveTab} />,
    Reports: <Reports />,  
    Settings: <ManageAwkaf />, 
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
      <div className=" flex gap-80 bg-blue-600 min-h-screen  ">
        <div>
        <SideBar setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
        <div className=" w-full p-5  " >
          {/* Breadcrumb Section */}
          <div className="bg-[#eeeeee] py-4 pl-3.5 rounded-lg mt-5 mb-8 relative after:absolute after:-bottom-4 after:left-0 after:h-0.5 after:bg-[#999999] after:w-full after:rounded-4xl text-[#118218] font-[600] text-lg">
            Admin - {activeTab}
          </div>

          {/* Header Section */}
          <div className="flex items-center mb-5 gap-8">
            <h1 className="font-bold text-[25px] text-[#000]">{activeTab}</h1>
            {activeTab === "Projects" && (
              <button
              onClick={() => {
                handleAddNew();
                setIsEditing(false);
              }}  
                className="bg-[#118218] text-white py-2 px-4 rounded-lg hover:bg-[#0e8e0e] transition duration-300"
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
