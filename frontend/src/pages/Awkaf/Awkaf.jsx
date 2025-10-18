import { useState, useEffect } from "react";
import { Loader } from "../../Components/Loader";
import Project from "../../Components/Project";
import { useApi } from "@/ApiProvider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MessagePopup } from "@/Components/MessagePopup";
import { AlertCircle } from "lucide-react";

export default function Awkaf() {
  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects(page, pageSize);
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = async () => {
    try {
      const [data, status, err] = await api.get("/list/waqf-projects/");

      if (err) {
        setError("فشل تحميل المشاريع");
        setTotalPages(1);
        return;
      }

      if (Array.isArray(data)) {
        setTotalPages(Math.ceil(data.length / pageSize));
        setError(null);
      } else {
        setError("تنسيق البيانات غير صحيح");
        setTotalPages(1);
      }
    } catch (e) {
      console.error("Error fetching total pages:", e);
      setError("حدث خطأ أثناء تحميل المشاريع");
      setTotalPages(1);
    }
  };

  const fetchProjects = async (pageNumber, pageSize) => {
    try {
      setIsLoading(true);
      const [data, status, err] = await api.get("/list/waqf-projects/", {
        page: pageNumber,
        page_size: pageSize,
      });

      if (err) {
        setError("فشل تحميل المشاريع");
        setProjects([]);
        return;
      }

      if (Array.isArray(data)) {
        setProjects(data);
        setError(null);
      } else {
        setError("تنسيق البيانات غير صحيح");
        setProjects([]);
      }
    } catch (e) {
      console.error("Error fetching projects:", e);
      setError("حدث خطأ أثناء تحميل المشاريع");
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700 text-white py-16 mt-15 max-sm:py-8">
        <div className="mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-sm:text-2xl">
            مشاريع الوقف
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto max-sm:text-sm">
            استثمر في الأجر الجاري وساهم في بناء مستقبل أفضل للأجيال القادمة
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-gray-300 py-6">
        <div className="container mx-auto px-4">
          {/* Error State */}
          {error && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 font-semibold mb-1">حدث خطأ</h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setPage(1);
                    fetchTotalPages();
                  }}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  حاول مجددا
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !error && (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          )}

          {/* Empty State (No Projects) */}
          {!isLoading && !error && projects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <AlertCircle className="w-16 h-16 mx-auto opacity-40" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                لا توجد مشاريع متاحة
              </h3>
              <p className="text-gray-600 mb-6">
                عذراً، لم نتمكن من العثور على أي مشاريع وقف في الوقت الحالي
              </p>
              <button
                onClick={() => {
                  setPage(1);
                  fetchTotalPages();
                }}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                تحديث الصفحة
              </button>
            </div>
          )}

          {/* Project Grid */}
          {!isLoading && !error && projects.length > 0 && (
            <>
              <div className="grid max-md:grid-cols-2 max-lg:grid-cols-3 max-sm:grid-cols-1 grid-cols-4 max-[515px]:grid-cols-1 gap-4">
                {projects.map((project, id) => (
                  <Project key={id} project={project} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                      <PaginationPrevious
                        className="bg-white"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                      />
                    </PaginationItem>

                    {/* Render page numbers dynamically */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <PaginationItem key={p}>
                          <PaginationLink
                            className={
                              p === page
                                ? "bg-green4 text-white hover:bg-green4 hover:text-white"
                                : "bg-white"
                            }
                            href="#"
                            isActive={p === page}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(p);
                            }}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    {/* Next Button */}
                    <PaginationItem>
                      <PaginationNext
                        className="bg-white"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Yellow Divider */}
      <div className="flex justify-center my-8">
        <div className="w-24 h-1 bg-green-500"></div>
      </div>

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
}