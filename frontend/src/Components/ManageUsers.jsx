import React, { useEffect, useState } from "react";


import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers(page, pageSize);
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:8000/apif/admin/non-staff-users/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setTotalPages(Math.ceil(data.length / pageSize));
      }
    } catch (error) {
      console.error("Error fetching total pages:", error);
      setTotalPages(1);
    }
  };

  const fetchUsers = async (pageNumber, pageSize) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No authentication token found!");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/apif/admin/non-staff-users/?page=${pageNumber}&page_size=${pageSize}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch users:", response.status);
        return;
      }

      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No authentication token found!");
        return;
      }

      const url = `http://127.0.0.1:8000/apif/admin/delete-user/${userId}/`;
      console.log("DELETE request URL:", url);

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to delete user:", response.status);
        return;
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto  ">
      
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white text-[0.8em] font-medium">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Username</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Created date</th>
              <th className="border border-gray-300 p-2 text-center">Acions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-center text-[0.7em] border border-gray-300 hover:bg-gray-100 transition ">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.date_joined}</td>
                  <td className="p-2  flex justify-center">
                    <button
                      onClick={(e) => { e.preventDefault(); deleteUser(user.id); }}
                      className="px-4 mx-auto py-1 custom-input bg-gray-600 text-white rounded hover:bg-gray-800"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-600">لا يوجد مستخدمون</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5">
              <Pagination >
                            <PaginationContent >
                              {/* Previous Button */}
                              <PaginationItem  >
                                <PaginationPrevious
                                  className={"border-pagin border-1"}
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
                                className={p===page ? "border-pagin  text-pagin bg-gray-300 ":"pagin-btn"}
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
                                className={"border-pagin border-1"}
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
  );
};
