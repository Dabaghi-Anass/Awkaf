import React, { useState } from 'react';

export const SendMessage = ({ userMessage, handleChange, defaultValue, setUserMessage }) => {
    const [loading, setLoading] = useState(false);

    const sendMessage = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/send-email/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userMessage),
            });

            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok) {
                alert("تم إرسال الرسالة بنجاح!");
                setUserMessage(defaultValue);
            } else {
                alert("حدث خطأ: " + JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("حدث خطأ أثناء إرسال الرسالة.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div dir='rtl' className="max-w-lg mx-auto bg-white">
            <form onSubmit={sendMessage} className="space-y-4">
                <div className="flex gap-4">
                    <input 
                        type="text" 
                        placeholder="الاسم الأول" 
                        name="first_name" 
                        value={userMessage.first_name} 
                        onChange={handleChange} 
                        className="custom-input w-full p-2"
                        disabled={loading}
                    />
                    <input 
                        type="text" 
                        placeholder="اسم العائلة" 
                        name="last_name" 
                        value={userMessage.last_name} 
                        onChange={handleChange} 
                        className="custom-input w-full p-2"
                        disabled={loading}
                    />
                </div>

                <input 
                    type="email" 
                    placeholder="البريد الإلكتروني" 
                    name="sender_email" 
                    value={userMessage.sender_email} 
                    onChange={handleChange} 
                    className="custom-input w-full p-2"
                    disabled={loading}
                />

                <input 
                type="number" min={0}
                placeholder="رقم الهاتف" 
                name="phone" 
                value={userMessage.phone} 
                onChange={handleChange} 
                className="custom-input w-full p-2"
                disabled={loading}
                pattern="^0[5-7][0-9]{8}$"
                title="الرجاء إدخال رقم هاتف جزائري صالح "
            />

                <textarea 
                    placeholder="كيف يمكننا مساعدتك؟" 
                    name="message" 
                    value={userMessage.message} 
                    onChange={handleChange} 
                    className="custom-input w-full p-2 min-h-[10em]"
                    disabled={loading}
                ></textarea>

                <button 
                    type="submit" 
                    className={`custom-button w-full py-2 rounded-[10px] ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? "جاري الإرسال..." : "إرسال"}
                </button>

                <p className="text-gray-600 text-sm text-center">
                    بالاتصال بنا، فإنك توافق على <span className="text-green-600 font-semibold cursor-pointer">شروط الخدمة</span> و <span className="text-green-600 font-semibold cursor-pointer">سياسة الخصوصية</span> الخاصة بنا.
                </p>
            </form>
        </div>
    );
};
