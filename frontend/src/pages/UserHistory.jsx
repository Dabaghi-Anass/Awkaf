import React, { useState, useEffect,useContext } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "../Components/Loader";
import { MessagePopup } from "@/Components/MessagePopup";
import { ConfirmDialog } from "@/Components/ConfirmDialog";
import { ZakatContext } from "@/Components/ZakatProvider";
import { Link ,Outlet} from "react-router-dom";

// Confirmation Modal Component


const UserHistory = () => {
  const {setPopup, popup } = useContext(ZakatContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = JSON.parse(atob(base64));
      return jsonPayload.user_id;
    } catch (error) {
      setPopup({ message: "حدث خطاء", type: "error" });
      return null;
    }
  };

  const fetchHistory = async (page = 1) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("المستخدم غير مصادق عليه");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/apif/get-zakat-history/${userId}/?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("فشل في جلب البيانات");
      const data = await response.json();
      setHistory(data.results || []);
      setTotalPages(Math.ceil((data.count || 1) / 10));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/apif/delete-zakat-history/${deleteId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("فشل في حذف السجل")
      else {
        setPopup({ message: "تم حذف السجل بنجاح", type: "success" });
      }
      
      // Refresh list
     
    } catch (err) {
      setPopup({ message: err.message, type: "error" });
    }
  };

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        لا يوجد سجل للزكاة
      </h3>
      <p className="text-gray-500">لم يتم العثور على أي حسابات زكاة سابقة</p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-red-900 mb-2">حدث خطأ</h3>
      <p className="text-red-600">{error}</p>
    </div>
  );

  return (
    <>
      <Header />
      <div dir="rtl" className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8 mt-15">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
              تاريخ الزكاة
            </h1>
            <p className="text-gray-600">
              عرض سجل جميع حسابات الزكاة السابقة
            </p>
            </div>
           <Link to="/zakat-corps-history" className="text-sm decoration-green-500 underline text-green4">عرض سجل المحاصيل</Link>
          </div>
          

          <div className="bg-white rounded-lg shadow-md">
            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorState />
            ) : history.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {/* Table */}
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-green4 hover:bg-green4">
                        <TableHead className="text-center font-semibold text-white">
                          التاريخ
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white">
                          الوعاء الزكوي
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white">
                          قيمة الزكاة
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white">
                          حذف
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow
                          key={item.id}
                          className="text-center hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <TableCell className="font-medium py-4">
                            {new Date(item.calculation_date).toLocaleDateString(
                              "fr-FR"
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="font-semibold text-green-600">
                              {item.zakat_base.toLocaleString("fr-FR")} د.ج
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="font-semibold text-blue-600">
                              {item.zakat_result.toLocaleString("fr-FR")} د.ج
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <button
                              onClick={() => handleDeleteClick(item.id)}
                              className="px-3 py-1 bg-green3 text-white rounded hover:bg-red-600 transition-colors"
                            >
                              حذف
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        صفحة {currentPage} من {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          السابق
                        </button>
                        <button
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          التالي
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد أنك تريد حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="حذف"
        cancelText="إلغاء"
      />
      <MessagePopup
              message={popup.message}
              type={popup.type}
              onClose={() => setPopup({ message: "", type: "" })}
            />
            
    </>
  );
};

export default UserHistory;