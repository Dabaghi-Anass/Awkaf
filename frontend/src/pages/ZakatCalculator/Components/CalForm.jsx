import React, { useContext, useEffect, useState } from "react";
import { ZakatPrice } from "./ZakatPrice";
import { MessagePopup } from "../../../Components/MessagePopup";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ZakatContext } from "../../../Components/ZakatProvider";
import { zakatForm } from "../../../Components/tools/table"
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";
import { WarninIcon } from "@/assets/Svg/WarninIcon";

import { GoldPrice } from "./GoldPrice";
import { useZakatForm } from "./useZakatForm";
import { useTranslation } from "react-i18next";


 export const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  


export const CalForm = () => {
   const { t, i18n } = useTranslation();
  const { nissab, setZakatFormInfos, setShowResult, showResult, setPopup, popup } =
    useContext(ZakatContext);

// ✅ Always call hook at top level
const zakatForm = useZakatForm();

// ✅ Keep formData in sync when language changes
const [formData, setFormData] = useState(zakatForm);

useEffect(() => {
  setFormData(zakatForm);   // use the new translated form directly
}, [zakatForm]);

  

  const [methodCalcul, setMethodCalcul] = useState("Maliki");
  const [companyType, setCompanyType] = useState("SARL");
  const [collapsedSections, setCollapsedSections] = useState({});
  
  // Store additional input fields for each field name
  const [additionalFields, setAdditionalFields] = useState({});
  

  const toggleSection = (sectionName) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Add a new input field for a specific field name
  const addField = (fieldName) => {
    setAdditionalFields(prev => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), { id: Date.now(), value: "" }]
    }));
  };

  // Remove an additional input field
  const removeField = (fieldName, fieldId) => {
    setAdditionalFields(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter(field => field.id !== fieldId)
    }));
  };

  // Handle change for additional fields
  const handleAdditionalFieldChange = (fieldName, fieldId, value) => {
    const rawValue = value.replace(/,/g, "");
    if (!isNaN(rawValue) && rawValue >= 0) {
      setAdditionalFields(prev => ({
        ...prev,
        [fieldName]: prev[fieldName].map(field => 
          field.id === fieldId ? { ...field, value: rawValue } : field
        )
      }));
    }
  };

  // Calculate total value for a field including additional fields
  const calculateTotalForField = (fieldName, mainValue) => {
    const mainVal = Number(mainValue) || 0;
    const additionalVals = (additionalFields[fieldName] || []).reduce((sum, field) => 
      sum + (Number(field.value) || 0), 0
    );
    return mainVal + additionalVals;
  };

  // Calculate nissab based on user input gold price
  
 

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
        // Calculate total including additional fields
        acc[field.name] = calculateTotalForField(field.name, field.value);
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
    let A = 0;
    let F = 0;
    
    switch(method) {
      case "Maliki":
        const somme = (values.y1 || 0) + (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) 
                      +(values.y6 || 0)+(values.z1 || 0 )+(values.z2 || 0)+(values.a2 || 0)+
                      (values.a3 || 0)+(values.a6 || 0)+(values.a7 || 0)+(values.a8 || 0);

        const D = (values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) + (values.c5 || 0) + (values.c6 || 0);

        companyType === "SARL" ? A = (values.SPA || 0) : A = (values.SPA || 0)+(values.SARL || 0);

        const C = A - (values.limit || 0);
        
        C <= D ? F = D-C : null;

        zakatBase = commonAssets + somme - F;
        break;
      case "AAOIFI":
        zakatBase = commonAssets + (values.y1 || 0) + (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) +
        (values.z2 || 0) + (values.z3 || 0) + (values.z4 || 0)  + (values.z1 || 0) +
        (values.a2 || 0) + (values.a3 || 0)  + (values.a6 || 0) +
        (values.a7 || 0) + (values.a8 || 0) - ((values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) +
        (values.c5 || 0) + (values.c6 || 0));
        break;
      case "Alioua":
        zakatBase = commonAssets + (values.x7 || 0) + (values.x8 || 0) + (values.x9 || 0) + (values.y1 || 0) +
        (values.y2 || 0) + (values.y3 || 0) + (values.y4 || 0) + (values.y5 || 0) + (values.y6 || 0) +
        (values.y7 || 0) + (values.z1 || 0) + (values.z2 || 0) + (values.z3 || 0) + (values.z4 || 0) +
        (values.a2 || 0) + (values.a3 || 0) + (values.a6 || 0) +
        (values.a7 || 0) + (values.a8 || 0) - ((values.c1 || 0) + (values.c2 || 0) + (values.c4 || 0) +
        (values.c5 || 0) + (values.c6 || 0) + (values.c3 || 0));
        break;
      case "Net":
        zakatBase = commonAssets;
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

 
  // Enhanced rendering with better styling + collapsible functionality + dynamic fields
  const renderInputs = (fieldList, depth = 0, companyType) =>
    fieldList.map((field, index) => {
      if (field.name === "SARL" && companyType == "SARL") {
        return null;
      }

      return (
        <div key={index} className="my-2">
          {field.children && field.children.length > 0 ? (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden ">
              {/* Collapsible Header */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-emerald-100/50 transition-colors duration-200"
                onClick={() => toggleSection(field.name)}
              >
                <div className="flex items-center">
                  <div className="w-1 h-6 bg-emerald-600 ml-3 rounded-full"></div>
                  <h3 className="max-[515px]:text-sm font-bold text-emerald-800 text-lg select-none">
                    {field.label}
                  </h3>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-emerald-600 font-medium">
                    {collapsedSections[field.name] ? "إظهار" : "إخفاء"}
                  </span>
                  <div className={`transform transition-transform duration-300 ${collapsedSections[field.name] ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              <div 
                className={` p-0 m-0 transition-all duration-300 ease-in-out overflow-hidden ${
                  collapsedSections[field.name] 
                    ? "max-h-0 opacity-0" 
                    : "max-h-[2000px] opacity-100"
                }`}
              >
                <div className="p-2   ">
                  {renderInputs(field.children, depth + 1, companyType)}
                </div>
              </div>
            </div>
          ) : (
            <div className="cal-input-bg  ">
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-700 text-sm flex-1 max-[515px]:text-xs">
                  {field.label}
                  {/* Show total if there are additional fields */}
                  {additionalFields[field.name] && additionalFields[field.name].length > 0 && (
                    <span className="text-xs text-emerald-600 font-normal mr-2">
                      (المجموع: {formatNumber(calculateTotalForField(field.name, field.value))} د.ج)
                    </span>
                  )}
                </label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  {/* Add Field Button */}
                  <button
                    type="button"
                    onClick={() => addField(field.name)}
                    className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-full transition-colors duration-200 group"
                    title="إضافة حقل آخر"
                  >
                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform max-[515px]:w-3 max-[515px]:h-3" />
                  </button>
                  
                  <Tooltip className="max-w-xs whitespace-normal text-sm leading-relaxed">
                    <TooltipTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <img
                          src="./211757_help_icon.svg"
                          alt="help"
                          className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity"
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
              </div>

              {/* Main Input Field */}
              <div className="relative mb-3 ">
                <input
                  className="cal-input  "
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

              {/* Additional Input Fields */}
              {additionalFields[field.name] && additionalFields[field.name].map((additionalField, idx) => (
                <div key={additionalField.id} className="relative mb-3 mr-4">
                  <div className="flex items-center">
                    <div className="flex-1 relative">
                      <input
                        className="cal-input pr-12"
                        type="text"
                        value={formatNumber(additionalField.value || "")}
                        onChange={(e) => handleAdditionalFieldChange(field.name, additionalField.id, e.target.value)}
                        placeholder="أدخل المبلغ الإضافي"
                      />
                      <span className="DA">د.ج</span>
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeField(field.name, additionalField.id)}
                      className="mr-2 p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors duration-200 group"
                      title="حذف هذا الحقل"
                    >
                      <Minus className="w-4 h-4 group-hover:scale-110 transition-transform max-[515px]:w-3 max-[515px]:h-3"  />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    حقل إضافي {idx + 1}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });

  // Filter formData depending on methodCalcul
  const getVisibleFields = () => {
    if (methodCalcul === "Maliki") {
      return formData;
    } else {
      return formData.slice(0, -1);
    }
  };

   const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div dir="ltr" className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Header Section */}
      <div className="header-sec ">
        <div className="container text-center  mx-auto px-6">
          
            <h1 className="text-3xl  font-bold mb-2 max-[515px]:text-[1.5rem]">حاسبة الزكاة الاحترافية</h1>
            <p className="text-white max-[515px]:text-[0.7em]">احسب زكاة أموالك وفقاً للمعايير الشرعية المعتمدة</p>
          
        </div>
      </div>

      {/* Gold Price Input & Nissab Info Card */}
      <GoldPrice></GoldPrice>

    
      {/* Language Selector */}
      <div className="mb-6 flex justify-end">
        <select
          onChange={handleLangChange}
          value={i18n.language}
          className="border rounded p-2"
        >
          <option value="ar">🇦🇪 العربية</option>
          <option value="en">🇬🇧 English</option>
          <option value="fr">🇫🇷 Français</option>
        </select>
      </div>
      {/* Main Form Container */}
      <div className="max-[515px]:px-0  mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            
            {/* Form Header */}
            <div className="form-header bg-gradient-to-r from-gray-50 to-emerald-50 border-b max-[515px]:p-4 border-gray-200 p-6">
              <div className="flex items-center">
                <div className="w-3 h-8 bg-emerald-600 ml-4 rounded-full"></div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">بيانات الأصول والممتلكات</h2>
                  <p className="text-gray-600 text-sm">يرجى إدخال جميع الأصول والممتلكات الخاضعة للزكاة</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 form-container ">
              <div className="form-cont2 mb-3">
                <div className="flex items-center mb-4 ">
                  <div className="w-1 h-6 bg-blue-600 ml-3 rounded-full"></div>
                  <h3 className="font-bold text-blue-800 text-lg">طريقة الحساب</h3>
                </div>
                
                <div className="relative">
                  <select
                    className="select-form"
                    onChange={(e) => setMethodCalcul(e.target.value)}
                    value={methodCalcul}
                  >
                    <option value="Maliki">معادلة حساب زكاة الشركات مالكي</option>
                    <option value="AAOIFI">معادلة حساب زكاة الشركات AAOIFI</option>
                    <option value="Alioua">معادلة باسم عليوة</option>
                    <option value="Net">معادلة طريقة صافي الغنى</option>
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {methodCalcul === "Maliki" && (
                  <div className="form-cont2">
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="w-1 h-6 bg-blue-600 ml-3 rounded-full"></div>
                        <h3 className="font-bold text-blue-800 text-lg">نوع الشركة</h3>
                      </div>
                      <div className="relative">
                        <select
                          className="select-form"
                          onChange={(e) => setCompanyType(e.target.value)}
                          value={companyType}
                        >
                          <option value="SARL">SARL</option>
                          <option value="SPA">SPA</option>
                        </select>
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <ChevronDown className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {renderInputs(getVisibleFields(), 0, companyType)}
                
                {/* Calculate Button */}
                <div className="text-center mt-10 pt-6 border-t border-gray-200">
                  <button 
                    className="buttonAi w-1/2 "
                    onClick={() => calcZakat(methodCalcul)}
                  >
                    
                      احسب الزكاة
                    
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Information Card */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 max-[460px]:p-4">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-full ml-4">
                <span className="text-2xl"><WarninIcon></WarninIcon></span>
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-1">معلومة مهمة</h3>
                <p className="text-amber-700 text-sm max-[460px]:text-xs">
                  يُرجى التأكد من دقة البيانات المدخلة قبل الحساب. النصاب محسوب على أساس سعر الذهب المُدخل من قبلكم (85 غرام من الذهب عيار 24 قيراط). يُنصح بالاطلاع على الأسعار الحالية في السوق الجزائرية قبل الإدخال.
                  <br />
                  <span className="font-semibold text-amber-900">ملاحظة:</span> يمكنكم إضافة حقول إضافية لأي عنصر بالنقر على زر الإضافة (+) بجانب كل حقل.
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