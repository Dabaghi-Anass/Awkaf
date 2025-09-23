import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from "../Components/Loader";
import { MessagePopup } from '../Components/MessagePopup';

export const Login = ({ handleChange, formData }) => {
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({ message: '', type: '' });
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
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        setIsLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/apif/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok && result.access && result.refresh) {
                localStorage.setItem("accessToken", result.access);
                localStorage.setItem("refreshToken", result.refresh);
                setPopup({ message: "تم تسجيل الدخول بنجاح", type: "success" });
                setTimeout(() => navigate("/"), 1500);
            } else {
                setPopup({ 
                    message: result.detail || "إسم المستخدم أو كلمة المرور غير صحيحة", 
                    type: "error" 
                });
            }
        } catch (error) {
            setPopup({ 
                message: "حدث خطأ غير متوقع. حاول مرة أخرى لاحقًا.", 
                type: "error" 
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen w-dvw bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg py-4 px-8 w-full max-w-[22em]">
                <h2 className="text-[1.2em] font-bold text-center text-gray-700 mb-6">
                    تسجيل الدخول
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    </div>
                    <button
                        type="submit"
                        className='custom-button text-[0.9em] py-1 px-2 w-full mt-0 rounded-[5px]'
                        disabled={isLoading}
                    >
                        {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
                    </button>
                </form>
                <p className="mt-2 text-center text-[0.7em] text-gray-600">
                    لا تملك حساب؟ <Link className="text-green-600 hover:underline" to='/register'>إنشاء حساب</Link>
                </p>
            </div>
            <MessagePopup
                message={popup.message}
                type={popup.type}
                onClose={() => setPopup({ message: "", type: "" })}
            />
        </div>
    );
};