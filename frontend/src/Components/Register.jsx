import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = ({ handleChange, formData }) => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "اسم المستخدم لا يمكن أن يكون فارغًا";
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
        }

        if (!formData.confirm_password.trim()) {
            newErrors.confirm_password = "يجب تأكيد كلمة المرور";
            valid = false;
        } else if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = "كلمتا المرور غير متطابقتين";
            valid = false;
        }

        if (!formData.company.trim()) {
            newErrors.company = "اسم الشركة لا يمكن أن يكون فارغًا";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);

        // Remove error message when user starts typing
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/user/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                console.error("فشل التسجيل");
            }
        } catch (error) {
            console.error("خطأ:", error);
        }
    };

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className="wrapper bg-[#035116] w-[40em] pb-15 my-auto rounded-3xl">
                <header className='login-header relative text-center text-4xl text-[#F2CB05] font-bold py-5 mb-15'>تسجيل حساب</header>
                <form dir="rtl" ref={formRef} onSubmit={handleSubmit} className='login-form text-center'>
                    {/* Username */}
                    <div className='my-7'>
                        <input 
                            className={`bg-white py-3 px-2 w-4/5 transition-all duration-300 outline-none rounded-sm ${errors.username ? 'border-red-500 ring-2 ring-red-400' : 'focus:border-[#F2CB05] focus:ring-2 focus:ring-amber-300'}`}
                            type="text" placeholder="إسم المستخدم" name='username' 
                            value={formData.username} onChange={handleInputChange} 
                        />
                        {errors.username && <div className='w-4/5 inline-block text-red-500 text-right text-sm'>{errors.username}</div>}
                    </div>

                    {/* Email */}
                    <div className='my-7'>
                        <input 
                            className={`bg-white py-3 px-2 w-4/5 transition-all duration-300 outline-none rounded-sm ${errors.email ? 'border-red-500 ring-2 ring-red-400' : 'focus:border-[#F2CB05] focus:ring-2 focus:ring-amber-300'}`}
                            type="email" placeholder="البريد الإلكتروني" name='email' 
                            value={formData.email} onChange={handleInputChange} 
                        />
                        {errors.email && <div className='w-4/5 inline-block text-red-500 text-right text-sm'>{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className='my-7'>
                        <input 
                            className={`bg-white py-3 px-2 w-4/5 transition-all duration-300 outline-none rounded-sm ${errors.password ? 'border-red-500 ring-2 ring-red-400' : 'focus:border-[#F2CB05] focus:ring-2 focus:ring-amber-300'}`}
                            type="password" placeholder="كلمة المرور" name='password' 
                            value={formData.password} onChange={handleInputChange} 
                        />
                        {errors.password && <div className='w-4/5 inline-block text-red-500 text-right text-sm'>{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className='my-7'>
                        <input 
                            className={`bg-white py-3 px-2 w-4/5 transition-all duration-300 outline-none rounded-sm ${errors.confirm_password ? 'border-red-500 ring-2 ring-red-400' : 'focus:border-[#F2CB05] focus:ring-2 focus:ring-amber-300'}`}
                            type="password" placeholder="تأكيد كلمة المرور" name='confirm_password' 
                            value={formData.confirm_password} onChange={handleInputChange} 
                        />
                        {errors.confirm_password && <div className='w-4/5 inline-block text-red-500 text-right text-sm'>{errors.confirm_password}</div>}
                    </div>

                    {/* Company */}
                    <div className='my-7'>
                        <input 
                            className={`bg-white py-3 px-2 w-4/5 transition-all duration-300 outline-none rounded-sm ${errors.company ? 'border-red-500 ring-2 ring-red-400' : 'focus:border-[#F2CB05] focus:ring-2 focus:ring-amber-300'}`}
                            type="text" placeholder="إسم الشركة" name='company' 
                            value={formData.company} onChange={handleInputChange} 
                        />
                        {errors.company && <div className='w-4/5 inline-block text-red-500 text-right text-sm'>{errors.company}</div>}
                    </div>

                    <button className='bg-[#F2CB05] py-2 w-[40%] text-[#035116] rounded-sm font-bold' type="submit">إنشاء حساب</button>
                    <p className='mt-10 text-white'>لديك حساب بالفعل؟ <Link className='inline-block text-sm text-[#F2CB05] font-light hover:underline' to='/login'>تسجيل الدخول</Link></p>
                </form>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-green-600 text-2xl font-bold mb-3">تم التسجيل بنجاح!</h2>
                        <p>سيتم تحويلك إلى صفحة تسجيل الدخول قريبًا...</p>
                        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={() => navigate('/login')}>الانتقال إلى تسجيل الدخول</button>
                    </div>
                </div>
            )}
        </div>
    );
};
