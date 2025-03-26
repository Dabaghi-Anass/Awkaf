import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
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
      <div className="relative overflow-x-auto flex flex-col items-center text-left shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left text-gray-900 bg-white rounded-lg shadow-md">
          {/* Table Header */}
          <thead className="text-xs uppercase bg-[#035116] text-white rounded-t-lg">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Created Date</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b hover:bg-[#e6f5ea] transition-all"
                >
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.date_joined}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={(e) => { e.preventDefault(); deleteUser(user.id); }}
                      className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-md transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
  <Stack spacing={2} className="flex">
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, value) => setPage(value)}
      variant="outlined"
      shape="rounded-2xl"
      sx={{
        "& .MuiPaginationItem-root": {
          color: "#035116",  // Text color
          borderColor: "#035116", // Border color
        },
        "& .MuiPaginationItem-root:hover": {
          backgroundColor: "#e6f5ea",  // Hover effect (light green)
        },
        "& .Mui-selected": {
          backgroundColor: "#035116 !important",
          color: "white !important",
        },
      }}
    />
  </Stack>
</div>

    </>
  );
};
