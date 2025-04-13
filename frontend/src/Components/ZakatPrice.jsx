import React, { useContext, useState } from "react";
import { ZakatContext } from "./ZakatProvider";
import ZakatDetails from "./ZakatDetails"; // Import the new component

export const ZakatPrice = () => {
    const { zakatFormInfos,onClose, setShowResult, saveZakatHistory,isUnnaire ,nissab } = useContext(ZakatContext);
    const [showDetails, setShowDetails] = useState(false);
    const formatNumber = (num) => (!num ? "0" : num.toLocaleString("fr-FR"));
    const handlePrint = () => {
        window.print();
      };
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-[40em] mx-auto mt-5">
      <h2 className="text-2xl font-bold text-green-900 text-center mb-4">
        تفاصيل حساب الزكاة
      </h2>

      <div className="space-y-3 text-lg text-gray-800">
        <div className="flex justify-between">
          <span>قيمة النصاب:</span>
          <span className="font-bold">{formatNumber(nissab)} د.ج</span>
        </div>

        <div className="flex justify-between">
          <span>الوعاء الزكوي:</span>
          <span className="font-bold">{formatNumber(zakatFormInfos.totalAmount)} د.ج</span>
        </div>

        <div className="flex justify-between text-green-800 font-bold">
          <span>قيمة الزكاة:</span>
          <span>{formatNumber(zakatFormInfos.zakatAmount)} د.ج</span>
        </div>

        <div className="flex justify-between">
          <span>التاريخ:</span>
          <span>{new Date().toISOString().split("T")[0]}</span>
        </div>

        <div className="flex justify-between">
          <span>نوع الحول:</span>
          <span>{isUnnaire ? "هجري" : "ميلادي"}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={()=>setShowResult(false)}
          className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
        >
          إغلاق
        </button>

        <button
          onClick={handlePrint}
          className="py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          طباعة
        </button>
      </div>
    </div>

           
    );
};
