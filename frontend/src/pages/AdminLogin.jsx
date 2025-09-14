import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../Components/Loader"; // adjust path if needed

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    secretKey: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const errors = {};
    if (!data.username.trim()) errors.username = "إسم المستخدم مطلوب!";
    if (!data.password.trim()) errors.password = "كلمة المرور مطلوبة!";
    if (!data.secretKey.trim()) errors.secretKey = "المفتاح السري مطلوب!";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/apif/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          secret_key: data.secretKey,
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok && result.access && result.refresh) {
        localStorage.setItem("accessToken", result.access);
        localStorage.setItem("refreshToken", result.refresh);

        // Optional: fetch user info to confirm admin
        const meResponse = await fetch("http://127.0.0.1:8000/apif/me/", {
          headers: {
            Authorization: `Bearer ${result.access}`,
          },
        });

        if (meResponse.ok) {
          const userInfo = await meResponse.json();
          if (userInfo.is_staff) {
            navigate("/DashboardAdmin");
          } else {
            navigate("/home");
          }
        } else {
          navigate("/DashboardAdmin"); // fallback
        }
      } else {
        alert(result.detail || "فشل تسجيل الدخول");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("حدث خطأ أثناء تسجيل الدخول. حاول لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[22em]">
        <h2 className="text-[1.2em] font-bold text-center text-gray-700 mb-6">
          تسجيل دخول المشرف
        </h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-[0.8em] text-gray-600 mb-1">إسم المستخدم</label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              className="w-full px-3 py-1 custom-input"
            />
            {formErrors.username && (
              <p className="text-red-500 text-[0.7em] mt-1">{formErrors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-[0.8em] text-gray-600 mb-1">كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-3 py-1 custom-input"
            />
            {formErrors.password && (
              <p className="text-red-500 text-[0.7em] mt-1">{formErrors.password}</p>
            )}
            <Link
              className="text-[0.7em] text-green-600 hover:underline block mt-1"
              to="/forgot-password"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
          <div>
            <label className="block text-[0.8em] text-gray-600 mb-1">المفتاح السري</label>
            <input
              type="password"
              name="secretKey"
              value={data.secretKey}
              onChange={handleChange}
              className="w-full px-3 py-1 custom-input"
            />
            {formErrors.secretKey && (
              <p className="text-red-500 text-[0.7em] mt-1">{formErrors.secretKey}</p>
            )}
          </div>
          <button type="submit" className="w-full custom-button py-1 rounded-[5px]">
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};
