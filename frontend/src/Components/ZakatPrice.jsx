import React, { useContext, useState } from "react";
import { ZakatContext } from "./ZakatProvider";
import { Trash } from "../assets/icons/trash";
import { Link } from "react-router-dom";

export const ZakatPrice = () => {
  const { zakatFormInfos, setShowResult, saveZakatHistory, isUnnaire, nissab } = useContext(ZakatContext);

  const zakatTax = zakatFormInfos.zakatAmount * 1.26;


  const formatNumber = (num) => (!num ? "0" : num.toLocaleString("fr-FR"));
  const handlePrint = () => window.print();

  const today = new Date().toISOString().split("T")[0];

 


  return (
    <>
      {/* Visible part (on screen only) */}
      <div className="fixed  inset-0 flex items-center justify-center  bg-opacity-50 z-50">
        <div className="bg-white  border-green-600  rounded-lg p-6 shadow-lg  w-1/4 text-center border relative">
        <h2 className="text-1xl font-bold text-green-600 text-center mb-10">
          تفاصيل الحساب
        </h2>

        <div className="space-y-3 text-[0.8em] text-gray-800">
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
          <div className="flex justify-between text-red-800 font-bold">
            <span>  قيمة الزكاة بالضريبة:</span>
            <span>{formatNumber(zakatTax)} د.ج</span>
          </div>

          <div className="flex justify-between">
            <span>التاريخ:</span>
            <span>{today}</span>
          </div>

          <div className="flex justify-between">
            <span>نوع الحول:</span>
            <span>{isUnnaire ? "هجري" : "ميلادي"}</span>
          </div>
        </div>

         

        {/* Buttons */}
        <button
          className="absolute top-0 right-0 p-2 text-white rounded-bl-lg rounded-tr-lg"
          onClick={() => setShowResult(false)}
        >
          <Trash width={35} />
        </button>

        <div className="flex justify-between mt-6">
          <button
            onClick={saveZakatHistory}
            className="bg-green-600  text-white text-[0.8em] px-2 py-1 rounded-[8px]"
          >
            حفظ
          </button>

          <button
            onClick={handlePrint}
            className="bg-green-600  text-white text-[0.8em] px-2 py-1 rounded-[8px]"
          >
            طباعة
          </button>
        </div>
         <div className="text-right  text-[12px] mt-2">إن أردت إخراج الزكاة دون ضريبة <Link to="/contact" className="text-green-600">إتصل بنا</Link></div>
      </div>
      </div>

    
<div id="printable-receipt" className="hidden print:block p-8 text-black border border-gray-300 bg-white">
  <h1 className="text-2xl font-bold text-center mb-6">وصل دفع الزكاة</h1>

  <div className="space-y-3 text-[1em]">
    <div className="flex justify-between">
      <span>التاريخ:</span>
      <span>{today}</span>
    </div>
    <div className="flex justify-between">
      <span>نوع الحول:</span>
      <span>{isUnnaire ? "هجري" : "ميلادي"}</span>
    </div>
    <div className="flex justify-between">
      <span>قيمة النصاب:</span>
      <span>{formatNumber(nissab)} د.ج</span>
    </div>
    <div className="flex justify-between">
      <span>الوعاء الزكوي:</span>
      <span>{formatNumber(zakatFormInfos.totalAmount)} د.ج</span>
    </div>
    <div className="flex justify-between font-bold text-green-700">
      <span>مبلغ الزكاة المستحق:</span>
      <span>{formatNumber(zakatFormInfos.zakatAmount)} د.ج</span>
    </div>
  </div>
   
  <div className="mt-10 text-center">
    <p>توقيع المكلف: _________________________</p>
  </div>
</div>

    </>
  );
};
