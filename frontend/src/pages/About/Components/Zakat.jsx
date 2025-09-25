

import React from 'react'

export const Zakat = () => {
  return (
    <>
     <section className="container mx-auto px-4 sm:px-6 py-12 lg:py-16 text-right" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
              ما هي الزكاة؟
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
              الزكاة هي الركن الثالث من أركان الإسلام، وهي فريضة مالية واجبة على كل مسلم بالغ عاقل حر، 
              إذا ملك النصاب ومضى عليه الحول. والزكاة لغة تعني النماء والطهارة والبركة، 
              واصطلاحاً هي حق واجب في مال خاص لطائفة مخصوصة في وقت مخصوص.
            </p>
            <div className="bg-emerald-50 rounded-xl p-4 sm:p-6 border-r-4 border-emerald-500">
              <h3 className="font-bold text-emerald-800 mb-3 text-lg">الحكمة من الزكاة:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  تطهير النفس من الشح والبخل
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  تزكية المال وتطهيره وإنماؤه
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  تحقيق التكافل الاجتماعي والعدالة الاقتصادية
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
