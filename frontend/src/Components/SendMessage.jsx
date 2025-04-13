import React from 'react';

export const SendMessage = ({ userMessage, handleChange, defaultValue, setUserMessage }) => {
    
    const sendMessage = async (event) => {
        event.preventDefault();

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
        }
    };

    return (
        <div dir='rtl' className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">

            <form onSubmit={sendMessage} className="space-y-4">
                <div className="flex gap-4">
                    <input 
                        type="text" 
                        placeholder="الاسم الأول" 
                        name="first_name" 
                        value={userMessage.first_name} 
                        onChange={handleChange} 
                        className="w-1/2 p-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                    <input 
                        type="text" 
                        placeholder="اسم العائلة" 
                        name="last_name" 
                        value={userMessage.last_name} 
                        onChange={handleChange} 
                        className="w-1/2 p-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>

                <input 
                    type="email" 
                    placeholder="البريد الإلكتروني" 
                    name="sender_email" 
                    value={userMessage.sender_email} 
                    onChange={handleChange} 
                    className="w-full p-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />

                <input 
                    type="text" 
                    placeholder="رقم الهاتف" 
                    name="phone" 
                    value={userMessage.phone} 
                    onChange={handleChange} 
                    className="w-full p-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />

                <textarea 
                    placeholder="كيف يمكننا مساعدتك؟" 
                    name="message" 
                    value={userMessage.message} 
                    onChange={handleChange} 
                    className="w-full p-3 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none min-h-[120px] outline-none"
                ></textarea>

                <button 
                    type="submit" 
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                >
                    إرسال
                </button>

                <p className="text-gray-600 text-sm text-center">
                    بالاتصال بنا، فإنك توافق على <span className="text-green-600 font-semibold cursor-pointer">شروط الخدمة</span> و <span className="text-green-600 font-semibold cursor-pointer">سياسة الخصوصية</span> الخاصة بنا.
                </p>
            </form>
        </div>
    );
};
