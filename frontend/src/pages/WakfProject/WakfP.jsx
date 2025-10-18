import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { ZakatContext } from "../../Components/ZakatProvider";
import { Loader } from "../../Components/Loader";
import { Support } from "./Components/Support";

export const WakfP = () => {
  const { isLoading, setIsLoading } = useContext(ZakatContext);
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

  if (!project) return <Loader />;

  const imageUrl = project.image?.startsWith("http")
    ? project.image
    : `VITE_API_URL${project.image}`;

  return (
    <>
  
      
      {isLoading ? (
        <Loader />
      ) : (
        <>
      
          

          {/* Main Content */}
          <div className=" mx-auto   py-12 mt-10" dir="rtl">
            {/* Project Title */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight max-sm:text-xl">
                {project.name}
              </h1>
              <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            {/* Project Image */}
            <div className="mb-10">
              <div className="relative max-w-4xl h-1/2 mx-auto">
                <div 
                  className="h-100  rounded-2xl shadow-2xl bg-cover bg-center relative overflow-hidden max-sm:rounded-none max-sm:h-60"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Image Overlay Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-green4 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      مشروع وقفي
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
               
              </div>
            </div>

            {/* Project Details Grid */}
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-2">
                {[
                  { key: "objectives", label: "أهداف المشروع",  },
                  { key: "partners", label: "الشركاء والداعمون",  },
                ].map(
                  ({ key, label }) =>
                    project[key] && (
                      <div
                        key={key}
                        className="group"
                      >
                        <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                          {/* Card Header */}
                          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                            <div className="relative z-10">
                              <div className="flex items-center justify-between">
                                <div className="">
                                  
                                  <h2 className="text-lg font-bold text-white max-sm:text-sm  ">
                                    {label}
                                  </h2>
                                </div>
                                <div className="w-8 h-8 bg-green2 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-4">
                            <div className="prose prose-lg max-w-none text-right">
                              <p className="text-gray-700 leading-relaxed text-sm max-sm:text-xs">
                                {project[key]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* Support Section */}
                <Support/>
            {/* Related Projects Section */}
            <div className="mt-10">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4 max-sm:text-xl ">
                  مشاريع أخرى قد تهمك
                </h3>
                <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="text-center">
                <button
                      onClick={() => navigate('/Awkaf')}
                      className="custom-button py-5 px-3 rounded-2xl text-lg font-bold "
                    >
                       استكشف المزيد من المشاريع
                     
                    </button>
              </div>
            </div>
          </div>
        </>
      )}

  
    </>
  );
};