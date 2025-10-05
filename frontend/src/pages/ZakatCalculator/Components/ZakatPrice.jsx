import React, { useContext, useState } from "react";
import { ZakatContext } from "../../../Components/ZakatProvider";
import { Trash } from "../../../assets/icons/trash";
import { Link } from "react-router-dom";

export const ZakatPrice = () => {
  const { zakatFormInfos, setShowResult, saveZakatHistory, isUnnaire, nissab } = useContext(ZakatContext);

  const zakatTax = zakatFormInfos.zakatAmount * 1.26;

  const formatNumber = (num) => (!num ? "0" : num.toLocaleString("fr-FR"));
  const handlePrint = () => window.print();

  const today = new Date().toISOString().split("T")[0];

  return (
     <>
      
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
        <div className="bg-white rounded-xl shadow-xl max-[510px]:w-[70%] w-full max-w-[30em] relative overflow-hidden animate-in fade-in zoom-in duration-300">
          
          {/* Header */}
          <div className="bg-green3 p-4 text-white relative ">
            <h2 className="text-lg font-bold text-center max-[510px]:text-sm">تفاصيل الحساب</h2>
            <p className="text-emerald-100 text-center text-xs">
              نتائج حساب الزكاة المفصلة
            </p>
            
            {/* Close button */}
            <button
              className="absolute top-2 right-2 p-1  rounded-full transition"
              onClick={() => setShowResult(false)}
            >
              <Trash width={30} fill={"#035116"}  />
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
              <div className="flex justify-between mx-auto bg-gray-50 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>قيمة النصاب:</span>
                <span className="font-bold">{formatNumber(nissab)} د.ج</span>
              </div>
              <div className="flex justify-between mx-auto bg-gray-50 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>الوعاء الزكوي:</span>
                <span className="font-bold">{formatNumber(zakatFormInfos.totalAmount)} د.ج</span>
              </div>
              <div className="flex justify-between mx-auto bg-gray-50 p-2 rounded max-[510px]:text-xs max-[510px]:w-[80%]">
                <span>التاريخ:</span>
                <span className="font-bold">{today}</span>
              </div>
            
            </div>

            {/* Contact Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-4 text-xs text-right">
              إن أردت إخراج الزكاة دون ضريبة{" "}
              <Link to="/contact" className="text-blue-600 font-semibold hover:underline">
                اتصل بنا
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={saveZakatHistory}
                className="flex-1 bg-emerald-600 text-white font-bold py-2 rounded hover:bg-emerald-700 transition"
              >
                حفظ
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
              >
                طباعة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Section */}
      <div
        id="printable-receipt"
        className="hidden print:block p-6 text-black border border-gray-400 bg-white max-w-md mx-auto text-sm"
      >
        <div className="text-center mb-4 border-b pb-3">
          <h1 className="text-xl font-bold text-green-700">وصل دفع الزكاة</h1>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>التاريخ:</span>
            <span className="font-bold">{today}</span>
          </div>
          <div className="flex justify-between">
            <span>نوع الحول:</span>
            <span className="font-bold">{isUnnaire ? "هجري" : "ميلادي"}</span>
          </div>
          <div className="flex justify-between">
            <span>قيمة النصاب:</span>
            <span className="font-bold">{formatNumber(nissab)} د.ج</span>
          </div>
          <div className="flex justify-between">
            <span>الوعاء الزكوي:</span>
            <span className="font-bold">{formatNumber(zakatFormInfos.totalAmount)} د.ج</span>
          </div>
          <div className="bg-green-50 border border-green-300 rounded p-3 mt-3">
            <div className="flex justify-between">
              <span className="font-bold text-green-800">مبلغ الزكاة:</span>
              <span className="font-bold text-green-700">{formatNumber(zakatFormInfos.zakatAmount)} د.ج</span>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-500 text-xs border-t pt-2">
          <p>هذا وصل رسمي لدفع الزكاة - يُرجى الاحتفاظ به</p>
        </div>
      </div>
    </>
  );
};