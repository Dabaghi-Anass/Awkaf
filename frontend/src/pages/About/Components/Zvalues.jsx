
import React from 'react'
import Values from "./Values";
export const Zvalues = () => {
  return (
   <>
     <section className="bg-gradient-to-br from-emerald-100 to-teal-100 py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900 mb-4">
              رسالتنا وقيمنا
            </h2>
            <div className="w-20 h-1 bg-emerald-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100 mb-8">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              نسعى إلى تسهيل أداء فريضة الزكاة على المسلمين من خلال توفير منصة دقيقة وموثوقة لحساب الزكاة، 
              مع نشر الوعي بأهميتها الدينية والاجتماعية، وإرشاد المزكين إلى الطرق الصحيحة لإخراجها وتوزيعها.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Values value="خدمة المجتمع " description={"العمل من أجل خدمة المجتمع الإسلامي وتسهيل أداء الفرائض الدينية"} />
              <Values value="التكافل الاجتماعي" description={"تحقيق التضامن والتعاون بين أفراد المجتمع لضمان العيش الكريم للجميع"} />
              <Values value="الرحمة والإحسان" description={"التعامل بالرحمة مع الفقراء والمحتاجين وتقديم المساعدة بكرامة"} />
              <Values value="الأمانة والثقة" description={"الحفاظ على أموال المزكين وضمان وصولها لمستحقيها بكل شفافية"} />
              <Values value="سهولة الاستخدام" description={"وفير واجهة بسيطة ومفهومة لجميع المستخدمين من مختلف الأعمار"} />
              <Values value="التنمية المستدامة" description={"دعم التنمية الاقتصادية والاجتماعية المستدامة في المجتمع"} />
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">لماذا تختار منصتنا؟</h3>
            <div className="grid md:grid-cols-2 gap-6 text-right" dir="rtl">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  <span className="text-gray-700">حسابات دقيقة وفق المذاهب المعتمدة</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  <span className="text-gray-700">واجهة سهلة ومناسبة لجميع المستخدمين</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  <span className="text-gray-700">حماية وخصوصية البيانات المالية</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  <span className="text-gray-700">إرشادات شرعية واضحة ومفصلة</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  <span className="text-gray-700">تحديث مستمر للأسعار والمعادلات</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                  <span className="text-gray-700">دعم فني متميز ومساعدة مستمرة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
   </>
  )
}
