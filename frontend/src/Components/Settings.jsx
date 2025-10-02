import React, { useEffect, useState } from "react";

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
    if (!token) {
      setError("No token found.");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/apif/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load user info");

        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          username: data.username || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
        }));
      } catch (err) {
        console.error(err);
        setError("Could not fetch admin data.");
      }
    };

    fetchUserInfo();
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
    if (!token) {
      setError("No token found.");
      return;
    }

    const payload = {};
    for (const key in formData) {
      if (formData[key]) {
        payload[key] = formData[key];
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/apif/user/update/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.old_password) {
          setError(data.old_password[0]);
        } else if (typeof data === "object") {
          const firstError = Object.values(data)[0];
          setError(Array.isArray(firstError) ? firstError[0] : firstError);
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
    <div className="w-full mx-auto mt-10 bg-white shadow p-6 rounded-xl border-3 border-gray-800">
      

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-800">Username</label>
          <input name="username" value={formData.username} onChange={handleChange} className="w-full border p-2 rounded custom-input" />
        </div>

        <div>
          <label className="text-gray-800">First Name</label>
          <input name="first_name" value={formData.first_name} onChange={handleChange} className="w-full border p-2 rounded custom-input" />
        </div>

        <div>
          <label className="text-gray-800">Last Name</label>
          <input name="last_name" value={formData.last_name} onChange={handleChange} className="w-full border p-2 rounded custom-input" />
        </div>

        <div>
          <label className="text-gray-800">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded custom-input" />
        </div>

        <div>
          <label className="text-gray-800">Old Password</label>
          <input type="password" name="old_password" value={formData.old_password} onChange={handleChange} className="w-full border p-2 rounded custom-input" />
        </div>

        <div>
          <label className="text-gray-800">New Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded custom-input" />
        </div>

        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-[10px] custom-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};
