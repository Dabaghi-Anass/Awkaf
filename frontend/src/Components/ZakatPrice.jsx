import React, { useContext, useState } from "react";
import { ZakatContext } from "./ZakatProvider";
import { Trash } from "../assets/icons/trash";

export const ZakatPrice = () => {
  const { zakatFormInfos, selectedCompany, setShowResult, saveZakatHistory, isUnnaire, nissab } = useContext(ZakatContext);
  const [showDetails, setShowDetails] = useState(false);

  const formatNumber = (num) => (!num ? "0" : num.toLocaleString("fr-FR"));
  const handlePrint = () => window.print();

  const today = new Date().toISOString().split("T")[0];

  const renderTableRows = (fieldsList) => {
  return fieldsList.flatMap((field) => {
    if (field.children && field.children.length > 0) {
      return renderTableRows(field.children);
    }

    const value = zakatFormInfos[field.name];
    return value ? (
      <tr key={field.name}>
        <td className="border border-green-600 p-2">{field.label}</td>
        <td className="border border-green-600 p-2 text-left">{formatNumber(Number(value))}</td>
      </tr>
    ) : [];
  });
};


  return (
    <>
      {/* Visible part (on screen only) */}
      <div className="border-2 border-green-500 rp-6 rounded-lg shadow-md shadow-amber-100 relative mx-auto mt-10 p-4 print:hidden">
        <h2 className="text-2xl font-bold text-green-600 text-center mb-10">
          تفاصيل الحساب
        </h2>

        <div className="space-y-3 text-[0.9em] text-gray-800">
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
            className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
          >
            حفظ
          </button>

          <button
            onClick={handlePrint}
            className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
          >
            طباعة
          </button>
        </div>
      </div>

      {/* Printable section */}
    {/* Printable section (only visible in print) */}
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
    {selectedCompany && (
  <div className="mt-6">
    <h3 className="text-center text-green-600 font-bold mb-3">تفاصيل المعلومات المدخلة</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-green-600 text-right">
        <thead className="bg-green-100">
          <tr>
            <th className="border border-green-600 p-2">البيان</th>
            <th className="border border-green-600 p-2">القيمة (د.ج)</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows(selectedCompany.fields)}
        </tbody>
      </table>
    </div>
  </div>
)}

  <div className="mt-10 text-center">
    <p>توقيع المكلف: _________________________</p>
  </div>
</div>

    </>
  );
};
