import React, { useState, useEffect, useContext } from "react";
import { useApi } from "@/ApiProvider";
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
import { Link, Outlet } from "react-router-dom";

const UserHistory = () => {
  const api = useApi();
  const { setPopup, popup } = useContext(ZakatContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const getUserIdFromToken = async () => {
    try {
      const [data,status,error] = await api.get("/me/");

      if (error) throw new Error("فشل تحميل معلومات المستخدم.")

      const userData = await data;
      return userData.id;
    } catch (err) {
      setPopup({ message: "حدث خطأ أثناء جلب بيانات المستخدم", type: "error" });
      return null;
    }
  };

  const fetchHistory = async (page = 1) => {
    const userId = await getUserIdFromToken();
    if (!userId) {
      setError("المستخدم غير مصادق عليه");
      return;
    }

    setLoading(true);
    setError(null);

    const [data, status, error] = await api.get(
      `/get-zakat-history/${userId}/`,
      { page }
    );

    if (!error && status === 200) {
      if (data.message && !data.results) {
        setHistory([]);
        setError(null);
        setTotalPages(1);
      } else {
        setHistory(data.results || []);
        setTotalPages(Math.ceil((data.count || 1) / 10));
        setError(null);
      }
    } else {
      console.error("Error fetching history:", error);
      setError(error || data?.detail || "فشل في جلب البيانات");
      setHistory([]);
    }

    setLoading(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      const [data, status, error] = await api.delete(
        `/delete-zakat-history/${deleteId}/`
      );

      if (error || !(status >= 200 && status < 300)) {
        setPopup({
          message: error || data?.detail || "فشل في حذف السجل",
          type: "error",
        });
      } else {
        setPopup({
          message: "تم حذف السجل بنجاح",
          type: "success",
        });

        fetchHistory();
      }
    } catch (err) {
      console.error("Error deleting zakat history:", err);
      setPopup({
        message: err.message || "خطأ في حذف السجل",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  const EmptyState = () => (
    <div className="text-center py-8 md:py-12 px-4">
      <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 md:w-12 md:h-12 text-gray-400"
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
      <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
        لا يوجد سجل للزكاة
      </h3>
      <p className="text-sm md:text-base text-gray-500">لم يتم العثور على أي حسابات زكاة سابقة</p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-8 md:py-12 px-4">
      <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 md:w-12 md:h-12 text-red-400"
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
      <h3 className="text-base md:text-lg font-medium text-red-900 mb-2">حدث خطأ</h3>
      <p className="text-sm md:text-base text-red-600">{error}</p>
    </div>
  );

  return (
    <>
      <div dir="rtl" className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 mt-12 md:mt-15">
          {/* Header */}
          <div className="mb-6 md:mb-8 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-start gap-4">
            <Link
              to="/zakat-corps-history"
              className="text-xs sm:text-sm px-3 sm:px-4 py-2 bg-green4 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 whitespace-nowrap text-center"
            >
              سجل المحاصيل
            </Link>
            <div className="text-right">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                تاريخ الزكاة
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                عرض سجل جميع حسابات الزكاة السابقة
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="py-8 md:py-12">
                <Loader />
              </div>
            ) : error ? (
              <EmptyState />
            )  : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-green4 hover:bg-green4">
                        <TableHead className="text-center font-semibold text-white py-3 px-4 text-sm">
                          التاريخ
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white py-3 px-4 text-sm">
                          الوعاء الزكوي
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white py-3 px-4 text-sm">
                          قيمة الزكاة
                        </TableHead>
                        <TableHead className="text-center font-semibold text-white py-3 px-4 text-sm">
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
                          <TableCell className="font-medium py-4 text-sm">
                            {new Date(item.calculation_date).toLocaleDateString(
                              "fr-FR"
                            )}
                          </TableCell>
                          <TableCell className="py-4 text-sm">
                            <span className="font-semibold text-green-600">
                              {item.zakat_base.toLocaleString("fr-FR")} د.ج
                            </span>
                          </TableCell>
                          <TableCell className="py-4 text-sm">
                            <span className="font-semibold text-blue-600">
                              {item.zakat_result.toLocaleString("fr-FR")} د.ج
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <button
                              onClick={() => handleDeleteClick(item.id)}
                              className="px-3 py-1 bg-green3 text-white rounded text-sm hover:bg-red-600 transition-colors"
                            >
                              حذف
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 p-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-600 text-sm font-medium">التاريخ</span>
                          <span className="font-semibold text-gray-900">
                            {new Date(item.calculation_date).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-600 text-sm font-medium">الوعاء الزكوي</span>
                          <span className="font-semibold text-green-600">
                            {item.zakat_base.toLocaleString("fr-FR")} د.ج
                          </span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-600 text-sm font-medium">قيمة الزكاة</span>
                          <span className="font-semibold text-blue-600">
                            {item.zakat_result.toLocaleString("fr-FR")} د.ج
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="w-full px-3 py-2 bg-green3 text-white rounded text-sm hover:bg-red-600 transition-colors mt-2"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                        صفحة {currentPage} من {totalPages}
                      </div>
                      <div className="flex gap-2 justify-center sm:justify-end">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                          className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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