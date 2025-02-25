import React, { useState, useEffect } from "react";
import "../CSS/ManageAwkaf.css";

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
    };

    const [projectInfos, setProjectInfos] = useState(defaultProject);
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectInfos((p) => ({ ...p, [name]: value }));
    };

    const sendData = async (e) => {
        const token = localStorage.getItem("accessToken");

        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/apif/waqf-projects/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(projectInfos),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error(data.error || "Failed to save project");
            }

            console.log("Project added:", data);
            alert("Project Added");
            setProjectInfos(defaultProject);
            
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
                    <button onClick={sendData}>Submit</button>
                </form>

                
            </div>
        </>
    );
};
