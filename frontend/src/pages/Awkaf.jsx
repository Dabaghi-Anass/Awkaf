import { useState, useEffect } from "react";
import {Loader} from "../Components/Loader";
import { Header } from "../Components/Header";
import Project from "../Components/Project";
import WakfPic from "../Components/WakfPic";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import Footer from "../Components/Footer";

export default function Awkaf() {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState("");
  const projectPerPage = 9;
  const pagesVisited = pageNumber * projectPerPage;

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
        console.error("Backend error:", data);
        throw new Error("Failed to fetch projects");
      }

      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Failed to fetch projects");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      {loading ? <Loader/> :(
       <WakfPic />
      ) }
      

      {/* Projects Section */}
      <div className="bg-gray-300 py-6 mt-20">
        <div className="container mx-auto px-4 ">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">مشاريع الوقف</h2>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
            className={p === pageNumber ? " bg-green-500 text-white border-0 hover:bg-green-500 hover:text-white" : "bg-white"}
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

      <Footer />
    </>
  );
}
