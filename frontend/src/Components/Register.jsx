import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessagePopup } from './MessagePopup';
import { useApi } from '@/ApiProvider';

export const Register = ({ handleChange, formData }) => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const api = useApi();
    const [popup, setPopup] = useState({ message: "", type: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "اسم المستخدم لا يمكن أن يكون فارغًا";
            valid = false;
        } else if (formData.username.length < 3) {
            newErrors.username = "اسم المستخدم يجب أن يكون 3 أحرف على الأقل";
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "البريد الإلكتروني لا يمكن أن يكون فارغًا";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "تنسيق البريد الإلكتروني غير صالح";
            valid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = "كلمة المرور لا يمكن أن تكون فارغة";
            valid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "كلمة المرور يجب أن تكون أكثر من 7 أحرف";
            valid = false;
        } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])/.test(formData.password)) {
            newErrors.password = "يجب أن تحتوي كلمة المرور على رقم ورمز واحد على الأقل";
            valid = false;
        }

        if (!formData.confirm_password.trim()) {
            newErrors.confirm_password = "يجب تأكيد كلمة المرور";
            valid = false;
        } else if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = "كلمتا المرور غير متطابقتين!";
            valid = false;
        }

        if (!formData.company.trim()) {
            newErrors.company = "اسم الشركة لا يمكن أن يكون فارغًا";
            valid = false;
        }

        if (!formData.first_name.trim()) {
            newErrors.first_name = "الاسم لا يمكن أن يكون فارغًا";
            valid = false;
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = "اللقب لا يمكن أن يكون فارغًا";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);

        // Clear error for the field being edited
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            setPopup({
                message: "يرجى تصحيح الأخطاء في النموذج",
                type: "error"
            });
            return;
        }

        setLoading(true);

        try {
           
            const [result, status, error] = await api.post("/user/register/", formData);

            if (!error && status >= 200 && status < 300) {
                setPopup({
                    message: "تم التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني.",
                    type: "success"
                });
                
                // Clear form data
                formRef.current?.reset();
                
                // Navigate to login after 3 seconds
                setTimeout(() => navigate('/'), 3000);
            } else {
                console.error("Registration failed:", error || result);
                
                // Handle specific backend errors
                let errorMessage = "فشل التسجيل، يرجى التحقق من صحة البيانات المدخلة.";
                
                if (result) {
                    // Check for specific field errors
                    if (result.username) {
                        const usernameError = Array.isArray(result.username) 
                            ? result.username[0] 
                            : result.username;
                        
                        if (usernameError.includes("already exists") || 
                            usernameError.includes("user with this username already exists")) {
                            errorMessage = "اسم المستخدم موجود بالفعل";
                        } else {
                            errorMessage = usernameError;
                        }
                    } else if (result.email) {
                        const emailError = Array.isArray(result.email) 
                            ? result.email[0] 
                            : result.email;
                        
                        if (emailError.includes("already exists") || 
                            emailError.includes("user with this email already exists")) {
                            errorMessage = "البريد الإلكتروني مسجل بالفعل";
                        } else {
                            errorMessage = emailError;
                        }
                    } else if (result.password) {
                        const passwordError = Array.isArray(result.password) 
                            ? result.password[0] 
                            : result.password;
                        errorMessage = passwordError;
                    } else if (result.error || result.detail) {
                        errorMessage = result.error || result.detail;
                    }
                }
                
                setPopup({
                    message: errorMessage,
                    type: "error"
                });
            }
        } catch (error) {
            console.error("Registration error:", error);
            setPopup({
                message: "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div dir='rtl' className='h-screen w-dvw flex items-center justify-center bg-gray-200'>
                <div className="wrapper bg-white rounded-lg py-4 px-10 w-full max-w-sm shadow-lg">
                    <header className='text-[1.2em] text-gray-700 font-bold mb-6 text-center'>
                        تسجيل حساب جديد
                    </header>
                    
                    <form dir="rtl" ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                        {/* First Name */}
                        <div>
                            <label className="block text-right text-[0.7em] text-gray-600 mb-1">
                                الاسم <span className="text-red-500">*</span>
                            </label>
                            <input 
                                className='text-[0.7em] custom-input w-full py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                type='text'
                                name='first_name'
                                value={formData.first_name}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                            {errors.first_name && (
                                <div className='text-red-500 text-[0.6em] text-right mt-1'>
                                    {errors.first_name}
                                </div>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-right text-[0.7em] text-gray-600 mb-1">
                                اللقب <span className="text-red-500">*</span>
                            </label>
                            <input 
                                className='text-[0.7em] custom-input w-full py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                type='text'
                                name='last_name'
                                value={formData.last_name}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                            {errors.last_name && (
                                <div className='text-red-500 text-[0.6em] text-right mt-1'>
                                    {errors.last_name}
                                </div>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-right text-[0.7em] text-gray-600 mb-1">
                                إسم المستخدم <span className="text-red-500">*</span>
                            </label>
                            <input 
                                className='text-[0.7em] custom-input w-full py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                            {errors.username && (
                                <div className='text-red-500 text-[0.6em] text-right mt-1'>
                                    {errors.username}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-right text-[0.7em] text-gray-600 mb-1">
                                البريد الإلكتروني <span className="text-red-500">*</span>
                            </label>
                            <input 
                                className='text-[0.7em] custom-input w-full py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                            {errors.email && (
                                <div className='text-red-500 text-[0.6em] text-right mt-1'>
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        {/* Company */}
                       

                        {/* Password */}
                        <div>
                            <label className="block text-right text-[0.7em] text-gray-600 mb-1">
                                كلمة المرور <span className="text-red-500">*</span>
                            </label>
                            <input 
                                className='text-[0.7em] custom-input w-full py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                            {errors.password && (
                                <div className='text-red-500 text-[0.6em] text-right mt-1'>
                                    {errors.password}
                                </div>
                            )}
                            <p className="text-[0.6em] text-gray-500 mt-1">
                                يجب أن تحتوي على 8 أحرف على الأقل، رقم ورمز واحد
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-right text-[0.7em] text-gray-600 mb-1">
                                تأكيد كلمة المرور <span className="text-red-500">*</span>
                            </label>
                            <input 
                                className='text-[0.7em] custom-input w-full py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition'
                                type='password'
                                name='confirm_password'
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                                disabled={loading}
                            />
                            {errors.confirm_password && (
                                <div className='text-red-500 text-[0.6em] text-right mt-1'>
                                    {errors.confirm_password}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            className='custom-button text-[0.9em] py-2 px-2 w-full mt-4 rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg'
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    جاري التسجيل...
                                </span>
                            ) : (
                                "إنشاء حساب"
                            )}
                        </button>

                        <p className='mt-3 text-center text-[0.7em] text-gray-700'>
                            لديك حساب بالفعل؟{' '}
                            <Link 
                                className='text-green-600 font-medium hover:underline' 
                                to='/'
                            >
                                تسجيل الدخول
                            </Link>
                        </p>
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