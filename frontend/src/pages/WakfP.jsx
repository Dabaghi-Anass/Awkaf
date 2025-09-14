import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import { ZakatContext } from "../Components/ZakatProvider";
import { Loader } from "../Components/Loader";

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
    : `http://localhost:8000${project.image}`;

  return (
    <>
      <Header />
      
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Hero Section with Breadcrumb */}
          

          {/* Main Content */}
          <div className="container mx-auto px-6 py-12 mt-10" dir="rtl">
            {/* Project Title */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
                {project.name}
              </h1>
              <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            {/* Project Image */}
            <div className="mb-16">
              <div className="relative max-w-5xl mx-auto">
                <div 
                  className="h-96 md:h-[500px] rounded-2xl shadow-2xl bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Image Overlay Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      مشروع وقفي
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full opacity-80"></div>
              </div>
            </div>

            {/* Project Details Grid */}
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-8">
                {[
                  { key: "objectives", label: "أهداف المشروع", icon: "🎯" },
                  { key: "partners", label: "الشركاء والداعمون", icon: "🤝" },
                ].map(
                  ({ key, label, icon }) =>
                    project[key] && (
                      <div
                        key={key}
                        className="group"
                      >
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                          {/* Card Header */}
                          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                            <div className="relative z-10">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                                    {icon}
                                  </div>
                                  <h2 className="text-2xl font-bold text-white mr-4">
                                    {label}
                                  </h2>
                                </div>
                                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-8">
                            <div className="prose prose-lg max-w-none text-right">
                              <p className="text-gray-700 leading-relaxed text-lg">
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
            <div className="mt-20">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                      شارك في الأجر والثواب
                    </h3>
                    
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                      ساهم في دعم هذا المشروع الوقفي واحصل على الأجر المستمر. 
                      كل مساهمة تساعد في تحقيق أهداف خيرية نبيلة.
                    </p>

                    {/* Statistics */}
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">مستمر</div>
                        <p className="text-white/80">أجر وثواب</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">نبيل</div>
                        <p className="text-white/80">هدف خيري</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">مؤثر</div>
                        <p className="text-white/80">تأثير اجتماعي</p>
                      </div>
                    </div>

                    {/* Support Button */}
                    <button
                      onClick={() => navigate('/Contact')}
                      className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-800 rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-bold text-lg group"
                    >
                      <span className="ml-2">دعم المشروع الآن</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Additional Info */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <p className="text-white/70 text-sm">
                        للاستفسارات والمزيد من التفاصيل، يرجى التواصل معنا
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Projects Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  مشاريع أخرى قد تهمك
                </h3>
                <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="text-center">
                <Link
                  to="/Awkaf"
                  className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-all duration-300 group"
                >
                  <span className="ml-2">استكشف المزيد من المشاريع</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};