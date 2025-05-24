import React, { useState } from "react";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await fetch("http://127.0.0.1:8000/apif/user/request-password-reset/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
            } else {
                setError(data.error || "حدث خطأ أثناء إرسال البريد الإلكتروني.");
            }
        } catch (err) {
            setError("حدث خطأ في الاتصال بالخادم.");
        }
    };

    return (
        <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-[25em]">
                <h2 className="text-[1.2em] font-bold mb-4 text-center text-gray-700">إعادة تعيين كلمة المرور</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[0.7em] text-gray-600 mb-1">البريد الإلكتروني</label>
                        <input
                            type="email"
                            className="w-full px-3 py-1 custom-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="custom-button text-[0.9em] py-1 px-2 w-full mt-0 rounded-[5px]"
                    >
                        إرسال الرابط
                    </button>
                    {message && <p className="text-green-600 text-sm">{message}</p>}
                    {error && <p className="text-red-500 text-[0.7em]">{error}</p>}
                </form>
            </div>
        </div>
    );
};
