import React from 'react'

export const WealthZakat = () => {
  return (
    <>
    <section className="bg-gradient-to-br from-gray-50 to-emerald-50 py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto text-right max-w-4xl" dir="rtl">
          <div className="flex items-center mb-8">
            <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
              أنواع الأموال التي تجب فيها الزكاة
            </h2>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">₹</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">النقود والأوراق المالية</h3>
                  <p className="text-sm text-gray-600">
                    الأموال النقدية والودائع البنكية والأسهم والسندات
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">⚜</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">الذهب والفضة</h3>
                  <p className="text-sm text-gray-600">
                    المجوهرات والحلي والسبائك الذهبية والفضية
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">🏪</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">عروض التجارة</h3>
                  <p className="text-sm text-gray-600">
                    البضائع والسلع المعدة للبيع والتجارة
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">🌾</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">الزروع والثمار</h3>
                  <p className="text-sm text-gray-600">
                    المحاصيل الزراعية والثمار إذا بلغت النصاب
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brown-400 to-brown-600 rounded-full mx-auto mb-4 flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #92400e, #78350f)'}}>
                    <span className="text-2xl font-bold text-white">🐄</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">الأنعام</h3>
                  <p className="text-sm text-gray-600">
                    الإبل والبقر والغنم السائمة (الراعية)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
