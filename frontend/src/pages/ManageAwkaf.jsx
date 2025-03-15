import React, { useState } from "react";


import { ManageProjects } from "../Components/ManageProjects";


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
            <div className="manage-awkaf  bg-[#eeeeee] p-4 rounded-lg">
                <form className="project-details-cont overflow-hidden h-90 overflow-y-scroll scrollbar">
                    <div className="flex  flex-col gap-2 mb-4  ">
                    <label className="text-[#118218] text-lg ">Project Name:</label> 
                        <input type="text" name="name" value={projectInfos.name} onChange={handleChange} className="border text-[17px] py-2 px-4 rounded-md w-6/7
                        focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"
                         />
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 " >
                    <label className="text-[#118218] text-lg ">Introduction:</label> 
                        <textarea name="introduction" value={projectInfos.introduction} onChange={handleChange} 
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none" 
                        ></textarea>
                    </div>
                    <div  className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Background</label> 
                        <textarea name="background" value={projectInfos.background} onChange={handleChange}
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none" ></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Objectives</label> 
                        <textarea name="objectives" value={projectInfos.objectives} onChange={handleChange} 
                         className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 " >
                        <label className="text-[#118218] text-lg ">Key Stages</label> 
                        <textarea name="key_stages" value={projectInfos.key_stages} onChange={handleChange}
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Expected Outcomes</label> 
                        <textarea name="expected_outcomes" value={projectInfos.expected_outcomes} onChange={handleChange} 
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Challenges</label> 
                        <textarea name="challenges_solutions" value={projectInfos.challenges_solutions} onChange={handleChange} 
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Required Resources</label> 
                        <textarea name="required_resources" value={projectInfos.required_resources} onChange={handleChange} 
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Timeline</label> 
                        <textarea name="timeline" value={projectInfos.timeline} onChange={handleChange} 
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Team Members</label> 
                        <textarea name="team_members" value={projectInfos.team_members} onChange={handleChange}
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Tools & Technologies</label> 
                        <textarea name="tools_technologies" value={projectInfos.tools_technologies} onChange={handleChange} 
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Partners & Supporters</label> 
                        <textarea name="partners_supporters" value={projectInfos.partners_supporters} onChange={handleChange} 
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div>
                    <div className="flex  flex-col h-35  gap-2 mb-4 ">
                        <label className="text-[#118218] text-lg ">Conclusion</label> 
                        <textarea name="conclusion" value={projectInfos.conclusion} onChange={handleChange} 
                        className="border text-[17px] py-2 px-4 rounded-md w-6/7 h-full resize-none focus:border-[#118218] focus:ring focus:ring-blue-200 outline-none"></textarea>
                    </div> 
                     <div className="flex  flex-col hh-20  gap-2 mb-4  ">
                     <label className="text-[#118218] text-lg " for="file_input">Upload file</label>
                     <input className="block w-1/3 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" accept="image/*" type="file"
                      onChange={handleImageChange}/>
                        {preview && (
                            <div className="image-preview">
                                <img src={preview} alt="Project Preview" />
                            </div>
                        )}
                    </div>
                    {/* 
                    
                    */}
                    {/* Image Upload Section */}
                   

                    <button onClick={sendData} className="bg-[#118218] py-2 w-35 px-5 rounded-sm font-bold text-white">Add Project</button>
                </form>

                
            </div>
        </>
    );
};
