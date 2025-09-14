import React from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import Values from "../Components/Values";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-96 bg-gradient-to-r from-green-800 to-green-600 flex flex-col justify-center items-center text-center px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          الزكاة في الإسلام
        </h1>
        <p className="mt-4 max-w-2xl text-sm md:text-lg opacity-90 leading-relaxed">
          عن ابن عمر رضي الله عنهما، أن النبي صلى الله عليه وسلم قال:
          <br />
          (بني الإسلام على خمس: شهادة أن لا إله إلا الله، وأن محمداً رسول
          الله، وإقام الصلاة، وإيتاء الزكاة...) الحديث.
        </p>
      </div>

      {/* What is Zakat */}
      <section className="container mx-auto px-6 py-12 text-right" dir="rtl">
        <h2 className="text-3xl font-bold text-green-900 border-r-4 border-green-600 pr-3">
          ما هي الزكاة؟
        </h2>
        <p className="mt-6 text-gray-700 leading-relaxed text-lg">
          هي الركن الثالث من أركان الإسلام الذي يأمر الإنسان بالتصدق وإعطاء
          جزء من المال للفقراء والمحتاجين. وهي عمل خيري إلزامي يهدف إلى دعم
          الفئات الأكثر فقراً في المجتمع. لأن التبرع بالمال للفقراء ينقي مال
          الأغنياء ويكفي الفقراء وعائلاتهم بتلبية اِحتياجاتهم الأساسية.
        </p>
      </section>

      {/* Importance of Zakat */}
      <section className="bg-green-50 py-12 px-6">
        <div className="container mx-auto text-right" dir="rtl">
          <h2 className="text-3xl font-bold text-green-900 border-r-4 border-green-600 pr-3">
            لماذا الزكاة مهمة؟
          </h2>
          <p className="mt-6 text-gray-700 leading-relaxed text-lg">
            تعتبر الزكاة وسيلة لتطهير الأموال وزيادة البركة فيها، وهي تساهم في
            تحقيق التوازن الاقتصادي والعدالة الاجتماعية، كما أنها تعزز روح
            التعاون والتكافل بين أفراد المجتمع.
          </p>
        </div>
      </section>

      {/* How Zakat is Calculated */}
      <section className="container mx-auto px-6 py-12 text-right" dir="rtl">
        <h2 className="text-3xl font-bold text-green-900 border-r-4 border-green-600 pr-3">
          كيفية حساب الزكاة؟
        </h2>
        <p className="mt-6 text-gray-700 leading-relaxed text-lg">
          يتم حساب الزكاة بنسبة <span className="font-semibold">2.5٪</span> من
          الأموال التي يملكها المسلم إذا بلغت النصاب ومر عليها حول كامل. تشمل
          الزكاة الأموال النقدية، الذهب والفضة، وعروض التجارة وغيرها من
          الثروات.
        </p>
      </section>

      {/* Mission & Values */}
      <section className="bg-green-100 py-14 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">
            قيمنا ورسالتنا
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 leading-relaxed mb-8">
            نؤمن أن رسالتنا تتجسد في نشر الوعي بأهمية الزكاة، وتوفير منصة
            سهلة الاستخدام لحسابها بدقة وشفافية بما يساهم في بناء مجتمع
            متكافل.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Values value="التكافل الاجتماعي" />
            <Values value="العدالة الاقتصادية" />
            <Values value="النزاهة والشفافية" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-green-700 to-green-800 text-white">
        <h2 className="text-3xl font-bold">احسب زكاتك الآن</h2>
        <p className="mt-4 text-lg opacity-90">
          استخدم منصتنا لحساب مقدار الزكاة المستحق بسهولة وبدقة.
        </p>
        <Link
          to="/ZakatCalculator"
          className="mt-6 inline-block px-8 py-3 bg-white text-green-800 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          احسب الآن
        </Link>
      </section>

      <Footer />
    </>
  );
}
