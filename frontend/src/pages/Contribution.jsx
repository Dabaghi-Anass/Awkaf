import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

export const Contribution = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contribution Data:", formData);
    alert("شكراً لمساهمتك! سيتم التواصل معك قريباً.");
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 text-right" dir="rtl">
        <h1 className="text-4xl font-extrabold text-green-900 text-center mb-6">
          المساهمة في المشروع
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
          <p className="text-green-900 text-lg text-center mb-4">
            يمكنك دعم هذا المشروع والمساهمة في تحقيق أهدافه.
          </p>
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-900 font-semibold mb-1">الاسم الكامل</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border border-green-900 rounded-lg focus:ring focus:ring-green-400"
              />
            </div>
            
            <div>
              <label className="block text-green-900 font-semibold mb-1">البريد الإلكتروني</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border border-green-900 rounded-lg focus:ring focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-green-900 font-semibold mb-1">المبلغ (دج)</label>
              <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border border-green-900 rounded-lg focus:ring focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-green-900 font-semibold mb-1">رسالة (اختياري)</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                className="w-full p-3 border border-green-900 rounded-lg focus:ring focus:ring-green-400"
                rows="3"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-900 text-white py-3 font-bold rounded-lg hover:bg-green-800 transition"
            >
              إرسال المساهمة
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
