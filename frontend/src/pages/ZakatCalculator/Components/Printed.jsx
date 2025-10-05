import React, { useContext } from "react";
import { formatNumber } from './CalForm'
import { ZakatContext } from "../../../Components/ZakatProvider";
import {today}  from './ZakatPrice'
export const Printed = () => {
    const { zakatFormInfos, nissab } = useContext(ZakatContext);
   
  return (
     <div id="printable-receipt" className="hidden print:block p-8 text-black border border-gray-300 bg-white">
  <h1 className="text-2xl font-bold text-center mb-6">وصل دفع الزكاة</h1>

  <div className="space-y-3 text-[1em]">
    <div className="flex justify-between">
      <span>التاريخ:</span>
      <span>{today}</span>
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
  )
}
