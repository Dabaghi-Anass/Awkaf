import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { ZakatContext } from "@/Components/ZakatProvider";
import { MessagePopup } from "@/Components/MessagePopup";
import { ConfirmDialog } from "@/Components/ConfirmDialog";
import { useApi } from "@/ApiProvider";


export const ManageUsers = () => {
  const api = useApi(); //  Use ApiProvider
  const { setPopup, popup } = useContext(ZakatContext);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  useEffect(() => {
    fetchUsers(page, pageSize);
  }, [page]);

  useEffect(() => {
    fetchTotalPages();
  }, []);

  const fetchTotalPages = async () => {
    try {
      //  Use api.get instead of fetch
      const [data, status, error] = await api.get("/admin/non-staff-users/");

      if (!error && Array.isArray(data)) {
        setTotalPages(Math.ceil(data.length / pageSize));
      } else {
        console.error("Error fetching total pages:", error);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching total pages:", err);
      setTotalPages(1);
    }
  };

  const fetchUsers = async (pageNumber, pageSize) => {
    try {
      setIsLoading(true);
      
      //  Use api.get with params
      const [data, status, error] = await api.get("/admin/non-staff-users/", {
        page: pageNumber,
        page_size: pageSize,
      });

      if (!error && status >= 200 && status < 300) {
        setUsers(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch users:", error || status);
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(deleteId)

  const deleteUser = async () => {
    try {
      setIsLoading(true);
    
      //  Use api.delete instead of fetch
      const [data, status, error] = await api.delete(`/admin/delete-user/${deleteId}/`);

      if (error || !(status >= 200 && status < 300)) {
        setPopup({
          message: "Failed to delete user",
          type: "error",
        });
      } else {
        setPopup({
          message: "User deleted successfully",
          type: "success",
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteId));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setPopup({
        message: "Error deleting user",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white text-[0.8em] font-medium">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Username</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Created date</th>
              <th className="border border-gray-300 p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-center text-[0.7em] border border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.date_joined}</td>
                  <td className="p-2 flex justify-center">
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      disabled={isLoading}
                      className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
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
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
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
                  className={p === page ? "border-pagin text-pagin bg-gray-300" : "pagin-btn"}
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

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={deleteUser}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user?"
        confirmText="delete"
        cancelText="cancel"
        dir="ltr"
      />

      <MessagePopup
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </>
  );
};