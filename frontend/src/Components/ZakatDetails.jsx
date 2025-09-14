import React, { useContext } from "react";
import { Printer, X, Calendar, Coins, TrendingUp, Info } from "lucide-react";

// Mock ZakatContext for demo
const ZakatContext = React.createContext({
  isUnnaire: true,
  nissab: 850000
});

export default function ZakatDetails({ zakatFormInfos = { totalAmount: 2500000, zakatAmount: 62500 }, onClose = () => {} }) {
  const { isUnnaire, nissab } = useContext(ZakatContext);

  const formatNumber = (num) => (!num ? "0" : num.toLocaleString("fr-FR"));

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const zakatPercentage = ((zakatFormInfos.zakatAmount / zakatFormInfos.totalAmount) * 100).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-2">
              <Coins className="w-8 h-8 ml-3" />
              <h2 className="text-3xl font-bold">تفاصيل حساب الزكاة</h2>
            </div>
            <p className="text-emerald-100 text-center text-sm">
              حساب دقيق ومفصل لزكاة المال
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Summary Card */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-emerald-600 text-white p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-2">إجمالي قيمة الزكاة المستحقة</p>
              <p className="text-4xl font-bold text-emerald-700 mb-2">
                {formatNumber(zakatFormInfos.zakatAmount)} د.ج
              </p>
              <p className="text-sm text-gray-500">({zakatPercentage}% من إجمالي المال)</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid gap-4 mb-8">
            {/* Nissab */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg ml-3">
                    <Info className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-700">قيمة النصاب:</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">{formatNumber(nissab)} د.ج</span>
              </div>
            </div>

            {/* Total Amount */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg ml-3">
                    <Coins className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-semibold text-gray-700">الوعاء الزكوي:</span>
                </div>
                <span className="font-bold text-gray-900 text-lg">{formatNumber(zakatFormInfos.totalAmount)} د.ج</span>
              </div>
            </div>

            {/* Date */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-lg ml-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="font-semibold text-gray-700">تاريخ الحساب:</span>
                </div>
                <span className="font-bold text-gray-900">{currentDate}</span>
              </div>
            </div>

            {/* Year Type */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg ml-3">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-semibold text-gray-700">نوع الحول:</span>
                </div>
                <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                  isUnnaire 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {isUnnaire ? "هجري" : "ميلادي"}
                </span>
              </div>
            </div>
          </div>

          {/* Information Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800 text-sm text-center">
              <Info className="w-4 h-4 inline ml-2" />
              يُرجى التأكد من دقة البيانات المدخلة قبل إخراج الزكاة
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between">
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <X className="w-5 h-5" />
              إغلاق
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Printer className="w-5 h-5" />
              طباعة
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            تم إنشاء هذا التقرير في {new Date().toLocaleString("ar-SA")}
          </p>
        </div>
      </div>
    </div>
  );
}