import React, { useEffect, useState,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ZakatContext } from "../Components/ZakatProvider";

export const ManageAwkaf = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isEditing, setIsEditing} = useContext(ZakatContext);
  const defaultProject = {
    name: "",
    introduction: "",
    background: "",
    objectives: "",
    key_stages: "",
    expected_outcomes: "",
    challenges_solutions: "",
    required_resources: "",
    timeline: "",
    tools_technologies: "",
    team_members: "",
    partners_supporters: "",
    conclusion: "",
    image: null,
  };

  const [projectData, setProjectData] = useState(defaultProject);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    if (location.state?.project) {
      setProjectData(location.state.project);
      setIsEditing(true);
      setProjectId(location.state.project.id);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProjectData({ ...projectData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }
  
    const formData = new FormData();
    Object.entries(projectData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append(key, value);
      } else if (key !== "image") {
        formData.append(key, value);
      }
    });
  
    const url = isEditing
      ? `http://127.0.0.1:8000/apif/waqf-projects/${projectId}/`
      : "http://127.0.0.1:8000/apif/waqf-projects/";
    const method = isEditing ? "PUT" : "POST";
  
    try {
      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      if (response.ok) {
        alert(isEditing ? "Project Updated Successfully!" : "Project Added!");
        setIsEditing(false);
        setActiveTab("Projects"); // Return to the table after submission
      } else {
        const responseData = await response.json();
        console.error("Error:", responseData);
        alert("Error submitting project: " + JSON.stringify(responseData));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="max-w-4xl  bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-[#035116] mb-6">
        {isEditing ? "Edit Project" : "Add New Project"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Project Name", name: "name", type: "text" },
          { label: "Introduction", name: "introduction", type: "textarea" },
          { label: "Background", name: "background", type: "textarea" },
          { label: "Objectives", name: "objectives", type: "textarea" },
          { label: "Key Stages", name: "key_stages", type: "textarea" },
          { label: "Expected Outcomes", name: "expected_outcomes", type: "textarea" },
          { label: "Challenges & Solutions", name: "challenges_solutions", type: "textarea" },
          { label: "Required Resources", name: "required_resources", type: "textarea" },
          { label: "Timeline", name: "timeline", type: "textarea" },
          { label: "Tools & Technologies", name: "tools_technologies", type: "textarea" },
          { label: "Team Members", name: "team_members", type: "textarea" },
          { label: "Partners & Supporters", name: "partners_supporters", type: "textarea" },
          { label: "Conclusion", name: "conclusion", type: "textarea" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium">{label}</label>
            {type === "text" ? (
              <input
                type="text"
                name={name}
                value={projectData[name]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#118218] focus:border-[#118218]"
              />
            ) : (
              <textarea
                name={name}
                value={projectData[name]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#118218] focus:border-[#118218] resize-y"
              />
            )}
          </div>
        ))}

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium">Project Image</label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#118218] transition">
            <input
              type="file"
              name="image"
              id="fileInput"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
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
        <button
          type="submit"
          className="w-full bg-[#118218] text-white py-3 rounded-md font-semibold hover:bg-[#0d6d13] transition"
        >
          {isEditing ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default ManageAwkaf;
