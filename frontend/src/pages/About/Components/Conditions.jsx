import React from 'react'

export const Conditions = () => {
  return (
    <>
        <section className="container mx-auto px-4 sm:px-6 py-12 lg:py-16 text-right" dir="rtl">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
                      شروط وجوب الزكاة
                    </h2>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                        <h3 className="font-bold text-blue-800 mb-3 text-center">الإسلام</h3>
                        <p className="text-sm text-blue-700 text-center">
                          أن يكون المزكي مسلماً بالغاً عاقلاً
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-amber-200">
                        <h3 className="font-bold text-amber-800 mb-3 text-center">النصاب</h3>
                        <p className="text-sm text-amber-700 text-center">
                          أن يبلغ المال النصاب المحدد شرعاً
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 sm:p-6 border border-teal-200">
                        <h3 className="font-bold text-teal-800 mb-3 text-center">الحول</h3>
                        <p className="text-sm text-teal-700 text-center">
                          مرور سنة هجرية كاملة على المال
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
    </>
  )
}
