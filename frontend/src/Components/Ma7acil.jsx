import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { WarninIcon } from '@/assets/Svg/WarninIcon';
import { MessagePopup } from './MessagePopup';
import { useApi } from "@/ApiProvider";

export const Ma7acil = () => {
  const api = useApi();
  const [crops, setCrops] = useState([]);
  const [collapsedCrops, setCollapsedCrops] = useState({});
  const [popup, setPopup] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const RATES = {
    rain: 0.10,
    mixed: 0.075,
    artificial: 0.05,
  };

  const NISAB = 653; // 653 kg

  const saveZakatHistory = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setPopup({ message: "يجب تسجيل الدخول أولاً للحفظ", type: "error" });
      return;
    }

    const cropsWithZakat = crops.filter((crop) => crop.zakatDue > 0);

    if (cropsWithZakat.length === 0) {
      setPopup({ message: "لا توجد محاصيل مستحقة للزكاة للحفظ", type: "error" });
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    let failCount = 0;

    for (const crop of cropsWithZakat) {
      const zakatData = {
        zakat_amount: crop.zakatDue,
        total_amount: parseFloat(crop.quantity) || 0,
        corp_type: crop.cropType || "غير محدد",
      };

      const [data, status, error] = await api.post("/create-ma7acil/", zakatData);

      if (!error && status >= 200 && status < 300) {
        successCount++;
        setPopup({ message: "تم حفظ المحاصيل بنجاح!", type: "success" });
        setCrops([]);
        setCollapsedCrops({});
      } else {
        failCount++;
        console.error("Save failed:", error || data);
        setPopup({ message: "فشل حفظ المحاصيل، حاول مرة أخرى", type: "error" });
      }
    }

    setIsLoading(false);

    setTimeout(() => {
      setPopup({ message: "", type: "" });
    }, 3000);
  };

  const toggleCrop = (index) => {
    setCollapsedCrops(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const addCrop = () => {
    setCrops(prev => [
      ...prev,
      {
        cropType: '',
        wateringMethod: 'rain',
        quantity: '',
        ownershipType: 'individual',
        ownershipShare: '',
        zakatDue: 0,
      },
    ]);
  };

  const updateCrop = (index, field, value) => {
    const updated = [...crops];
    updated[index][field] = value;
    setCrops(updated);
  };

  const removeCrop = (index) => {
    const updated = crops.filter((_, i) => i !== index);
    setCrops(updated);
    const newCollapsed = { ...collapsedCrops };
    delete newCollapsed[index];
    setCollapsedCrops(newCollapsed);
  };

  const calculateZakat = () => {
    const updated = crops.map(crop => {
      const qty = parseFloat(crop.quantity) || 0;
      const share = parseFloat(crop.ownershipShare) || 0;
      const rate = RATES[crop.wateringMethod] || 0;

      let applicableQty = qty;

      if (crop.ownershipType === 'shared') {
        const shareQty = (qty * share) / 100;
        if (shareQty < NISAB) return { ...crop, zakatDue: 0 };
        applicableQty = shareQty;
      } else {
        if (qty < NISAB) return { ...crop, zakatDue: 0 };
      }

      const zakatDue = applicableQty * rate;
      return { ...crop, zakatDue };
    });

    setCrops(updated);
  };

  const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getTotalZakat = () => {
    return crops.reduce((total, crop) => total + (crop.zakatDue || 0), 0);
  };

  const getWateringMethodLabel = (method) => {
    const labels = {
      rain: 'سقي بالمطر (10%)',
      mixed: 'سقي مختلط (7.5%)',
      artificial: 'سقي اصطناعي (5%)'
    };
    return labels[method] || method;
  };

  return (
    <>
      <div dir="rtl" className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-12 md:py-16 mt-12 md:mt-15 mb-2">
          <div className="container text-center mx-auto px-4 md:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">زكاة المحاصيل الزراعية</h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto">احسب زكاة محاصيلك الزراعية وفقاً للمعايير الشرعية المعتمدة</p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="px-3 sm:px-4 md:px-6 mx-auto pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg md:shadow-xl border border-gray-200 overflow-hidden">
              
              {/* Form Header */}
              <div className="form-header bg-gradient-to-r from-gray-50 to-emerald-50 border-b border-gray-200 p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-3 h-6 md:h-8 bg-emerald-600 rounded-full flex-shrink-0"></div>
                  <div className="min-w-0">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">بيانات المحاصيل الزراعية</h2>
                    <p className="text-gray-600 text-xs md:text-sm break-words">النصاب: {NISAB.toLocaleString()} كغ • أضف محاصيلك واحسب زكاتها</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-4 md:p-8 form-container">
                <div className="space-y-4 md:space-y-6">
                  {crops.map((crop, index) => (
                    <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
                      {/* Crop Header */}
                      <div 
                        className="flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-emerald-100/50 transition-colors duration-200 gap-2"
                        onClick={() => toggleCrop(index)}
                      >
                        <div className="flex items-center min-w-0 gap-2 md:gap-3">
                          <div className="w-1 h-5 md:h-6 bg-emerald-600 rounded-full flex-shrink-0"></div>
                          <h3 className="text-sm md:text-lg font-bold text-emerald-800 select-none truncate">
                            {crop.cropType || `المحصول ${index + 1}`}
                          </h3>
                          {crop.zakatDue > 0 && (
                            <span className="px-2 md:px-3 py-1 bg-emerald-600 text-white text-xs md:text-sm rounded-full whitespace-nowrap">
                              {crop.zakatDue.toFixed(2)} كغ
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCrop(index);
                            }}
                            className="p-1.5 md:p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          >
                            <Trash className="w-4 h-4 md:w-5 md:h-5" stroke='#036116'></Trash>
                          </button>
                          <span className="text-xs md:text-sm text-emerald-600 font-medium hidden sm:inline">
                            {collapsedCrops[index] ? "إظهار" : "إخفاء"}
                          </span>
                          <div className={`transform transition-transform duration-300 ${collapsedCrops[index] ? "rotate-180" : ""}`}>
                            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                          </div>
                        </div>
                      </div>

                      {/* Crop Content */}
                      <div 
                        className={`p-0 m-0 transition-all duration-300 ease-in-out overflow-hidden ${
                          collapsedCrops[index] 
                            ? "max-h-0 opacity-0" 
                            : "max-h-[3000px] opacity-100"
                        }`}
                      >
                        <div className="p-3 md:p-4 space-y-3 md:space-y-4">
                          {/* Crop Type */}
                          <div className="cal-input-bg">
                            <label className="font-semibold text-gray-700 text-xs md:text-sm block mb-2">
                              نوع المحصول
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className="cal-input pr-4 md:pr-5 text-sm md:text-base"
                                value={crop.cropType}
                                onChange={e => updateCrop(index, 'cropType', e.target.value)}
                                placeholder="أدخل نوع المحصول (قمح، شعير، تمر...)"
                              />
                              <div className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>

                          {/* Watering Method */}
                          <div className="cal-input-bg">
                            <label className="font-semibold text-gray-700 text-xs md:text-sm block mb-2">
                              طريقة السقي
                            </label>
                            <div className="relative">
                              <select
                                className="select-form text-sm md:text-base"
                                value={crop.wateringMethod}
                                onChange={e => updateCrop(index, 'wateringMethod', e.target.value)}
                              >
                                <option value="rain">سقي بالمطر (10%)</option>
                                <option value="mixed">سقي مختلط (7.5%)</option>
                                <option value="artificial">سقي اصطناعي (5%)</option>
                              </select>
                              <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                              </div>
                            </div>
                          </div>

                          {/* Quantity */}
                          <div className="cal-input-bg">
                            <label className="font-semibold text-gray-700 text-xs md:text-sm block mb-2">
                              الكمية (كيلوغرام)
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className="cal-input pr-10 md:pr-12 text-sm md:text-base"
                                value={formatNumber(crop.quantity)}
                                onChange={e => {
                                  const rawValue = e.target.value.replace(/,/g, "");
                                  if (!isNaN(rawValue) && rawValue >= 0) {
                                    updateCrop(index, 'quantity', rawValue);
                                  }
                                }}
                                placeholder="أدخل الكمية"
                              />
                              <span className="DA absolute right-2 md:right-3 top-1/2 text-xs md:text-sm">كغ</span>
                              <div className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>

                          {/* Ownership Type */}
                          <div className="cal-input-bg">
                            <label className="font-semibold text-gray-700 text-xs md:text-sm block mb-2">
                              نوع الملكية
                            </label>
                            <div className="relative">
                              <select
                                className="select-form text-sm md:text-base"
                                value={crop.ownershipType}
                                onChange={e => updateCrop(index, 'ownershipType', e.target.value)}
                              >
                                <option value="individual">ملكية فردية</option>
                                <option value="shared">ملكية مشتركة</option>
                              </select>
                              <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                              </div>
                            </div>
                          </div>

                          {/* Ownership Share (if shared) */}
                          {crop.ownershipType === 'shared' && (
                            <div className="cal-input-bg">
                              <label className="font-semibold text-gray-700 text-xs md:text-sm block mb-2">
                                نصيبك من الملكية (%)
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  className="cal-input text-sm md:text-base"
                                  value={crop.ownershipShare}
                                  onChange={e => updateCrop(index, 'ownershipShare', e.target.value)}
                                  placeholder="أدخل النسبة المئوية"
                                  min="0"
                                  max="100"
                                />
                                <span className="DA absolute right-2 md:right-3 top-1/2 text-xs md:text-sm">%</span>
                                <div className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Zakat Result */}
                          {crop.zakatDue >= 0 && (
                            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-3 md:p-4">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span className="font-bold text-green-800 text-sm md:text-base">الزكاة المستحقة:</span>
                                <span className="text-xl md:text-2xl font-bold text-green-700">
                                  {crop.zakatDue.toFixed(2)} كغ
                                </span>
                              </div>
                              <div className="text-xs md:text-sm text-green-600 mt-2 break-words">
                                المعدل المطبق: {getWateringMethodLabel(crop.wateringMethod)} • 
                                {crop.ownershipType === 'shared' && ` نصيبك: ${crop.ownershipShare}%`}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Crop Button */}
                  <div className="text-center">
                    <button
                      onClick={addCrop}
                      className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base"
                    >
                      إضافة محصول جديد
                    </button>
                  </div>

                  {/* Calculate and Save Buttons */}
                  {crops.length > 0 && (
                    <div className="text-center mt-6 md:mt-10 pt-4 md:pt-6 border-t border-gray-200 space-y-3">
                      <button 
                        className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base"
                        onClick={calculateZakat}
                      >
                        احسب الزكاة
                      </button>
                      
                      {getTotalZakat() > 0 && (
                        <button 
                          className="custom-button py-3 md:py-4 rounded-sm w-full sm:w-1/2 font-bold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={saveZakatHistory}
                          disabled={isLoading}
                        >
                          {isLoading ? "جاري الحفظ..." : "حفظ النتائج"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="mt-6 md:mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 md:p-6">
              <div className="flex gap-3 md:gap-4">
                <div className="bg-amber-100 p-2 md:p-3 rounded-full flex-shrink-0">
                  <span className="text-xl md:text-2xl"><WarninIcon></WarninIcon></span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-amber-800 mb-1 text-sm md:text-base">معلومات مهمة</h3>
                  <p className="text-amber-700 text-xs md:text-sm break-words">
                    النصاب للمحاصيل الزراعية: {NISAB.toLocaleString()} كيلوغرام • السقي بالمطر أو الأنهار: 10% من المحصول • السقي المختلط: 7.5% من المحصول • السقي الاصطناعي (بالآلات): 5% من المحصول
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MessagePopup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ message: "", type: "" })}
        />
      </div>
    </>
  );
};