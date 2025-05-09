import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const Settings = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    old_password: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      setFormData((prev) => ({
        ...prev,
        username: decoded.username || "",
        email: decoded.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://127.0.0.1:8000/apif/user/update/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.old_password) {
          setError(data.old_password);
        } else {
          setError("Failed to update profile.");
        }
        return;
      }

      setMessage("Profile updated successfully.");
      setFormData((prev) => ({ ...prev, password: "", old_password: "" }));
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-center text-green-700">Admin Settings</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" value={formData.username} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Username" />
        <input name="first_name" value={formData.first_name} onChange={handleChange} className="w-full border p-2 rounded" placeholder="First Name" />
        <input name="last_name" value={formData.last_name} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Last Name" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Email" />

        <input type="password" name="old_password" value={formData.old_password} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Old Password" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" placeholder="New Password" />

        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">
          Save Changes
        </button>
      </form>
    </div>
  );
};
