import React, { useState } from "react";
import "../CSS/ManageAwkaf.css";

import { ManageProjects } from "../Components/ManageProjects";
import { ManageUsers } from "../Components/ManageUsers";

export const ManageAwkaf = () => {
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
        image:null,
    };

    const [projectInfos, setProjectInfos] = useState(defaultProject);
    const [preview, setPreview] = useState(null); // For image preview

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectInfos((p) => ({ ...p, [name]: value }));
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProjectInfos((p) => ({ ...p, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    // Upload image to the server
  

    // Submit form data including image
    const sendData = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
    
        const formData = new FormData(); // Use FormData to handle text + image
        Object.keys(projectInfos).forEach((key) => {
            if (projectInfos[key]) {
                formData.append(key, projectInfos[key]);
            }
        });
    
        try {
            const response = await fetch("http://localhost:8000/apif/waqf-projects/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Don't set Content-Type, browser will handle it
                },
                body: formData, // Send form data directly
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error(data.error || "Failed to save project");
            }
    
            console.log("Project added:", data);
            alert("Project Added");
            setProjectInfos(defaultProject);
            setPreview(null);
    
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    

    return (
        <>
            <div className="manage-awkaf">
                <form className="project-details-cont">
                    <div>
                    <label>Project Name</label> <br />
                        <input type="text" name="name" value={projectInfos.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Introduction</label> <br />
                        <textarea name="introduction" value={projectInfos.introduction} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Background</label> <br />
                        <textarea name="background" value={projectInfos.background} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Objectives</label> <br />
                        <textarea name="objectives" value={projectInfos.objectives} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Key Stages</label> <br />
                        <textarea name="key_stages" value={projectInfos.key_stages} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Expected Outcomes</label> <br />
                        <textarea name="expected_outcomes" value={projectInfos.expected_outcomes} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Challenges</label> <br />
                        <textarea name="challenges_solutions" value={projectInfos.challenges_solutions} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Required Resources</label> <br />
                        <textarea name="required_resources" value={projectInfos.required_resources} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Timeline</label> <br />
                        <textarea name="timeline" value={projectInfos.timeline} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Team Members</label> <br />
                        <textarea name="team_members" value={projectInfos.team_members} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Tools & Technologies</label> <br />
                        <textarea name="tools_technologies" value={projectInfos.tools_technologies} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Partners & Supporters</label> <br />
                        <textarea name="partners_supporters" value={projectInfos.partners_supporters} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label>Conclusion</label> <br />
                        <textarea name="conclusion" value={projectInfos.conclusion} onChange={handleChange}></textarea>
                    </div>
                    {/* Image Upload Section */}
                    <div>
                        <label>Project Image</label> <br />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {preview && (
                            <div className="image-preview">
                                <img src={preview} alt="Project Preview" />
                            </div>
                        )}
                    </div>

                    <button onClick={sendData}>Submit</button>
                </form>

                <ManageUsers></ManageUsers>
            </div>
        </>
    );
};
