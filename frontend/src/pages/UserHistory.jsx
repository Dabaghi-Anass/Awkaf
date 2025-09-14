import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    useEffect(() => {
        const fetchHistory = async () => {
            const userId = getUserIdFromToken();
            if (!userId) {
                setError("المستخدم غير مصادق عليه");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/apif/get-zakat-history/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("فشل في جلب البيانات");
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    // Calculate totals
    const totalZakatBase = history.reduce((sum, item) => sum + item.zakat_base, 0);
    const totalZakatResult = history.reduce((sum, item) => sum + item.zakat_result, 0);

    // Filter and sort data
    const filteredHistory = history.filter(item =>
        item.month_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.calculation_date.includes(searchTerm)
    );

    const sortedHistory = [...filteredHistory].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedHistory = sortedHistory.slice(startIndex, startIndex + itemsPerPage);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const LoadingSpinner = () => (
        <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <span className="mr-3 text-gray-600">جاري التحميل...</span>
        </div>
    );

    const EmptyState = () => (
        <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد سجل للزكاة</h3>
            <p className="text-gray-500">لم يتم العثور على أي حسابات زكاة سابقة</p>
        </div>
    );

    const ErrorState = () => (
        <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-red-900 mb-2">حدث خطأ</h3>
            <p className="text-red-600">{error}</p>
        </div>
    );

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 mt-20">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 text-right mb-2">
                            تاريخ الزكاة
                        </h1>
                        <p className="text-gray-600 text-right">
                            عرض سجل جميع حسابات الزكاة السابقة
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    {history.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-green-500">
                                <div className="flex items-center justify-between">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-600">إجمالي الوعاء الزكوي</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {totalZakatBase.toLocaleString("fr-FR")} د.ج
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-500">
                                <div className="flex items-center justify-between">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-600">إجمالي الزكاة المدفوعة</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {totalZakatResult.toLocaleString("fr-FR")} د.ج
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-purple-500">
                                <div className="flex items-center justify-between">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-600">عدد العمليات</p>
                                        <p className="text-2xl font-bold text-gray-900">{history.length}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="bg-white rounded-lg shadow-md">
                        {loading ? (
                            <LoadingSpinner />
                        ) : error ? (
                            <ErrorState />
                        ) : history.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <>
                                {/* Search and Filter */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                                        <div className="relative flex-1 max-w-md">
                                            <input
                                                type="text"
                                                placeholder="البحث بنوع الحول أو التاريخ..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-right"
                                            />
                                            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span>عرض {paginatedHistory.length} من {sortedHistory.length} نتيجة</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                                                <TableHead 
                                                    className="text-center font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                                    onClick={() => handleSort('calculation_date')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        التاريخ
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                        </svg>
                                                    </div>
                                                </TableHead>
                                                <TableHead 
                                                    className="text-center font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                                    onClick={() => handleSort('zakat_base')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        الوعاء الزكوي
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                        </svg>
                                                    </div>
                                                </TableHead>
                                                <TableHead 
                                                    className="text-center font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                                                    onClick={() => handleSort('zakat_result')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        قيمة الزكاة
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                        </svg>
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-center font-semibold text-gray-700">
                                                    نوع الحول
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedHistory.map((item, index) => (
                                                <TableRow 
                                                    key={index} 
                                                    className="text-center hover:bg-gray-50 transition-colors border-b border-gray-100"
                                                >
                                                    <TableCell className="font-medium py-4">
                                                        {new Date(item.calculation_date).toLocaleDateString('ar-DZ')}
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
                                                        <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
                                                            {item.month_type}
                                                        </span>
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
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    السابق
                                                </button>
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

export default UserHistory;