import React from "react";
import { Header } from "../../Components/Header";
import Footer from "../../Components/Footer";

import { Link } from "react-router-dom";
import { Hero } from "./Components/Hero";
import { Zakat } from "./Components/Zakat";
import { WealthZakat } from "./Components/WealthZakat";
import { ZakatReceiver } from "./Components/ZakatReceiver";
import { Zvalues } from "./Components/Zvalues";
import { Conditions } from "./Components/Conditions";

export default function About() {
  return (
    <>
      <Header />

      {/* Hero Section */}
        <Hero/>

      {/* What is Zakat */}
      <Zakat/>
      {/* Importance of Zakat */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto text-right max-w-4xl" dir="rtl">
          <div className="flex items-center mb-8">
            <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
              أهمية الزكاة في الإسلام
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">الأهمية الروحية</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                تطهر الزكاة قلب المؤمن من الشح والبخل، وتزكي نفسه وتطهرها من الذنوب والآثام. 
                قال الله تعالى: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا"
              </p>
              <div className="text-xs text-gray-500 italic">سورة التوبة: آية 103</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">الأهمية الاجتماعية</h3>
              <p className="text-gray-700 leading-relaxed">
                تحقق الزكاة التوازن الاجتماعي والاقتصادي، وتقلل من الفجوة بين الأغنياء والفقراء، 
                وتساهم في بناء مجتمع متماسك يسوده العدل والرحمة والتكافل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions of Zakat */}
      <Conditions/>

      {/* Types of Wealth Subject to Zakat */}
      <WealthZakat/>

      {/* How Zakat is Calculated */}
      <section className="container mx-auto px-4 sm:px-6 py-12 lg:py-16 text-right" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="w-1 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full ml-4"></div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-900">
              كيفية حساب الزكاة؟
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mb-4">
                <span className="text-3xl font-bold text-white">2.5%</span>
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">نسبة الزكاة الأساسية</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-xl p-4 sm:p-6 border-r-4 border-emerald-500">
                <h4 className="font-bold text-emerald-800 mb-3">للأموال النقدية والتجارة:</h4>
                <p className="text-gray-700 mb-2">
                  النسبة: <span className="font-bold text-emerald-700">2.5%</span> من إجمالي المال
                </p>
                <p className="text-sm text-gray-600">
                  النصاب: ما يعادل قيمة 85 جراماً من الذهب
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4 sm:p-6 border-r-4 border-amber-500">
                <h4 className="font-bold text-amber-800 mb-3">للزروع والثمار:</h4>
                <p className="text-gray-700">
                  <span className="font-bold text-amber-700">10%</span> إذا سُقيت بماء المطر أو الأنهار
                  <br />
                  <span className="font-bold text-amber-700">5%</span> إذا سُقيت بالآلات والري الصناعي
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border-r-4 border-blue-500">
                <h4 className="font-bold text-blue-800 mb-3">معادلة الحساب:</h4>
                <div className="bg-white rounded-lg p-4 font-mono text-center text-lg">
                  <span className="text-blue-800">مقدار الزكاة = المال الخاضع للزكاة × 0.025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Receives Zakat */}
      
      <ZakatReceiver/>
      {/* Mission & Values */}
      <Zvalues/>

      {/* Call to Action */}
      <section className="text-center py-12 lg:py-16 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 text-white px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            احسب زكاتك الآن بدقة وسهولة
          </h2>
          <p className="text-base sm:text-lg lg:text-xl opacity-95 mb-8 leading-relaxed">
            استخدم حاسبة الزكاة المتقدمة لدينا لتحديد مقدار الزكاة المستحق عليك بدقة عالية 
            وفقاً للأحكام الشرعية المعتمدة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/ZakatCalculator"
              className="inline-block px-8 py-4 bg-white text-emerald-800 font-bold rounded-xl shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              ابدأ الحساب الآن
            </Link>
            <p className="text-sm opacity-80">
              مجاني تماماً • دقيق وموثوق • سهل الاستخدام
            </p>
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
}