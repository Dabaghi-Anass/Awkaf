import React, { useState } from "react";

export const AdminRegister = () => {
    const initialAdminData = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [adminForm, setAdminForm] = useState(initialAdminData);
    const [formErrors, setFormErrors] = useState({});

    const handleAdmin = (e) => {
        const { name, value } = e.target;
        setAdminForm((prevState) => ({ ...prevState, [name]: value }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Efface l'erreur
    };

    const validateForm = () => {
        const errors = {};
        if (!adminForm.username.trim()) errors.username = "إسم المستخدم مطلوب.";
        if (!adminForm.email.trim()) {
            errors.email = "البريد الإلكتروني مطلوب.";
        } else if (!/\S+@\S+\.\S+/.test(adminForm.email)) {
            errors.email = "البريد الإلكتروني غير صالح.";
        }
        if (!adminForm.password) errors.password = "كلمة المرور مطلوبة.";
        if (adminForm.password.length < 6) errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
        if (!adminForm.confirmPassword) errors.confirmPassword = "تأكيد كلمة المرور مطلوب.";
        if (adminForm.password && adminForm.confirmPassword && adminForm.password !== adminForm.confirmPassword) {
            errors.confirmPassword = "كلمتا المرور غير متطابقتين.";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        console.log("Sending data:", adminForm);

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/admin/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adminForm),
            });

            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok) {
                alert("تم تسجيل المشرف بنجاح!");
                setAdminForm(initialAdminData);
            } else {
                alert("حدث خطأ: " + JSON.stringify(data));
            }
        } catch (error) {
            console.error("خطأ أثناء الإرسال:", error);
        }
    };

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">تسجيل المشرف</h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-1">إسم المستخدم</label>
                        <input
                            type="text"
                            name="username"
                            value={adminForm.username}
                            onChange={handleAdmin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {formErrors.username && <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={adminForm.email}
                            onChange={handleAdmin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            value={adminForm.password}
                            onChange={handleAdmin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">تأكيد كلمة المرور</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={adminForm.confirmPassword}
                            onChange={handleAdmin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {formErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                        تسجيل
                    </button>
                </form>
            </div>
        </div>
    );
};
