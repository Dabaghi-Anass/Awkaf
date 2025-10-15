import { useState, useEffect } from "react";

import {Loader} from "../../Components/Loader"

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
} from "@/components/ui/pagination"

import { MessagePopup } from "@/Components/MessagePopup";


export default function Awkaf() {

  const api = useApi();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [popup, setPopup] = useState({ message: "", type: "" });
  
  
  
  useEffect(() => {
     fetchProjects(page, pageSize);
   }, [page]);

 
   
   useEffect(() => {
     fetchTotalPages();
   }, []);
 
   const fetchTotalPages = async () => {
    const [data, status, error] = await api.get("/list/waqf-projects/");

    if (!error && Array.isArray(data)) {
      setTotalPages(Math.ceil(data.length / pageSize));
    } else {
      console.error("Error fetching total pages:", error);
      setTotalPages(1);
    }
  };
   
   
   const fetchProjects = async (pageNumber, pageSize) => {
    const [data, status, error] = await api.get("/list/waqf-projects/", {
      page: pageNumber,
      page_size: pageSize,
    });

    if (!error && Array.isArray(data)) {
      setProjects(data);
    } else {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };
   

  return (
    <>
     
     
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-700  text-white py-16 mt-15
      max-sm:py-8">
        <div className=" mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-sm:text-2xl">مشاريع الوقف</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto max-sm:text-sm">
            استثمر في الأجر الجاري وساهم في بناء مستقبل أفضل للأجيال القادمة
          </p>
         
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-gray-300 py-6 ">
        <div className="container mx-auto px-4 ">

          {/* Project Grid */}
          <div className="grid  max-md:grid-cols-2 max-lg:grid-cols-3 max-sm:grid-cols-1 grid-cols-4 max-[515px]:grid-cols-1 gap-4 ">
            {projects.map((project, id) => (
              <Project key={id} project={project} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
         {/* Pagination */}
<div className="flex justify-center mt-6">
   <Pagination >
                <PaginationContent >
                  {/* Previous Button */}
                  <PaginationItem  >
                    <PaginationPrevious
                      className={"bg-white"}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                    />
                </PaginationItem>
  
              {/* Render page numbers dynamically */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    className={p===page ? "bg-green4 text-white hover:bg-green4 hover:text-white":"bg-white"}
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
              ))}
  
           {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    className={"bg-white"}
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
