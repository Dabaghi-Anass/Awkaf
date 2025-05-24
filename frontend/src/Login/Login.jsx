import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ handleChange, formData }) => {
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
        const errors = validate(formData);
        console.log("this is formData:",formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
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
    console.log("this is form errors:",formErrors);
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
                body: JSON.stringify({ username: formData.username, otp: otpCode }),

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
        <div dir="rtl" className="flex items-center justify-center min-h-screen w-dvw bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg py-4 px-8 w-full max-w-[22em]">
                <h2 className="text-[1.2em] font-bold text-center text-gray-700 mb-6">
                    {otpSent ? "تحقق من OTP" : "تسجيل الدخول"}
                </h2>
                <form onSubmit={otpSent ? handleOtpSubmit : handleSubmit} className="space-y-4">
                    {!otpSent ? (
                        <>
                            <div>
                                <label className="block text-[0.7em] text-gray-600 mb-1 ">إسم المستخدم</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="custom-input w-full py-1 px-3"
                                    
                                />
                                {formErrors.username && <p className="text-red-500 text-[0.6em]">{formErrors.username}</p>}
                            </div>
                            <div>
                                <label className="block text-[0.7em] text-gray-600 mb-1">كلمة المرور</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="custom-input w-full py-1 px-3"
                                    
                                />
                                {formErrors.password && <p className="text-red-500 text-[0.6em]">{formErrors.password}</p>}
                                <Link className="text-[0.7em] text-green-600 hover:underline block mt-1" to='/forgot-password'>نسيت كلمة المرور؟</Link>
                                {loginError && <p className="text-red-500 text-[0.7em] mt-2">{loginError}</p>}
                            </div>
                            <button
                                type="submit"
                                className='custom-button text-[0.9em] py-1 px-2 w-full mt-0 rounded-[5px]'
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
                <p className="mt-2 text-center text-[0.7em] text-gray-600">
                    لا تملك حساب؟ <Link className="text-green-600 hover:underline" to='/register'>إنشاء حساب</Link>
                </p>
            </div>
        </div>
    );
};
