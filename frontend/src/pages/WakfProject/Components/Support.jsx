import {Link} from "react-router-dom"
import React from 'react'

export const Support = () => {
  return (
         <div className="mt-10">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 rounded-2xl p-6 text-center text-white relative overflow-hidden max-sm:rounded-none">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-green2 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>

                    <h1 className="text-2xl font-bold mb-4 max-sm:text-lg">
                      شارك في الأجر والثواب
                    </h1>
                    
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed max-sm:text-sm">
                      ساهم في دعم هذا المشروع الوقفي واحصل على الأجر المستمر. 
                      كل مساهمة تساعد في تحقيق أهداف خيرية نبيلة.
                    </p>

                    {/* Statistics */}
                    <div className="grid md:grid-cols-3 gap-3 mb-10">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <div className="text-lg font-bold text-green2 mb-2">مستمر</div>
                        <p className="text-white/80">أجر وثواب</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <div className="text-lg font-bold text-green2 mb-2">نبيل</div>
                        <p className="text-white/80">هدف خيري</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <div className="text-lg font-bold text-green2 mb-2">مؤثر</div>
                        <p className="text-white/80">تأثير اجتماعي</p>
                      </div>
                    </div>

                    {/* Support Button */}
                   
                      <Link  className="inline-flex items-center px-8 py-4 bg-green2 text-gray-800 rounded-full hover:bg-green4 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-bold text-lg group max-sm:text-sm" to="/Contact">دعم المشروع الآن</Link>
                     
                    

                    {/* Additional Info */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <p className="text-white/70 text-sm">
                        للاستفسارات والمزيد من التفاصيل، يرجى التواصل معنا
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

  )
}
