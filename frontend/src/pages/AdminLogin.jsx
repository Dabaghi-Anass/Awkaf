import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AdminLogin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
        secretKey: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [otpError, setOtpError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
    };

    const handleOtpChange = (e) => {
        setOtpCode(e.target.value);
        setOtpError(""); // Clear OTP error on change
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

        if (!otpCode.trim()) {
            setOtpError("يرجى إدخال رمز OTP.");
            return;
        }

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
                navigate("/home");
            } else {
                setOtpError(result.error || "فشل التحقق من OTP!");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            setOtpError("حدث خطأ أثناء التحقق من OTP.");
        }
    };

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[22em]">
                <h2 className="ttext-[1.2em] font-bold text-center text-gray-700 mb-6">
                    {otpSent ? "تحقق من OTP" : "تسجيل دخول المشرف"}
                </h2>
                <form onSubmit={otpSent ? handleOtpSubmit : handleSubmit} noValidate className="space-y-4">
                    {!otpSent ? (
                        <>
                            <div>
                                <label className="block text-[0.8em] text-gray-600 mb-1">إسم المستخدم</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    onChange={handleChange}
                                    className="w-full px-3 py-1 custom-input"
                                />
                                {formErrors.username && <p className="text-red-500 text-[0.7em] mt-1">{formErrors.username}</p>}
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
                                {formErrors.password && <p className="text-red-500 text-[0.7em] mt-1">{formErrors.password}</p>}
                                <Link className="text-[0.7em] text-green-600 hover:underline block mt-1" to='/forgot-password'>نسيت كلمة المرور؟</Link>
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
                                {formErrors.secretKey && <p className="text-red-500 text-[0.7em] mt-1">{formErrors.secretKey}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full custom-button py-1 rounded-[5px]"
                            >
                                تسجيل الدخول
                            </button>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-[0.8em] text-gray-600 mb-1">أدخل رمز OTP</label>
                                <input
                                    type="text"
                                    value={otpCode}
                                    onChange={handleOtpChange}
                                    className="w-full px-3 py-1 custom-input"
                                />
                                {otpError && <p className="text-red-500 text- mt-1">{otpError}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-1 rounded-md hover:bg-green-600 transition"
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
