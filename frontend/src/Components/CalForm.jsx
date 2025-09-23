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
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";
import { WarninIcon } from "@/assets/Svg/WarninIcon";
import {Money} from "@/assets/icons/Money"

export const CalForm = () => {
  const { nissab, setNissab, setZakatFormInfos, setShowResult, showResult, setPopup, popup } = useContext(ZakatContext);

  const [methodCalcul, setMethodCalcul] = useState("Maliki");
  const [formData, setFormData] = useState(zakatForm);
  const [companyType, setCompanyType] = useState("SARL");
  const [collapsedSections, setCollapsedSections] = useState({});
  
  // Store additional input fields for each field name
  const [additionalFields, setAdditionalFields] = useState({});
  
  // Gold price user input
  const [goldPricePerGram, setGoldPricePerGram] = useState("");

  // Nissab calculation constants
  const NISSAB_GOLD_GRAMS = 85; // 85 grams of gold according to Islamic law

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
  const calculateNissab = () => {
    const goldPrice = parseFloat(goldPricePerGram.replace(/,/g, ""));
    if (goldPrice > 0) {
      const calculatedNissab = goldPrice * NISSAB_GOLD_GRAMS;
      setNissab(calculatedNissab);
      return calculatedNissab;
    }
    return 0;
  };

  // Update nissab when gold price changes
  useEffect(() => {
    calculateNissab();
  }, [goldPricePerGram]);

  const handleGoldPriceChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) && value >= 0) {
      setGoldPricePerGram(value);
    }
  };

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

  const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Enhanced rendering with better styling + collapsible functionality + dynamic fields
  const renderInputs = (fieldList, depth = 0, companyType) =>
    fieldList.map((field, index) => {
      if (field.name === "SARL" && companyType == "SARL") {
        return null;
      }

      return (
        <div key={index} className={`mb-6 ${depth > 0 ? "mr-4" : ""}`}>
          {field.children && field.children.length > 0 ? (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
              {/* Collapsible Header */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-emerald-100/50 transition-colors duration-200"
                onClick={() => toggleSection(field.name)}
              >
                <div className="flex items-center">
                  <div className="w-1 h-6 bg-emerald-600 ml-3 rounded-full"></div>
                  <h3 className="font-bold text-emerald-800 text-lg select-none">
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
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  collapsedSections[field.name] 
                    ? "max-h-0 opacity-0" 
                    : "max-h-[2000px] opacity-100"
                }`}
              >
                <div className="px-4 pb-4 space-y-4">
                  {renderInputs(field.children, depth + 1, companyType)}
                </div>
              </div>
            </div>
          ) : (
            <div className="cal-input-bg">
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-700 text-sm flex-1">
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
                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                  
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
              </div>

              {/* Main Input Field */}
              <div className="relative mb-3">
                <input
                  className="cal-input text-[0.9em]"
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
                      <Minus className="w-4 h-4 group-hover:scale-110 transition-transform" />
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

      {/* Gold Price Input & Nissab Info Card */}
      <div className="container mx-auto px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full ml-4">
                  <span className="text-2xl" ><Money></Money></span>
                </div>
                <div>
                  <h3 className="font-bold text-yellow-800 mb-4">تحديد سعر الذهب لحساب النصاب</h3>
                  
                  {/* Gold Price Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-yellow-800 mb-2">
                      سعر الغرام الواحد من الذهب (24 قيراط) بالدينار الجزائري:
                    </label>
                    <div className="relative max-w-xs">
                      <input
                        type="text"
                        value={formatNumber(goldPricePerGram)}
                        onChange={handleGoldPriceChange}
                        className="w-full px-4 py-3 bg-white border border-yellow-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 pr-12"
                        placeholder="أدخل سعر الغرام"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600 text-sm font-medium">
                        د.ج
                      </span>
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-500">
                        <img src="/gold.svg" alt="" />
                      </span>
                    </div>
                  </div>

                  {/* Nissab Display */}
                  {goldPricePerGram && parseFloat(goldPricePerGram.replace(/,/g, "")) > 0 && (
                    <div className="bg-yellow-100/50 border border-yellow-300 rounded-lg p-4">
                      <div className="space-y-2">
                        <p className="text-yellow-800 text-sm">
                          <span className="font-semibold">سعر الغرام:</span> {formatCurrency(parseFloat(goldPricePerGram.replace(/,/g, "")))}
                        </p>
                        <p className="text-yellow-800 text-sm">
                          <span className="font-semibold">النصاب (85 غرام):</span> {formatCurrency(nissab)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Information about gold price */}
            <div className="mt-4 pt-4 border-t border-yellow-200">
              <p className="text-yellow-700 text-xs flex items-center">
                <span className="ml-2">
                  <WarninIcon></WarninIcon>
                </span>
                يُرجى إدخال سعر الغرام الحالي للذهب عيار 24 قيراط في السوق الجزائرية لحساب النصاب بدقة
              </p>
            </div>
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
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border my-3  border-blue-200 rounded-lg p-6 mt-8">
                <div className="flex items-center mb-4 ">
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
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-blue-600" />
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
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-full ml-4">
                <span className="text-2xl"><WarninIcon></WarninIcon></span>
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-1">معلومة مهمة</h3>
                <p className="text-amber-700 text-sm">
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