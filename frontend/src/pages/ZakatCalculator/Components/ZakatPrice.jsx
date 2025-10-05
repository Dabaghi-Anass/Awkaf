import React, { useContext, useState } from "react";
import { ZakatContext } from "../../../Components/ZakatProvider";
import { Trash } from "../../../assets/icons/trash";
import { Link } from "react-router-dom";
import { Printed } from "./Printed";
import { formatNumber } from "./CalForm";

export const today = new Date().toISOString().split("T")[0];
export const ZakatPrice = () => {
  const { zakatFormInfos, setShowResult, saveZakatHistory, nissab } = useContext(ZakatContext);

  const zakatTax = zakatFormInfos.zakatAmount * 1.26;

 

  const handlePrint = () => {
    window.print();
  };
  
 
  
  

  return (
     <>
      
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
        <div className="bg-white rounded-xl shadow-xl max-[510px]:w-[70%] w-full max-w-[30em] relative overflow-hidden animate-in fade-in zoom-in duration-300">
          
          {/* Header */}
          <div className="bg-green4 p-4 text-white relative ">
            <h2 className="text-lg font-bold text-center max-[510px]:text-sm">تفاصيل الحساب</h2>
            <p className="text-emerald-100 text-center text-xs">
              نتائج حساب الزكاة المفصلة
            </p>
            
            {/* Close button */}
            <button
              className="absolute top-2 right-2 p-1  rounded-full transition"
              onClick={() => setShowResult(false)}
            >
              <Trash width={30} fill={"#ffffff"}  />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 text-sm">
            {/* Zakat amounts */}
            <div className="space-y-3 mb-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex justify-between max-[510px]:justify-evenly max-[510px]:p-1 max-[510px]:rounded-sm ">
                <span className="text-emerald-800 font-medium max-[510px]:text-xs">قيمة الزكاة (معنا):</span>
                <span className="text-emerald-700 font-bold max-[510px]:text-xs">{formatNumber(zakatFormInfos.zakatAmount)} د.ج</span>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 flex justify-between max-[510px]:justify-evenly max-[510px]:p-1 max-[510px]:rounded-sm">
                <span className="text-rose-800 font-medium max-[510px]:text-xs ">قيمة الزكاة بالضريبة IBS:</span>
                <span className="text-rose-700 font-bold max-[510px]:text-xs">{formatNumber(zakatTax)} د.ج</span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4  ">
              <div className="flex justify-between mx-auto bg-gray-200 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>قيمة النصاب:</span>
                <span className="font-bold">{formatNumber(nissab)} د.ج</span>
              </div>
              <div className="flex justify-between mx-auto bg-gray-200 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>الوعاء الزكوي:</span>
                <span className="font-bold">{formatNumber(zakatFormInfos.totalAmount)} د.ج</span>
              </div>
              <div className="flex justify-between mx-auto bg-gray-200 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>التاريخ:</span>
                <span className="font-bold">{today}</span>
              </div>
            
            </div>

            {/* Contact Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-4 text-xs text-right">
              إن أردت إخراج الزكاة دون ضريبة{" "}
              <Link to="/contact" className="text-green3 font-bold hover:underline">
                تواصل معنا
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={saveZakatHistory}
                className="flex-1 custom-button py-2 rounded-sm"
              >
                حفظ
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 custom-button py-2 rounded-sm"
              >
                طباعة
              </button>
            </div>
          </div>
        </div>
      </div>

      
         <Printed />
     
     
    </>
  );
};