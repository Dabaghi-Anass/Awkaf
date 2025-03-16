import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

export const WakfP = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/apif/public/waqf-projects/${id}/`
        );
        if (!response.ok) throw new Error("فشل في جلب بيانات المشروع");
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("خطأ في جلب المشروع:", error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <p className="text-center mt-10">جارٍ التحميل...</p>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-6" dir="rtl">
        {/* زر الرجوع */}
        <Link to="/Awkaf" className="text-green-700 hover:underline">
          &larr; العودة
        </Link>

        {/* عنوان المشروع */}
        <h1 className="text-3xl font-bold text-center text-green-900 mt-6">
          {project.name}
        </h1>

        {/* صورة المشروع */}
        {project.image && (
          <div
            className="mt-6 w-full h-125 bg-cover bg-center rounded-lg shadow-md"
            style={{ backgroundImage: `url(${project.image})` }}
          ></div>
        )}

        {/* تفاصيل المشروع */}
        <div className="bg-green-900 text-green-100 p-6 mt-10 rounded-lg shadow-lg">
          {[
            { key: "introduction", label: "مقدمة المشروع" },
            { key: "background", label: "الخلفية" },
            { key: "objectives", label: "الأهداف" },
            { key: "key_stages", label: "المراحل الرئيسية" },
            { key: "expected_outcomes", label: "النتائج المتوقعة" },
            { key: "challenges_solutions", label: "التحديات والحلول" },
            { key: "required_resources", label: "الموارد المطلوبة" },
            { key: "timeline", label: "الجدول الزمني" },
            { key: "tools_technologies", label: "الأدوات والتقنيات" },
            { key: "partners_supporters", label: "الشركاء والداعمون" },
            { key: "conclusion", label: "الخاتمة" },
          ].map(
            ({ key, label }) =>
              project[key] && (
                <div key={key} className="mb-6">
                  <h2 className="text-xl font-semibold">{label}</h2>
                  <p className="mt-2 text-green-50 leading-relaxed">
                    {project[key]}
                  </p>
                </div>
              )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
