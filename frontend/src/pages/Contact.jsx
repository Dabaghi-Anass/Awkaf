import React, { useState } from "react";
import { SendMessage } from "../Components/SendMessage";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

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
      <Header />
      <div dir="rtl" className="mt-25  flex flex-col items-center justify-center mx-auto bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
          {/* Contact Title */}
          <h1 className="text-2xl font-bold text-green-500 mb-4">
            تواصل معنا
          </h1>
          <p className="text-gray-600 text-sm mb-6">
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

        {/* Decorative Elements */}
        <div className="absolute top-45 left-20 w-20 h-20 bg-green-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-20 w-28 h-28 bg-green-300 rounded-full opacity-50"></div>
      </div>
      <Footer></Footer>
    </>
  );
};
