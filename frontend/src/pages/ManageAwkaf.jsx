import React, { useState } from "react";

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
        image: null,
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

    // Submit form data
    const sendData = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");

        const formData = new FormData();
        Object.keys(projectInfos).forEach((key) => {
            if (projectInfos[key]) {
                formData.append(key, projectInfos[key]);
            }
        });

        try {
            const response = await fetch("http://localhost:8000/apif/waqf-projects/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error(data.error || "Failed to save project");
            }

            alert("Project Added");
            setProjectInfos(defaultProject);
            setPreview(null);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-semibold text-[#118218] mb-4 text-center">Manage Awkaf Project</h2>

                <form className="space-y-4" onSubmit={sendData}>
                    {Object.keys(defaultProject).map((key) =>
                        key !== "image" ? (
                            <div key={key} className="flex flex-col">
                                <label className="text-lg font-medium text-gray-700 capitalize">{key.replace("_", " ")}</label>
                                <textarea
                                    name={key}
                                    value={projectInfos[key]}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-md focus:border-[#118218] focus:ring focus:ring-green-200 outline-none resize-none"
                                    rows={key === "name" ? 1 : 3}
                                />
                            </div>
                        ) : null
                    )}

                    {/* Image Upload Section */}
                    <div className="flex flex-col">
                        <label className="text-lg font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file:bg-[#118218] file:text-white file:border-none file:py-2 file:px-4 file:rounded-md file:cursor-pointer hover:file:bg-green-700 transition"
                        />
                        {preview && (
                            <div className="mt-3">
                                <img src={preview} alt="Preview" className="w-full max-h-40 object-cover rounded-md shadow-md" />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#118218] text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
                    >
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
};
