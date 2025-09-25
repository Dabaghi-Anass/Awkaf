import React from 'react'

export const ZakatReceiver = () => {
  return (
    <>
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12 lg:py-16 px-4 sm:px-6">
                <div className="container mx-auto text-right max-w-4xl" dir="rtl">
                  <div className="flex items-center mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full ml-4"></div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-900">
                      مصارف الزكاة الثمانية
                    </h2>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-indigo-100 mb-6">
                    <p className="text-center text-lg text-indigo-800 font-semibold mb-6 leading-relaxed">
                      "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ"
                    </p>
                    <div className="text-center text-sm text-gray-500">سورة التوبة: آية 60</div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      { title: "الفقراء", desc: "الذين لا يجدون ما يكفي حاجاتهم الأساسية", color: "from-red-400 to-red-600" },
                      { title: "المساكين", desc: "الذين يجدون بعض حاجاتهم وليس كلها", color: "from-orange-400 to-orange-600" },
                      { title: "العاملون عليها", desc: "جباة الزكاة والقائمون على توزيعها", color: "from-yellow-400 to-yellow-600" },
                      { title: "المؤلفة قلوبهم", desc: "من يُراد تأليف قلوبهم للإسلام", color: "from-green-400 to-green-600" },
                      { title: "في الرقاب", desc: "تحرير العبيد والأسرى", color: "from-blue-400 to-blue-600" },
                      { title: "الغارمون", desc: "المدينون الذين عجزوا عن سداد ديونهم", color: "from-indigo-400 to-indigo-600" },
                      { title: "في سبيل الله", desc: "الجهاد وكل أعمال الخير العامة", color: "from-purple-400 to-purple-600" },
                      { title: "ابن السبيل", desc: "المسافر المنقطع عن بلده وماله", color: "from-pink-400 to-pink-600" }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2 text-center">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
    </> 
  )
}
