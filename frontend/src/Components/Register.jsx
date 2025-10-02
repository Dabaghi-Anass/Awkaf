import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = ({ handleChange, formData }) => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
            newErrors.company = "!اسم الشركة لا يمكن أن يكون فارغًا";
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

        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
        }
    };

   const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // 🔄 Active le chargement

    try {
        const response = await fetch("http://127.0.0.1:8000/apif/user/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setShowSuccess(true);
            setTimeout(() => navigate('/'), 3000);
        } else {
            console.error("فشل التسجيل");
        }
    } catch (error) {
        console.error("خطأ:", error);
    } finally {
        setLoading(false); //
    }
};


    return (
        <div dir='rtl' className='h-screen w-dvw flex items-center justify-center bg-gray-200'>
            <div className="wrapper bg-white rounded-lg py-3  px-10 w-full max-w-sm shadow-lg text-center">
                <header className='text-[1.2em] text-gray-700 font-bold mb-6'>تسجيل حساب</header>
                <form dir="rtl" ref={formRef} onSubmit={handleSubmit}>
                    <div className='my-1'>
                        <label className="block text-right text-[0.7em] text-gray-600 mb-1">الاسم</label>
                        <input 
                            className='text-[0.6em] custom-input w-full py-1 px-3'
                            type='text'
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                        {errors.first_name && <div className='text-red-500 text-[0.6em] text-right my-1'>{errors.first_name}</div>}
                        </div>

                        <div className='my-1'>
                        <label className="block text-right text-[0.7em] text-gray-600 mb-1">اللقب</label>
                        <input 
                            className='text-[0.6em] custom-input w-full py-1 px-3'
                            type='text'
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                        {errors.last_name && <div className='text-red-500 text-[0.6em] text-right my-1'>{errors.last_name}</div>}
                    </div>

                    {['username', 'email', 'password', 'confirm_password',].map((field, index) => (
                        <div key={index} className='my-1'>
                            <label className="block text-right text-[0.7em] text-gray-600 mb-1">{field === 'username' ? "إسم المستخدم" : field === 'email' ? "البريد الإلكتروني" : field === 'password' ? "كلمة المرور" : field === 'confirm_password' ? "تأكيد كلمة المرور" : "إسم الشركة"} </label>
                            <input 
                                className={` text-[0.6em] custom-input w-full py-1 px-3 `}
                                type={field.includes('password') ? 'password' : 'text'} 
                                name={field} 
                                value={formData[field]} onChange={handleInputChange} 
                            />
                            {errors[field] && <div className='text-red-500 text-[0.6em] text-right my-1  '>{errors[field]}</div>}
                        </div>
                    ))}
                    <button
                            className='custom-button text-[0.9em] py-1 px-2 w-full mt-2 rounded-[5px] disabled:opacity-50'
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "جاري التسجيل..." : "إنشاء حساب"}
                    </button>

                    <p className='mt-2 text-[0.7em] text-gray-700'>لديك حساب بالفعل؟ <Link className='text-green-600 font-medium hover:underline' to='/'>تسجيل الدخول</Link></p>
                </form>
            </div>

            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-green-600 text-2xl font-bold mb-3">تم التسجيل بنجاح!</h2>
                        <p>سيتم تحويلك إلى صفحة تسجيل الدخول قريبًا...</p>
                        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={() => navigate('/')}>الانتقال إلى تسجيل الدخول</button>
                    </div>
                </div>
            )}
        </div>
    );
};
