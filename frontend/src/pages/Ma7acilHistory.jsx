import { MessagePopup } from "@/Components/MessagePopup";
import React, { useState, useEffect ,useContext} from "react";
import { ZakatContext } from "@/Components/ZakatProvider";

import { Loader } from "@/Components/Loader";
import { ConfirmDialog } from "@/Components/ConfirmDialog";
import { useApi } from "@/ApiProvider";
import { Link } from "react-router-dom";



const Ma7acilHistory = () => {

  const api = useApi();

  const {setPopup, popup } = useContext(ZakatContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const getUserIdFromToken = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/apif/me/", {
      method: "GET",
      credentials: "include", // ✅ send cookies automatically
    });

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    const userData = await response.json();
    return userData.id; // or userData.user_id depending on your backend response
  } catch (error) {
    setPopup({ message: "حدث خطأ أثناء جلب بيانات المستخدم", type: "error" });
    return null;
  }
};
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };


  const fetchHistory = async (page = 1) => {
    const userId = await getUserIdFromToken();
    if (!userId) {
      setError("المستخدم غير مصادق عليه");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {

      const [data,status, error] = await api.get(`/get-ma7acil/${userId}/?page=${page}`);
      if (error) throw new Error(error);
      setHistory(data.results || []);
      setTotalPages(Math.ceil((data.count || 1) / 10));
    

    }catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
   

   try {
    
    
    const [data, status, error] = await api.delete(
      `/delete-ma7acil/${deleteId}/`
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
        لا يوجد سجل للمحاصيل
      </h3>
      <p className="text-gray-500">لم يتم العثور على أي محاصيل زراعية سابقة</p>
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
    
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8 mt-15">
          {/* Header */}
          <div className="mb-8 text-right flex justify-between items-center">
            <Link to="/userHistory" className="text-sm px-4 py-2 bg-green4 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">العودة</Link>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
              تاريخ المحاصيل
            </h1>
            <p className="text-gray-600">
              عرض سجل جميع المحاصيل الزراعية السابقة
            </p>
            </div>
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
                  <table className="w-full">
                    <thead>
                      <tr className="bg-green4 hover:bg-green4">
                        <th className="text-center font-semibold text-white py-3 px-4">
                          التاريخ
                        </th>
                        <th className="text-center font-semibold text-white py-3 px-4">
                          نوع المحصول
                        </th>
                        <th className="text-center font-semibold text-white py-3 px-4">
                          الكمية الإجمالية
                        </th>
                        <th className="text-center font-semibold text-white py-3 px-4">
                          قيمة الزكاة
                        </th>
                        <th className="text-center font-semibold text-white py-3 px-4">
                          حذف
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item) => (
                        <tr
                          key={item.id}
                          className="text-center hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <td className="font-medium py-4">
                            {new Date(item.date).toLocaleDateString("fr-FR")}
                          </td>
                          <td className="py-4">
                            <span className="font-semibold text-green-600">
                              {item.corp_type}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="font-semibold text-green-600">
                              {item.total_amount.toLocaleString("fr-FR")} كغ
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="font-semibold text-blue-600">
                              {item.zakat_amount.toLocaleString("fr-FR")} كغ
                            </span>
                          </td>
                          <td className="py-4">
                            <button
                              onClick={() => handleDeleteClick(item.id)}
                              className="px-3 py-1 bg-green3 text-white rounded hover:bg-red-600 transition-colors"
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Ma7acilHistory;