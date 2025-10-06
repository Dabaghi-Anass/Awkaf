import { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

export const Ma7acil = () => {
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
      alert("Authentication required! Please log in.");
      return;
    }

    // Filter crops that have zakat due
    const cropsWithZakat = crops.filter(crop => crop.zakatDue > 0);
    
    if (cropsWithZakat.length === 0) {
      setPopup({ message: "لا توجد محاصيل مستحقة للزكاة للحفظ", type: "error" });
      return;
    }

    setIsLoading(true);
    let successCount = 0;
    let failCount = 0;

    // Save each crop individually
    for (const crop of cropsWithZakat) {
      const zakatData = {
        zakat_amount: crop.zakatDue,
        total_amount: parseFloat(crop.quantity) || 0,
        corp_type: crop.cropType || 'غير محدد',
      };

      try {
        const response = await fetch("http://localhost:8000/apif/create-ma7acil/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(zakatData),
        });

        const data = await response.json();
        
        if (!response.ok) {
          console.error("Backend error:", data);
          failCount++;
        } else {
          successCount++;
        }
      } catch (error) {
        console.error("Error saving crop:", error);
        failCount++;
      }
    }

    setIsLoading(false);

    // Show result message
    if (successCount > 0 && failCount === 0) {
      setPopup({ 
        message: `تم حفظ ${successCount} محصول بنجاح!`, 
        type: "success" 
      });
      // Reset crops after successful save
      setCrops([]);
      setCollapsedCrops({});
    } else if (successCount > 0 && failCount > 0) {
      setPopup({ 
        message: `تم حفظ ${successCount} محصول، فشل ${failCount} محصول`, 
        type: "warning" 
      });
    } else {
      setPopup({ 
        message: "فشل حفظ المحاصيل، حاول مرة أخرى", 
        type: "error" 
      });
    }

    // Auto-hide popup after 3 seconds
    setTimeout(() => {
      setPopup({ message: '', type: '' });
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

  const getOwnershipTypeLabel = (type) => {
    const labels = {
      individual: 'ملكية فردية',
      shared: 'ملكية مشتركة'
    };
    return labels[type] || type;
  };

  return (
    <div dir="rtl" className="w-full mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Popup Notification */}
      {popup.message && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
          popup.type === 'success' ? 'bg-green-500' : 
          popup.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        } text-white font-bold`}>
          {popup.message}
        </div>
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 mb-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">زكاة المحاصيل الزراعية</h1>
            <p className="text-emerald-100">احسب زكاة محاصيلك الزراعية وفقاً للمعايير الشرعية المعتمدة</p>
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
                  <h2 className="text-xl font-bold text-gray-800 mb-1">بيانات المحاصيل الزراعية</h2>
                  <p className="text-gray-600 text-sm">النصاب: {NISAB.toLocaleString()} كغ • أضف محاصيلك واحسب زكاتها</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Crops List */}
              <div className="space-y-6">
                {crops.map((crop, index) => (
                  <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
                    {/* Crop Header */}
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-emerald-100/50 transition-colors duration-200"
                      onClick={() => toggleCrop(index)}
                    >
                      <div className="flex items-center">
                        <div className="w-1 h-6 bg-emerald-600 ml-3 rounded-full"></div>
                        <h3 className="font-bold text-emerald-800 text-lg select-none">
                          {crop.cropType || `المحصول ${index + 1}`}
                        </h3>
                        {crop.zakatDue > 0 && (
                          <span className="mr-4 px-3 py-1 bg-emerald-600 text-white text-sm rounded-full">
                            الزكاة: {crop.zakatDue.toFixed(2)} كغ
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCrop(index);
                          }}
                          className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                        >
                          🗑️
                        </button>
                        <span className="text-sm text-emerald-600 font-medium">
                          {collapsedCrops[index] ? "إظهار" : "إخفاء"}
                        </span>
                        <div className={`transform transition-transform duration-300 ${collapsedCrops[index] ? "rotate-180" : ""}`}>
                          <ChevronDown className="w-5 h-5 text-emerald-600" />
                        </div>
                      </div>
                    </div>

                    {/* Crop Content */}
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        collapsedCrops[index] 
                          ? "max-h-0 opacity-0" 
                          : "max-h-[1000px] opacity-100"
                      }`}
                    >
                      <div className="px-4 pb-4 space-y-4">
                        {/* Crop Type */}
                        <div className="bg-white/70 rounded-lg p-4">
                          <label className="block font-semibold text-gray-700 text-sm mb-3">
                            نوع المحصول
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              className="w-full p-4 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white pr-12"
                              value={crop.cropType}
                              onChange={e => updateCrop(index, 'cropType', e.target.value)}
                              placeholder="أدخل نوع المحصول (قمح، شعير، تمر...)"
                            />
                          </div>
                        </div>

                        {/* Watering Method */}
                        <div className="bg-white/70 rounded-lg p-4">
                          <label className="block font-semibold text-gray-700 text-sm mb-3">
                            طريقة السقي
                          </label>
                          <div className="relative">
                            <select
                              className="w-full p-4 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                              value={crop.wateringMethod}
                              onChange={e => updateCrop(index, 'wateringMethod', e.target.value)}
                            >
                              <option value="rain">سقي بالمطر </option>
                              <option value="mixed">سقي مختلط </option>
                              <option value="artificial">سقي اصطناعي </option>
                            </select>
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="bg-white/70 rounded-lg p-4">
                          <label className="block font-semibold text-gray-700 text-sm mb-3">
                            الكمية (كيلوغرام)
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              className="w-full p-4 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white pr-12"
                              value={formatNumber(crop.quantity)}
                              onChange={e => {
                                const rawValue = e.target.value.replace(/,/g, "");
                                if (!isNaN(rawValue) && rawValue >= 0) {
                                  updateCrop(index, 'quantity', rawValue);
                                }
                              }}
                              placeholder="أدخل الكمية"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">كغ</span>
                          </div>
                        </div>

                        {/* Ownership Type */}
                        <div className="bg-white/70 rounded-lg p-4">
                          <label className="block font-semibold text-gray-700 text-sm mb-3">
                            نوع الملكية
                          </label>
                          <div className="relative">
                            <select
                              className="w-full p-4 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                              value={crop.ownershipType}
                              onChange={e => updateCrop(index, 'ownershipType', e.target.value)}
                            >
                              <option value="individual">ملكية فردية</option>
                              <option value="shared">ملكية مشتركة</option>
                            </select>
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        {/* Ownership Share (if shared) */}
                        {crop.ownershipType === 'shared' && (
                          <div className="bg-white/70 rounded-lg p-4">
                            <label className="block font-semibold text-gray-700 text-sm mb-3">
                              نصيبك من الملكية (%)
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                className="w-full p-4 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white pr-12"
                                value={crop.ownershipShare}
                                onChange={e => updateCrop(index, 'ownershipShare', e.target.value)}
                                placeholder="أدخل النسبة المئوية"
                                min="0"
                                max="100"
                              />
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">📊</span>
                            </div>
                          </div>
                        )}

                        {/* Zakat Result */}
                        {crop.zakatDue > 0 && (
                          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-green-800">الزكاة المستحقة:</span>
                              <span className="text-2xl font-bold text-green-700">
                                {crop.zakatDue.toFixed(2)} كغ
                              </span>
                            </div>
                            <div className="text-sm text-green-600 mt-2">
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
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
                  >
                    <span className="text-xl ml-2">➕</span>
                    إضافة محصول جديد
                  </button>
                </div>

                {/* Calculate and Save Buttons */}
                {crops.length > 0 && (
                  <div className="flex gap-4 justify-center mt-10 pt-6 border-t border-gray-200">
                    <button 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={calculateZakat}
                    >
                      <span className="flex items-center">
                        <span className="text-xl ml-2">🧮</span>
                        حساب الزكاة
                      </span>
                    </button>
                    
                    {getTotalZakat() > 0 && (
                      <button 
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={saveZakatHistory}
                        disabled={isLoading}
                      >
                        <span className="flex items-center">
                          <span className="text-xl ml-2">💾</span>
                          {isLoading ? "جاري الحفظ..." : "حفظ النتائج"}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Total Results Card */}
          {crops.length > 0 && getTotalZakat() > 0 && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-4">إجمالي الزكاة المستحقة</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">
                  {getTotalZakat().toFixed(2)} كيلوغرام
                </div>
                <p className="text-green-700">
                  من إجمالي {crops.length} محصول{crops.length > 1 ? 'ات' : ''}
                </p>
              </div>
            </div>
          )}

          {/* Information Card */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-full ml-4">
                <span className="text-2xl">ℹ️</span>
              </div>
              <div>
                <h3 className="font-bold text-amber-800 mb-1">معلومات مهمة</h3>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• النصاب للمحاصيل الزراعية: {NISAB.toLocaleString()} كيلوغرام</li>
                  <li>• السقي بالمطر أو الأنهار: 10% من المحصول</li>
                  <li>• السقي المختلط: 7.5% من المحصول</li>
                  <li>• السقي الاصطناعي (بالآلات): 5% من المحصول</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};