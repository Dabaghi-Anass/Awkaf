import React, { useContext, useState } from "react";
import { X, Save, Printer, Calculator, Info, Calendar, Coins, TrendingUp, AlertCircle, Phone } from "lucide-react";

// Mock components for demo
const ZakatContext = React.createContext({
  zakatFormInfos: { totalAmount: 2500000, zakatAmount: 62500 },
  setShowResult: () => {},
  saveZakatHistory: () => {},
  isUnnaire: true,
  nissab: 850000
});

const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

export const TestForm = () => {
  const { zakatFormInfos, setShowResult, saveZakatHistory, isUnnaire, nissab } = useContext(ZakatContext);

  const zakatTax = zakatFormInfos.zakatAmount * 1.26;
  const formatNumber = (num) => (!num ? "0" : num.toLocaleString("fr-FR"));
  const handlePrint = () => window.print();

  const today = new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long", 
    day: "numeric",
  });

  const todaySimple = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* Enhanced Modal Dialog */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300">
          
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-2">
                <Calculator className="w-6 h-6 ml-2" />
                <h2 className="text-xl font-bold">تفاصيل الحساب</h2>
              </div>
              <p className="text-emerald-100 text-center text-sm">
                حساب دقيق ومفصل لزكاة المال
              </p>
            </div>
            
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all"
              onClick={() => setShowResult(false)}
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Summary Cards */}
            <div className="grid gap-4 mb-6">
              {/* Zakat Amount Card */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="bg-emerald-100 p-2 rounded-lg ml-2">
                    <Coins className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="font-semibold text-emerald-800 text-sm">قيمة الزكاة (معنا)</span>
                </div>
                <p className="text-2xl font-bold text-emerald-700 text-center">
                  {formatNumber(zakatFormInfos.zakatAmount)} د.ج
                </p>
              </div>

              {/* Tax Amount Card */}
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="bg-red-100 p-2 rounded-lg ml-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="font-semibold text-red-800 text-xs">قيمة الزكاة بالضريبة IBS (من دوننا)</span>
                </div>
                <p className="text-2xl font-bold text-red-700 text-center">
                  {formatNumber(zakatTax)} د.ج
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Info className="w-4 h-4 text-blue-600 ml-2" />
                  <span className="text-sm font-medium text-gray-700">قيمة النصاب:</span>
                </div>
                <span className="font-bold text-gray-900">{formatNumber(nissab)} د.ج</span>
              </div>

              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-purple-600 ml-2" />
                  <span className="text-sm font-medium text-gray-700">الوعاء الزكوي:</span>
                </div>
                <span className="font-bold text-gray-900">{formatNumber(zakatFormInfos.totalAmount)} د.ج</span>
              </div>

              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-orange-600 ml-2" />
                  <span className="text-sm font-medium text-gray-700">التاريخ:</span>
                </div>
                <span className="font-bold text-gray-900">{today}</span>
              </div>

              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-green-600 ml-2" />
                  <span className="text-sm font-medium text-gray-700">نوع الحول:</span>
                </div>
                <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                  isUnnaire 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {isUnnaire ? "هجري" : "ميلادي"}
                </span>
              </div>
            </div>

            {/* Contact Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <div className="flex items-start">
                <Phone className="w-4 h-4 text-blue-600 mt-0.5 ml-2 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  إن أردت إخراج الزكاة دون ضريبة{" "}
                  <Link to="/contact" className="font-semibold text-blue-600 hover:text-blue-800 underline">
                    اتصل بنا
                  </Link>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={saveZakatHistory}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
              >
                <Save className="w-4 h-4" />
                حفظ
              </button>

              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
              >
                <Printer className="w-4 h-4" />
                طباعة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Print Receipt */}
      <div id="printable-receipt" className="hidden print:block p-10 text-black border-2 border-gray-400 bg-white max-w-2xl mx-auto">
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-3xl font-bold text-green-700 mb-2">وصل دفع الزكاة</h1>
          <div className="w-20 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 text-lg">
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">التاريخ:</span>
              <span className="font-bold">{today}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">نوع الحول:</span>
              <span className="font-bold">{isUnnaire ? "هجري" : "ميلادي"}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">قيمة النصاب:</span>
              <span className="font-bold">{formatNumber(nissab)} د.ج</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-medium">الوعاء الزكوي:</span>
              <span className="font-bold">{formatNumber(zakatFormInfos.totalAmount)} د.ج</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center text-2xl">
            <span className="font-bold text-green-800">مبلغ الزكاة المستحق:</span>
            <span className="font-bold text-green-700">{formatNumber(zakatFormInfos.zakatAmount)} د.ج</span>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 pt-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium mb-2">توقيع المكلف:</p>
              <div className="w-48 border-b-2 border-gray-400"></div>
            </div>
            <div className="text-right text-gray-600">
              <p className="text-sm">تم إنشاء هذا الوصل في:</p>
              <p className="text-sm font-medium">{new Date().toLocaleString("ar-SA")}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
          <p>هذا وصل رسمي لدفع الزكاة - يُرجى الاحتفاظ به للمراجع المستقبلية</p>
        </div>
      </div>
    </>
  );
};