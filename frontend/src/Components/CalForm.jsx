import React, { useContext, useEffect, useState } from "react";
import { ZakatPrice } from "./ZakatPrice";
import { MessagePopup } from "./MessagePopup";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ZakatContext } from "./ZakatProvider";
import { zakatForm } from "./tools/table"

export const CalForm = () => {
  const { nissab, setZakatFormInfos, setShowResult, showResult, setPopup, popup } = useContext(ZakatContext);

  const [methodCalcul, setMethodCalcul] = useState("Maliki");
  const [formData, setFormData] = useState(zakatForm);
  const [companyType,setCompanyType] = useState("SARL");
  const updateFieldValue = (fields, targetName, newValue) => {
    return fields.map(field => {
      if (field.name === targetName) {
        return { ...field, value: newValue };
      }
      if (field.children && field.children.length > 0) {
        return { ...field, children: updateFieldValue(field.children, targetName, newValue) };
      }
      return field;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/,/g, "");
    if (!isNaN(rawValue) && rawValue >= 0) {
      setFormData(prev => updateFieldValue(prev, name, rawValue));
    }
  };


  const flattenData = (fields, acc = {}) => {
    fields.forEach(field => {
      if (field.children && field.children.length > 0) {
        flattenData(field.children, acc);
      } else {
        acc[field.name] = Number(field.value) || 0;
      }
    });
    return acc;
  };

  const calcZakat = (method) => {
    const values = flattenData(formData);
    console.log("Values:", values);

    const commonAssets = 
      (values.x1 || 0) + (values.x2 || 0) + (values.x3 || 0) +
      (values.x4 || 0) + (values.x5 || 0) + (values.x6 || 0) +
      (values.a1 || 0) + (values.a4 || 0) + (values.a5 || 0);
      
    let zakatBase = 0;
    let A =0;
    let F=0;
    switch(method) {
      case "Maliki":
     const somme = (values.y1 || 0) + (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) 
                  +(values.y6 || 0)+(values.z1 || 0 )+(values.z2 || 0)+(values.a1 || 0)+(values.a2 || 0)+
                  (values.a3 || 0)+(values.a4 || 0)+(values.a5)+(values.a6 || 0)+(values.a7 || 0)+(values.a8 || 0);

    const D = (values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) + (values.c5 || 0) + (values.c6 || 0);

    companyType ==="SARL" ? A = (values.SPA || 0) : A = (values.SPA || 0)+(values.SARL || 0);

    const C = A - (values.limit || 0);
    
     C > D ? F = D-C :null;

     zakatBase = commonAssets + somme - F;
      break;
      case "AAOIFI":
        zakatBase = commonAssets + (values.y1 || 0) + (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) +
        (values.z2 || 0) + (values.z3 || 0) + (values.z4 || 0) + (values.a1 || 0) + (values.z1 || 0) +
        (values.a2 || 0) + (values.a3 || 0) + (values.a4 || 0) + (values.a5 || 0) + (values.a6 || 0) +
        (values.a7 || 0) + (values.a8 || 0) - ((values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) +
        (values.c5 || 0) + (values.c6 || 0));
        break;
      case "Alioua":
        zakatBase = commonAssets + (values.x7 || 0) + (values.x8 || 0) + (values.x9 || 0) + (values.y1 || 0) +
        (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) + (values.y5 || 0) + (values.y6 || 0) +
        (values.y7 || 0) + (values.z1 || 0) + (values.z2 || 0) + (values.z3 || 0) + (values.z4 || 0) +
        (values.a1 || 0) + (values.a2 || 0) + (values.a3 || 0) + (values.a4 || 0) + (values.a5 || 0) + (values.a6 || 0) +
        (values.a7 || 0) + (values.a8 || 0) - ((values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) +
        (values.c5 || 0) + (values.c6 || 0) + (values.c3 || 0));
        break;
      case "Net":
        zakatBase = commonAssets + (values.a1 || 0) + (values.a4 || 0) + (values.a5 || 0);
        break;
    }

    const zakat = zakatBase > nissab ? zakatBase * 0.025 : 0; 
    const calculationDate = new Date().toISOString().split("T")[0]; 
        
    setZakatFormInfos(prevState => ({
      ...prevState,
      zakatAmount: zakat.toFixed(3),  
      totalAmount: zakatBase.toFixed(3),  
      calculationDate: calculationDate,
    }));

    setShowResult(true);
  };
  console.log(companyType);
  const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Enhanced rendering with better styling
const renderInputs = (fieldList, depth = 0, companyType) =>
  fieldList.map((field, index) => {
    // Handle malikiAssets filtering
    
    if (field.name === "SARL" && companyType == "SARL") {
      return null;
    }

    return (
      <div key={index} className={`mb-6 ${depth > 0 ? "mr-4" : ""}`}>
        {field.children && field.children.length > 0 ? (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <div className="w-1 h-6 bg-emerald-600 ml-3 rounded-full"></div>
              <h3 className="font-bold text-emerald-800 text-lg">
                {field.label}
              </h3>
            </div>
            <div className="space-y-4">
              {renderInputs(field.children, depth + 1, companyType)}
            </div>
          </div>
        ) : (
          <div className="cal-input-bg">
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-gray-700 text-sm flex-1">
                {field.label}
              </label>
              <Tooltip className="max-w-xs whitespace-normal text-sm leading-relaxed">
                <TooltipTrigger asChild>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <img
                      src="./211757_help_icon.svg"
                      alt="help"
                      className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-emerald-600 text-white border-emerald-700 max-w-sm">
                  <p className="text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="relative">
              <input
                className="cal-input"
                type="text"
                name={field.name}
                value={formatNumber(field.value || "")}
                onChange={handleChange}
                placeholder="أدخل المبلغ"
              />
              <span className="DA">د.ج</span>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  });

// 👇 filter formData depending on methodCalcul
const getVisibleFields = () => {
  if (methodCalcul === "Maliki") {
    return formData; // show everything
  } else {
    // hide last 3 fields
    return formData.slice(0, -1);
  }
};



  return (
    <div dir="rtl" className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 mb-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">حاسبة الزكاة الاحترافية</h1>
            <p className="text-emerald-100">احسب زكاة أموالك وفقاً للمعايير الشرعية المعتمدة</p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-3 h-8 bg-emerald-600 ml-4 rounded-full"></div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">بيانات الأصول والممتلكات</h2>
                  <p className="text-gray-600 text-sm">يرجى إدخال جميع الأصول والممتلكات الخاضعة للزكاة</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-8">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-6 bg-blue-600 ml-3 rounded-full"></div>
                    <h3 className="font-bold text-blue-800 text-lg">طريقة الحساب</h3>
                  </div>
                  
                  <div className="relative">
                    <select
                      className="w-full p-4 border border-blue-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white font-semibold text-gray-700 appearance-none cursor-pointer"
                      onChange={(e) => setMethodCalcul(e.target.value)}
                      value={methodCalcul}
                    >
                      <option value="Maliki">معادلة حساب زكاة الشركات مالكي</option>
                      <option value="AAOIFI">معادلة حساب زكاة الشركات AAOIFI</option>
                      <option value="Alioua">معادلة باسم عليوة</option>
                      <option value="Net">معادلة طريقة صافي الغنى</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

              <div className="space-y-6">
                
                {methodCalcul === "Maliki" && (
                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-8">
                    <div className="relative">
                       <div className="flex items-center mb-4">
                    <div className="w-1 h-6 bg-blue-600 ml-3 rounded-full"></div>
                    <h3 className="font-bold text-blue-800 text-lg">نوع الشركة</h3>
                  </div>
                  <div className="relative">
                    <select
                      className="w-full p-4 border border-blue-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white font-semibold text-gray-700 appearance-none cursor-pointer"
                      onChange={(e) => setCompanyType(e.target.value)}
                      value={companyType}
                    >
                      <option value="SARL">SARL</option>
                      <option value="SPA">SPA</option>
                      
                    </select>
                   
                    
                    {/* Custom dropdown arrow */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  </div>
                  </div>
                  
                )}
                {renderInputs(getVisibleFields(),0,companyType)}
                
                {/* Calculation Method Selection */}
                
                {/* Calculate Button */}
                <div className="text-center mt-10 pt-6 border-t border-gray-200">
                  <button 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-4 px-12 rounded-full text-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={() => calcZakat(methodCalcul)}
                  >
                    <span className="flex items-center">
                      <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      احسب الزكاة
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Information Card */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-full ml-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-1">معلومة مهمة</h3>
                <p className="text-amber-700 text-sm">
                  يُرجى التأكد من دقة البيانات المدخلة قبل الحساب. الزكاة واجبة على كل مسلم بالغ عاقل يملك النصاب.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showResult && <ZakatPrice />}
      
      {/* Message Popup */}
      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </div>
  );
};