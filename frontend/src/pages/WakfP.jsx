import React, { useState, useEffect, useContext } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { ZakatContext } from "../Components/ZakatProvider";
import { Loader } from "../Components/Loader";

export const WakfP = () => {
  const {isLoading,setIsLoading}=useContext(ZakatContext);
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchProject();
  }, [id]);

  if (!project) return <Loader/>;
   const imageUrl = project.image?.startsWith("http") ? project.image : `http://localhost:8000${project.image}`;
    
  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 p-6" dir="rtl">
       {isLoading ? <Loader/> :(<>
        <Link
          to="/Awkaf"
          className="text-green-700 hover:underline mt-10 flex items-center gap-2"
        >
          <span className="text-xs  ">العودة إلى المشاريع</span> 
        </Link>
       
        <h1 className="text-4xl font-extrabold text-center text-green-900 ">
          {project.name}
        </h1>
        
      

            <div 
                className="project-pic bg-cover bg-center h-[25em] rounded-t-xl mt-6 mx-auto w-[50em] rounded-lg overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            
        
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

        <div className="text-center mt-10">
          <button  className="custom-button py-2 px-4 rounded-[8px]"  onClick={() => navigate('/Contact')}>
            دعم المشروع
          </button>
        </div>
       </>)}
       
       
      </div>
      <Footer />
    </>
  );
};
