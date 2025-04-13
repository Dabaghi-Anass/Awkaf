import { useState, useEffect } from "react";

import { Header } from "../Components/Header";
import Project from "../Components/Project";
import WakfPic from "../Components/WakfPic";
import ReactPaginate from "react-paginate";

import Footer from "../Components/Footer";

export default function Awkaf() {
  const [projects, setProjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const projectPerPage = 9;
  const pagesVisited = pageNumber * projectPerPage;

  const displayProjects = projects.slice(pagesVisited, pagesVisited + projectPerPage);
  const pageCount = Math.ceil(projects.length / projectPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Fetch projects from the backend
  const fetchProjects = async () => {
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
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      {/* Header & Hero Section */}
      <Header />
      <WakfPic />

      {/* Projects Section */}
      <div className="bg-green-300 py-6 mt-20">
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
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="pagination flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md"
            previousLinkClassName="pagination-btn bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-2 rounded"
            nextLinkClassName="pagination-btn bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-2 rounded"
            disabledClassName="pagination-disabled text-gray-400"
            activeClassName="pagination-active bg-green-500 text-white px-3 py-2 rounded"
          />
        </div>
      </div>

      {/* Yellow Divider */}
      <div className="flex justify-center my-8">
        <div className="w-24 h-1 bg-yellow-500"></div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
