import React, { useState } from 'react';
import { MessagePopup } from '../../../Components/MessagePopup';

export const SendMessage = ({ userMessage, handleChange, defaultValue, setUserMessage }) => {
    const [loading, setLoading] = useState(false);
    const [popup,setPopup]=useState({message:"",type:""});
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
                setPopup({message:"تم إرسال الرسالة بنجاح!",type:"success"});
                setUserMessage(defaultValue);
            } else {
                setPopup({message:"حدث خطاء",type:"error"});
            }
        } catch (error) {
            setPopup({message:"حدث خطاء",type:"error"});
        } finally {
            setLoading(false);
        }
    };
    return (
        <div dir='rtl' className="  w-full   p-4 sm:p-6  form">
            <div className="space-y-4 sm:space-y-6   ">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        placeholder="الاسم الأول" 
                        name="first_name" 
                        value={userMessage.first_name} 
                        onChange={handleChange} 
                        className="w-full sm:p-2 custom-input sm:text-base"
                        disabled={loading}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="اسم العائلة" 
                        name="last_name" 
                        value={userMessage.last_name} 
                        onChange={handleChange} 
                        className="w-full sm:p-2 custom-input sm:text-base"
                        disabled={loading}
                        required
                    />
                </div>

                {/* Email Field */}
                <input 
                    type="email" 
                    placeholder="البريد الإلكتروني" 
                    name="sender_email" 
                    value={userMessage.sender_email} 
                    onChange={handleChange} 
                    className="w-full sm:p-2 custom-input sm:text-base"
                    disabled={loading}
                    required
                />

                {/* Phone Field */}
                <input 
                    type="tel" 
                    placeholder="رقم الهاتف" 
                    name="phone" 
                    value={userMessage.phone} 
                    onChange={handleChange} 
                    className="w-full sm:p-2 custom-input sm:text-base"
                    disabled={loading}
                    title="الرجاء إدخال رقم هاتف جزائري صالح"
                    required
                />

                {/* Message Field */}
                <textarea 
                    placeholder="كيف يمكننا مساعدتك؟" 
                    name="message" 
                    value={userMessage.message} 
                    onChange={handleChange} 
                    rows="5"
                    className="w-full sm:p-2 custom-input resize-none text-sm sm:text-base min-h-[120px]"
                    disabled={loading}
                    required
                />

                {/* Submit Button */}
                <button 
                    onClick={sendMessage}
                    className={`custom-button w-full max-sm:w-3/4 text-sm sm:text-base ${
                        loading 
                            ? 'opacity-60 cursor-not-allowed' 
                            : 'hover:bg-green-700 active:bg-green-800'
                    }`}
                    disabled={loading}
                >
                    {loading ? "جاري الإرسال..." : "إرسال"}
                </button>

                {/* Terms Text */}
                <p className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed px-2">
                    بالاتصال بنا، فإنك توافق على{' '}
                    <span className="text-green-600 font-semibold cursor-pointer hover:text-green-700">
                        شروط الخدمة
                    </span>
                    {' '}و{' '}
                    <span className="text-green-600 font-semibold cursor-pointer hover:text-green-700">
                        سياسة الخصوصية
                    </span>
                    {' '}الخاصة بنا.
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