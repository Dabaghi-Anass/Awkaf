import React, { useState } from "react";
import { SendMessage } from "./Components/SendMessage";


export const Contact = () => {
  const defaultValue = {
    first_name: "",
    last_name: "",
    sender_email: "",
    phone: "",
    message: "",
  };
  
  const [userMessage, setUserMessage] = useState(defaultValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserMessage((u) => ({ ...u, [name]: value }));
  };

  return (
    <>
     
      <div dir="rtl" className="   flex flex-col items-center justify-center mx-auto bg-gray-100 p-6">
        <div className="bg-white sendMessage mt-15 shadow-lg rounded-lg px-8 py-2 max-w-[35em] w-full text-center">
          {/* Contact Title */}
          <h1 className="text-[1.8em] font-bold text-green3 mb-4">
            تواصل معنا
          </h1>
          <p className="text-gray-400 font-[600] text-[0.8em] mb-6">
            راسلنا عبر البريد الإلكتروني، اتصل، أو املأ النموذج لمعرفة كيف يمكننا حل مشكلة المراسلة لديك.
          </p>

          {/* SendMessage Form Component */}
          <SendMessage
            userMessage={userMessage}
            setUserMessage={setUserMessage}
            handleChange={handleChange}
            defaultValue={defaultValue}
          />
        </div>

      </div>
     
    </>
  );
};
