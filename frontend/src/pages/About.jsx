import React from 'react';
import { Header } from '../Components/Header';
import Footer from '../Components/Footer';
import AboutPic from '../Components/AboutPic';
import Values from '../Components/Values';

export default function About() {
  return (
    <>
      <Header />
     
      
      {/* Hero Section */}
      <div className="relative w-full h-80 bg-green-900 text-white flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-bold">الزكاة في الإسلام</h1>
        <p className="text-lg mt-4 max-w-2xl">
          "خذ من أموالهم صدقة تطهرهم وتزكيهم بها" - التوبة 103
        </p>
      </div>
      
      {/* What is Zakat? */}
      <div className="container mx-auto p-6 text-right" dir="rtl">
        <h2 className="text-3xl font-semibold text-green-900">ما هي الزكاة؟</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          الزكاة هي أحد أركان الإسلام الخمسة، وهي فريضة مالية تهدف إلى تحقيق التكافل الاجتماعي وتقليل الفجوات الاقتصادية في المجتمع. يفرض الإسلام على المسلمين القادرين إخراج نسبة معينة من أموالهم لمساعدة الفقراء والمحتاجين.
        </p>
      </div>
      
      {/* Importance of Zakat */}
      <div className="bg-green-100 py-10 px-6">
        <div className="container mx-auto text-right" dir="rtl">
          <h2 className="text-3xl font-semibold text-green-900">لماذا الزكاة مهمة؟</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            تعتبر الزكاة وسيلة لتطهير الأموال وزيادة البركة فيها، وهي تساهم في تحقيق التوازن الاقتصادي والعدالة الاجتماعية، كما أنها تعزز روح التعاون والتكافل بين أفراد المجتمع.
          </p>
        </div>
      </div>
      
      {/* How is Zakat Calculated? */}
      <div className="container mx-auto p-6 text-right" dir="rtl">
        <h2 className="text-3xl font-semibold text-green-900">كيفية حساب الزكاة؟</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          يتم حساب الزكاة بنسبة 2.5٪ من الأموال التي يملكها المسلم إذا بلغت النصاب ومر عليها حول كامل. تشمل الزكاة الأموال النقدية، الذهب والفضة، وعروض التجارة وغيرها من الثروات.
        </p>
      </div>
      
      {/* Our Mission & Values */}
      <div className="bg-green-200 py-10 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-green-900">قيمنا ورسالتنا</h2>
          <div className="flex flex-wrap justify-center gap-1.5 mt-6">
            <Values value="التكافل الاجتماعي" />
            <Values value="العدالة الاقتصادية" />
            <Values value="النزاهة والشفافية" />
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-green-900">احسب زكاتك الآن</h2>
        <p className="text-gray-700 mt-4">استخدم منصتنا لحساب مقدار الزكاة المستحق بسهولة.</p>
        <a href="/zakat-calculator" className="mt-6 inline-block px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition">
          احسب الآن
        </a>
      </div>
      
      <Footer />
    </>
  );
}