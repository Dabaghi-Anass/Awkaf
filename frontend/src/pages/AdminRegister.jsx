import React, { useState } from "react";

export const AdminRegister = () => {
    const initialAdminData = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [adminForm, setAdminForm] = useState(initialAdminData);

    const handleAdmin = (e) => {
        const { name, value } = e.target;
        setAdminForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                alert("Admin registered successfully!");
                setAdminForm(initialAdminData); // Reset form
            } else {
                alert("Something went wrong: " + JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">تسجيل المشرف</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-1">إسم المستخدم</label>
                        <input
                            type="text"
                            name="username"
                            value={adminForm.username}
                            onChange={handleAdmin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={adminForm.email}
                            onChange={handleAdmin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            value={adminForm.password}
                            onChange={handleAdmin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">تأكيد كلمة المرور</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={adminForm.confirmPassword}
                            onChange={handleAdmin}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
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
