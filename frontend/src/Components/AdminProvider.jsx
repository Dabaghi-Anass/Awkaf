
import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
     const defaultProject = {
        name: "",
        objectives: "",
        partners: "",
        image: null,
      };
    const [activeTab, setActiveTab] = useState("Users");
    const [isEditing, setIsEditing] = useState(false);
    const [projectData, setProjectData] = useState(defaultProject);
  return (
    <AdminContext.Provider 
    value={{ isEditing,setIsEditing,activeTab,setActiveTab,
        setProjectData,projectData,defaultProject

                
            }}>
                {children}
            </AdminContext.Provider>
  )
}
