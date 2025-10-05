import { useState, useEffect } from "react";

import {Loader} from "../../Components/Loader"
import { Header } from "../../Components/Header";
import Project from "../../Components/Project";
import WakfPic from "../../Components/WakfPic";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import Footer from "../../Components/Footer";
import { MessagePopup } from "@/Components/MessagePopup";


export default function Awkaf() {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState("");
  const projectPerPage = 9;
  const pagesVisited = pageNumber * projectPerPage;
  const [popup, setPopup] = useState({ message: "", type: "" });
  const displayProjects = projects.slice(pagesVisited, pagesVisited + projectPerPage);
  const pageCount = Math.ceil(projects.length / projectPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Fetch projects from the backend
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/apif/public/waqf-projects/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
       
        throw new Error("Failed to fetch projects");
      }

      setProjects(data);
    } catch (error) {
     setPopup({message:"حدث خطاء",type:"error"})
      
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Header />
     
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
            {displayProjects.map((project, id) => (
              <Project key={id} project={project} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
         {/* Pagination */}
<div className="flex justify-center mt-6">
  <Pagination>
    <PaginationContent>
      {/* Previous Button */}
      <PaginationItem>
        <PaginationPrevious
          href="#"
          className="bg-white "
          onClick={(e) => {
            e.preventDefault();
            if (pageNumber > 0) setPageNumber(pageNumber - 1);
          }}
        />
      </PaginationItem>

      {/* Page Numbers */}
      {Array.from({ length: pageCount }, (_, i) => i).map((p) => (
        <PaginationItem key={p}>
          <PaginationLink
            href="#"
            isActive={p === pageNumber}
            className={p === pageNumber ? " bg-green4 text-white border-0 hover:bg-green4 hover:text-white" : "bg-white"}
            onClick={(e) => {
              e.preventDefault();
              setPageNumber(p);
            }}
          >
            {p + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      {/* Next Button */}
      <PaginationItem>
        <PaginationNext
          href="#"
          className="bg-white"
          onClick={(e) => {
            e.preventDefault();
            if (pageNumber < pageCount - 1) setPageNumber(pageNumber + 1);
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
      <Footer />
    </>
  );
}
