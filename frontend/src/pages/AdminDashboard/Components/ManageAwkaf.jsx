import React, { useEffect, useState, useContext } from "react";

import { AdminContext } from "../../../Components/AdminProvider";
import { useApi } from "@/ApiProvider";
import { MessagePopup } from "@/Components/MessagePopup";


export const ManageAwkaf = () => {
  const api = useApi();
  const { isEditing, setActiveTab, projectData, setProjectData, defaultProject } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProjectData({ ...projectData, image: e.target.files[0] });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Build FormData for file upload
    const formData = new FormData();
    Object.entries(projectData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "image") {
        formData.append(key, value);
      }
    });

    // Determine URL and method
    const url = isEditing
      ? `/waqf-projects/${projectData.id}/`
      : "/waqf-projects/";
    const method = isEditing ? "put" : "post";

    // Use api instance
    let data, status, error;

    if (method === "post") {
      [data, status, error] = await api.post(url, formData);
    } else {
      [data, status, error] = await api.put(url, formData);
    }

    // Handle response
    if (!error && status >= 200 && status < 300) {
      setPopup({
        message: isEditing
          ? "Project Updated Successfully!"
          : "Project Added!",
        type: "success",
      });
      setProjectData(defaultProject);
      setTimeout(() => setActiveTab("Projects"), 500);
    } else {
      setPopup({
        message:
          data?.detail ||
          `Error submitting project: ${JSON.stringify(data || error)}`,
        type: "error",
      });
    }
  } catch (err) {
    console.error("Error submitting project:", err);
    setPopup({
      message: "Error submitting project",
      type: "error",
    });
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    if (!isEditing) {
      setProjectData(defaultProject);
    }
  }, [isEditing]);

  return (
    <div className="w-full border-3 border-gray-800 p-8 shadow-lg rounded-[15px]">
      <h2 className="text-2xl font-bold text-center text-blue-950 mb-6">
        {isEditing ? "Edit Project" : "Add New Project"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Project Name", name: "name", type: "text" },
          { label: "Objectives", name: "objectives", type: "textarea" },
          { label: "Partners & Supporters", name: "partners", type: "textarea" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="text-[0.8em] block text-blue-950">{label}</label>
            {type === "text" ? (
              <input
                type="text"
                name={name}
                value={projectData[name]}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full p-2 custom-input disabled:opacity-50"
              />
            ) : (
              <textarea
                name={name}
                value={projectData[name]}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full p-3 custom-input disabled:opacity-50"
              />
            )}
          </div>
        ))}

        {/* Image Upload */}
        <div>
          <label className="block text-blue-950 text-[0.8em]">Project Image</label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#118218] transition">
            <input
              type="file"
              name="image"
              id="fileInput"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              disabled={isLoading}
            />
            {projectData.image ? (
              <img
                src={projectData.image instanceof File ? URL.createObjectURL(projectData.image) : projectData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h14m-10-4v8" />
                </svg>
                <span className="text-gray-500 text-sm">Click or Drag & Drop to upload</span>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        {isEditing && (
          <button
            type="button"
            disabled={isLoading}
            className="w-full bg-green-300 text-green-800 py-3 rounded-md font-semibold hover:bg-green-400 transition disabled:opacity-50"
            onClick={() => {
              setProjectData(defaultProject);
              setActiveTab("Projects");
            }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition disabled:opacity-50"
        >
          {isLoading ? "Processing..." : isEditing ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Message Popup */}
     <MessagePopup message={popup.message} type={popup.type} />
    </div>
    
  );
};

export default ManageAwkaf;