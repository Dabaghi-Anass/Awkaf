import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ handleChange, data }) => {
    const [loginError, setLoginError] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const navigate = useNavigate();

    const validate = (values) => {
        const errors = {};
        if (!values.username.trim()) {
            errors.username = "اسم المستخدم مطلوب!";
        }
        if (!values.password.trim()) {
            errors.password = "كلمة المرور مطلوبة!";
        }
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(data);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (response.ok && result.message === "OTP sent to your email. Enter OTP to proceed.") {
                setOtpSent(true);
                alert("تم إرسال رمز OTP إلى بريدك الإلكتروني.");
            } else if (result.access && result.refresh) {
                localStorage.setItem("accessToken", result.access);
                localStorage.setItem("refreshToken", result.refresh);
                navigate('/');
            } else {
                setLoginError(result.detail || "إسم المستخدم أو كلمة المرور غير صحيحة");
            }
        } catch (error) {
            setLoginError("حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.");
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otpCode.trim()) {
            alert("يرجى إدخال رمز OTP.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/token/verify/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: data.username, otp: otpCode }),
            });
            const tokens = await response.json();

            if (response.ok) {
                localStorage.setItem("accessToken", tokens.access_token);
                localStorage.setItem("refreshToken", tokens.refresh_token);
                alert("تم التحقق من OTP! تسجيل الدخول ناجح.");
                navigate("/home");
            } else {
                alert("فشل التحقق من OTP. حاول مرة أخرى.");
            }
        } catch (error) {
            alert("حدث خطأ أثناء التحقق من OTP.");
        }
    };

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen w-dvw bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    {otpSent ? "تحقق من OTP" : "تسجيل الدخول"}
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
                                {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
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
                                {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                                <Link className="text-sm text-green-600 hover:underline block mt-1" to='/'>نسيت كلمة المرور؟</Link>
                                {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
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
                                    onChange={(e) => setOtpCode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                            >
                                تحقق من OTP
                            </button>
                        </>
                    )}
                </form>
                <p className="mt-4 text-center text-gray-600">
                    لا تملك حساب؟ <Link className="text-green-600 hover:underline" to='/register'>إنشاء حساب</Link>
                </p>
            </div>
        </div>
    );
};
