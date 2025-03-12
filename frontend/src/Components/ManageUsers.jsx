import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [pageSize] = useState(10); // Fixed page size
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages
 
  useEffect(() => {
    fetchUsers(page, pageSize);
  }, [page]); // Re-fetch users when page changes

  useEffect(() => {
    fetchTotalPages();
  }, []);


  const fetchTotalPages = async () => {
    try {
      const token = localStorage.getItem("accessToken"); 
      const response = await fetch(`http://127.0.0.1:8000/apif/admin/non-staff-users/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Fetched users:", data);
      if (Array.isArray(data)) {
        const totalUsers = data.length; // Get total number of users
        const pages = Math.ceil(totalUsers / 10); // Calculate total pages
        setTotalPages(pages);
      }
    } catch (error) {
      console.error('Error fetching total pages:', error);
      setTotalPages(1);
    }
  };
  const fetchUsers = async (pageNumber, pageSize) => {
    try {
      const token = localStorage.getItem("accessToken"); // Get token from storage
      if (!token) {
        console.error("No authentication token found!");
        return;
      }
  
      const response = await fetch(
        `http://127.0.0.1:8000/apif/admin/non-staff-users/?page=${pageNumber}&page_size=${pageSize}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in headers
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        console.error("Failed to fetch users:", response.status);
        return;
      }
  
      const data = await response.json();
      console.log("Fetched users:", data);
      
      if (Array.isArray(data)) {
        setUsers(data);
        
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("accessToken"); // Ensure token is included
      if (!token) {
        console.error("No authentication token found!");
        return;
      }
  
      const response = await fetch(
        `http://127.0.0.1:8000/apif/admin/delete-user/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );
  
      if (!response.ok) {
        console.error("Failed to delete user:", response.status);
        return;
      }
  
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  return (
    <div className="flex flex-col items-center">
      <TableContainer component={Paper} className="rounded-lg shadow-md w-[80em]">
        <Table className="min-w-full">
          <TableHead>
            <TableRow className="bg-green-700 text-white">
              <TableCell className="text-white font-bold">ID</TableCell>
              <TableCell className="text-white font-bold">Name</TableCell>
              <TableCell className="text-white font-bold">Email</TableCell>
              <TableCell className="text-white font-bold">Role</TableCell>
              <TableCell className="text-white font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-100 transition duration-300">
                  <TableCell className="border p-0">{user.id}</TableCell>
                  <TableCell className="border p-0">{user.username}</TableCell>
                  <TableCell className="border p-0">{user.email}</TableCell>
                  <TableCell className="border p-0">{user.role}</TableCell>
                  <TableCell className="border p-0">
                    <Button variant="contained" color="error" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} className="mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </div>
  );
};
