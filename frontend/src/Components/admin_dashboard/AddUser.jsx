import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "User",
        password: "",
        profileImage: null,
    });

    const [preview, setPreview] = useState(null);

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser((prev) => ({ ...prev, profileImage: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");

        const formData = new FormData();
        Object.keys(user).forEach((key) => {
            if (user[key]) {
                formData.append(key, user[key]);
            }
        });

        try {
            const response = await fetch("http://localhost:8000/api/users/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error(data.error || "Failed to add user");
            }

            alert("User Added Successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-[#118218] mb-4 text-center">Add New User</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label className="text-lg font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:border-[#118218] focus:ring focus:ring-green-200 outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:border-[#118218] focus:ring focus:ring-green-200 outline-none"
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="text-lg font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:border-[#118218] focus:ring focus:ring-green-200 outline-none"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-lg font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md focus:border-[#118218] focus:ring focus:ring-green-200 outline-none"
                            required
                        />
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="text-lg font-medium text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file:bg-[#118218] file:text-white file:border-none file:py-2 file:px-4 file:rounded-md file:cursor-pointer hover:file:bg-green-700 transition"
                        />
                        {preview && (
                            <div className="mt-3">
                                <img src={preview} alt="Profile Preview" className="w-20 h-20 object-cover rounded-full shadow-md mx-auto" />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="bg-gray-400 text-white py-2 px-5 rounded-md hover:bg-gray-600 transition"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#118218] text-white py-2 px-5 rounded-md font-semibold hover:bg-green-700 transition"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
