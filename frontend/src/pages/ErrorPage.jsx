import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      

      {/* Main Error Content */}
      <div className="bg-gray-300 min-h-screen flex items-center justify-center pt-24 pb-10 px-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">خطأ 404</h1>
          <p className="text-gray-700 text-lg mb-6">
            الصفحة التي تحاول الوصول إليها غير موجودة أو ليس لديك الصلاحية للوصول إليها.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>

      {/* Green Divider */}
      <div className="flex justify-center my-8">
        <div className="w-24 h-1 bg-green-500"></div>
      </div>

      
    </>
  );
}
