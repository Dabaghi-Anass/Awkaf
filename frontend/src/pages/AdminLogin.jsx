import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
        secretKey: "",
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOtpChange = (e) => {
        setOtpCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            if (response.ok && result.message === "OTP sent to your email. Enter OTP to proceed.") {
                setOtpSent(true);
                alert("OTP sent to your email. Enter it below.");
            } else if (result.access && result.refresh) {
                localStorage.setItem("accessToken", result.access);
                localStorage.setItem("refreshToken", result.refresh);
                navigate("/DashboardAdmin");
            } else {
                alert(result.detail || "Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/admin/verify/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: data.username, otp: otpCode }),
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("accessToken", result.access_token);
                localStorage.setItem("refreshToken", result.refresh_token);
                alert("OTP Verified! You are logged in.");
                navigate("/");
            } else {
                alert(result.error || "OTP verification failed!");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
        }
    };

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    {otpSent ? "تحقق من OTP" : "تسجيل دخول المشرف"}
                </h2>
                <form onSubmit={otpSent ? handleOtpSubmit : handleSubmit} className="space-y-4">
                    {!otpSent ? (
                        <>
                            <div>
                                <label className="block text-gray-600 mb-1">إسم المستخدم</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">كلمة المرور</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-1">المفتاح السري</label>
                                <input
                                    type="text"
                                    name="secretKey"
                                    value={data.secretKey}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                            >
                                تسجيل الدخول
                            </button>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-gray-600 mb-1">أدخل رمز OTP</label>
                                <input
                                    type="text"
                                    value={otpCode}
                                    onChange={handleOtpChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                            >
                                تحقق من OTP
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};
