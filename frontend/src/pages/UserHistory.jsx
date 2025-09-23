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
import { Loader } from "../Components/Loader";

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
                   
                    {/* Content */}
                    <div className="bg-white rounded-lg shadow-md">
                        {loading ? (
                          <Loader/> 
                        ) : error ? (
                            <ErrorState />
                        ) : history.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <>
                                {/* Search and Filter */}
                             
                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-green-500 hover:bg-green-500 ">
                                                <TableHead 
                                                    className="text-center font-semibold text-gray-700   transition-colors"
                                                    
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        التاريخ
                                                        
                                                    </div>
                                                </TableHead>
                                                <TableHead 
                                                    className="text-center font-semibold text-gray-700   transition-colors"
                                                   
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        الوعاء الزكوي
                                                        
                                                    </div>
                                                </TableHead>
                                                <TableHead 
                                                    className="text-center font-semibold text-gray-700  transition-colors"
                                                    
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        قيمة الزكاة
                                                        
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
                                                        {new Date(item.calculation_date).toLocaleDateString('fr-FR')}
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