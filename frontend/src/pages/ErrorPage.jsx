import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-green-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Animated Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 opacity-20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-lg">
              <AlertCircle className="w-16 h-16 text-red-500" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
          {/* 404 Large Text */}
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-2">
              404
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-md mx-auto">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو ليس لديك صلاحية للوصول إليها. يرجى التحقق من الرابط أو العودة إلى الصفحة الرئيسية.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/home")}
              className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              <span>العودة إلى الرئيسية</span>
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>الرجوع للخلف</span>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}