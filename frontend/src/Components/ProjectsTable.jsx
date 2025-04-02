import React, { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AdminContext } from "./AdminProvider";


export const ProjectsTable = () => {
  const { activeTab, setActiveTab ,setProjectData,setIsEditing} = useContext(AdminContext);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); // ✅ To navigate to the edit form

  useEffect(() => {
    fetchProjects(page, pageSize);
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/apif/public/waqf-projects/");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTotalPages(Math.ceil(data.length / pageSize));
      }
    } catch (error) {
      console.error("Error fetching total pages:", error);
      setTotalPages(1);
    }
  };

  const fetchProjects = async (pageNumber, pageSize) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/apif/list/waqf-projects/?page=${pageNumber}&page_size=${pageSize}`
      );
      if (!response.ok) {
        console.error("Failed to fetch projects:", response.status);
        return;
      }
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No authentication token found!");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/apif/waqf-projects/${projectId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to delete project:", response.status);
        return;
      }

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEdit = (project) => {
    setProjectData(project);
    setIsEditing(true);
    setActiveTab("ManageProject");

  };

  return (
    <>
      <div className="relative overflow-x-auto flex flex-col items-center text-left  sm:rounded-lg">
        <table className="w-full text-sm text-left text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase  bg-green-800 ">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Project Name</th>
              <th scope="col" className="px-6 py-3">Objectives</th>
              <th scope="col" className="px-6 py-3">Created Date</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="bg-white border-b  hover:bg-gray-100 "
                >
                  <td className="px-6 py-4">{project.id}</td>
                  <td className="px-6 py-4">{project.name}</td>
                  <td className="px-6 py-4">{project.objectives}</td>
                  <td className="px-6 py-4">{project.created_at}</td>
                  <td className="px-6 py-4 space-x-2">
                    {/* ✅ Edit Button */}
                    <button
                      onClick={() => handleEdit(project)}
                      className="bg-green-400 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                    >
                      Edit
                    </button>
                    {/* 🗑 Delete Button */}
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Stack spacing={2} className="mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          className="mx-auto text-center"
        />
      </Stack>
      </div>
      
    </>
  );
};
