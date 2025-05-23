import React, { useState, useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

export const WakfP = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();
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

  if (!project) return <p className="text-center mt-10 text-gray-600">جارٍ التحميل...</p>;
   const imageUrl = project.image?.startsWith("http") ? project.image : `http://localhost:8000${project.image}`;
    console.log("Project Image URL:", imageUrl);
  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 p-6" dir="rtl">
       
       
       <Link
          to="/Awkaf"
          className="text-green-700 hover:underline mt-10 flex items-center gap-2"
        >
          <span className="text-xs  ">العودة إلى المشاريع</span> 
        </Link>
        {/* عنوان المشروع */}
        <h1 className="text-4xl font-extrabold text-center text-green-900 ">
          {project.name}
        </h1>
        
        {/* صورة المشروع */}
      
        
            <div 
                className="project-pic bg-cover bg-center h-[25em] rounded-t-xl mt-6 mx-auto w-[50em] rounded-lg overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            
        
      

        {/* تفاصيل المشروع */}
        <div className="">
          {[
           
            { key: "objectives", label: " الأهداف" },
            { key: "partners", label: " الشركاء والداعمون" },
          ].map(
            ({ key, label }) =>
              project[key] && (
                <div key={key} className="mb-6 border-b border-green-600 bg-green-900 text-green-100 p-8 mt-10 rounded-lg shadow-xl">
                  <h2 className="text-2xl font-semibold">{label}</h2>
                  <p className="mt-2 text-green-50 leading-relaxed">
                    {project[key]}
                  </p>
                </div>
              )
          )}
        </div>

        {/* CTA (اختياري) */}
        <div className="text-center mt-10">
          <button  className="custom-button py-2 px-4 rounded-[8px]"  onClick={() => navigate('/Contact')}>
            دعم المشروع
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
