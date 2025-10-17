import React, { useEffect, useState } from "react";
import { MessagePopup } from "@/Components/MessagePopup";
import { useApi } from "@/ApiProvider";

export const Settings = () => {
  
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    old_password: "",
    password: "",
  });
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const api = useApi();
  useEffect(() => {
      
  
      const fetchUserInfo = async () => {
        try {
          
  
          const [data,status,error] = await api.get("/me/");
  
          if (error) throw new Error("فشل تحميل معلومات المستخدم.")
  
  
          setFormData((prev) => ({
            ...prev,
            username: data.username || "",
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
          }))
        } catch (err) {
          console.error(err)
          setPopup({message:"حدث خطاء",type:"error"})
        }
      }
  
      fetchUserInfo()
    }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Check if trying to change password
    if (formData.password || formData.old_password) {
      if (!formData.old_password) {
        setPopup({
          message: "Please enter your old password to change password",
          type: "error",
        });
        return false;
      }
      if (!formData.password) {
        setPopup({
          message: "Please enter a new password",
          type: "error",
        });
        return false;
      }
      if (formData.password.length < 8) {
        setPopup({
          message: "New password must be at least 8 characters long",
          type: "error",
        });
        return false;
      }
    }

    // Validate email format
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setPopup({
          message: "Please enter a valid email address",
          type: "error",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);


    // Build payload with only modified fields
    const payload = {};
    for (const key in formData) {
      if (formData[key] && key !== "old_password" && key !== "password") {
        payload[key] = formData[key];
      }
    }

    // Add password fields if they exist
    if (formData.old_password && formData.password) {
      payload.old_password = formData.old_password;
      payload.password = formData.password;
    }

    try {
   
    const [data, status, error] = await api.patch("/user/update/", payload, {
      withCredentials: true,
    });

    if (error || status !== 200) {
      if (data?.old_password) {
        setPopup({ message: data.old_password, type: "error" });
      } else if (typeof data === "object" && Object.values(data)[0]) {
        const firstError = Object.values(data)[0];
        setPopup({ message: firstError, type: "error" });
      } else {
        setPopup({ message: data || "حدث خطاء", type: "error" });
      }
      setIsLoading(false);
      return;
    }

    setPopup({ message: "تم تحديث البيانات بنجاح", type: "success" });
    setFormData((prev) => ({ ...prev, password: "", old_password: "" }));
  } catch (err) {
    console.error("Error updating user:", err);
    setPopup({ message: "حدث خطاء", type: "error" });
  } finally {
    setIsLoading(false);
  }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg p-8 rounded-xl border border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Settings</h2>
            <p className="text-gray-600 text-sm">Manage your profile information and security</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg custom-input focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg custom-input focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">First Name</label>
                  <input 
                    name="first_name" 
                    value={formData.first_name} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 p-3 rounded-lg custom-input focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">Last Name</label>
                  <input 
                    name="last_name" 
                    value={formData.last_name} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 p-3 rounded-lg custom-input focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="pt-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Security</h3>
              <p className="text-sm text-gray-500 mb-4">Leave password fields empty if you don't want to change your password</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">Current Password</label>
                  <input 
                    type="password" 
                    name="old_password" 
                    value={formData.old_password} 
                    onChange={handleChange} 
                    placeholder="Enter current password"
                    className="w-full border border-gray-300 p-3 rounded-lg custom-input focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">New Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Enter new password (min. 8 characters)"
                    className="w-full border border-gray-300 p-3 rounded-lg custom-input focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving Changes...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
};