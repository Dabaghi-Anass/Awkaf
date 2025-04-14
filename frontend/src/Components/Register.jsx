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
            newErrors.confirm_password = "كلمتا المرور غير متطابقتين!";
            valid = false;
        }

        if (!formData.company.trim()) {
            newErrors.company = "!اسم الشركة لا يمكن أن يكون فارغًا";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);

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
        <div dir='rtl' className='h-screen w-dvw flex items-center justify-center bg-gray-200'>
            <div className="wrapper bg-white rounded-lg py-5  px-10 w-full max-w-sm shadow-lg text-center">
                <header className='text-2xl text-gray-700 font-bold mb-6'>تسجيل حساب</header>
                <form dir="rtl" ref={formRef} onSubmit={handleSubmit}>
                    {['username', 'email', 'password', 'confirm_password',].map((field, index) => (
                        <div key={index} className='my-1'>
                            <label className="block text-right text-[0.9em] text-gray-600 mb-1">{field === 'username' ? "إسم المستخدم" : field === 'email' ? "البريد الإلكتروني" : field === 'password' ? "كلمة المرور" : field === 'confirm_password' ? "تأكيد كلمة المرور" : "إسم الشركة"} </label>
                            <input 
                                className={` text-[0.9em] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                type={field.includes('password') ? 'password' : 'text'} 
                                name={field} 
                                value={formData[field]} onChange={handleInputChange} 
                            />
                            {errors[field] && <div className='text-red-500 text-[0.8em] text-right my-1  '>{errors[field]}</div>}
                        </div>
                    ))}
                    <button className='bg-green-600 mt-2 text-white py-2 w-full rounded-lg font-medium hover:bg-green-700' type="submit">إنشاء حساب</button>
                    <p className='mt-2 text-sm text-gray-700'>لديك حساب بالفعل؟ <Link className='text-green-600 font-medium hover:underline' to='/'>تسجيل الدخول</Link></p>
                </form>
            </div>

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
