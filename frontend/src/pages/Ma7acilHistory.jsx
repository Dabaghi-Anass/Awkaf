import React, { useState, useEffect } from "react";

// Mock components - replace with your actual imports
const Header = () => <div className="bg-emerald-600 text-white p-4 text-center font-bold">Header</div>;
const Footer = () => <div className="bg-gray-800 text-white p-4 text-center mt-8">Footer</div>;
const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
  </div>
);

const Ma7acilHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = JSON.parse(atob(base64));
      return jsonPayload.user_id;
    } catch (error) {
      console.error("Error decoding token:", error);
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
        `http://127.0.0.1:8000/apif/get-ma7acil/${userId}/?page=${page}`,
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

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذا السجل؟")) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/apif/delete-ma7acil/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) throw new Error("فشل في حذف السجل");

      fetchHistory(currentPage);
    } catch (err) {
      alert(err.message);
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
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8 mt-15">
          {/* Header */}
          <div className="mb-8 text-right">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              تاريخ المحاصيل
            </h1>
            <p className="text-gray-600">
              عرض سجل جميع المحاصيل الزراعية السابقة
            </p>
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
                              onClick={() => handleDelete(item.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
      <Footer />
    </>
  );
};

export default Ma7acilHistory;