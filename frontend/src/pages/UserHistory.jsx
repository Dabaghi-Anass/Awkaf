import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import Footer from "../Components/Footer";

const UserHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError("User not authenticated.");
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

                if (!response.ok) throw new Error("Failed to fetch history");
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

    return (
       <>
        <Header></Header>
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            
            <h2 className="text-2xl font-bold text-green-900 text-center mb-4">تاريخ حسابات الزكاة</h2>
            {loading ? (
                <p className="text-center text-gray-600">جاري التحميل...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : history.length === 0 ? (
                <p className="text-center text-gray-600">لا يوجد سجل للزكاة</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-green-100">
                            <th className="border border-gray-300 p-2">التاريخ</th>
                            <th className="border border-gray-300 p-2">الوعاء الزكوي</th>
                            <th className="border border-gray-300 p-2">قيمة الزكاة</th>
                            <th className="border border-gray-300 p-2">التفاصيل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index} className="text-center border border-gray-300">
                                <td className="p-2">{item.calculation_date}</td>
                                <td className="p-2">{item.zakat_base.toLocaleString("fr-FR")} د.ج</td>
                                <td className="p-2 text-green-700 font-bold">{item.zakat_result.toLocaleString("fr-FR")} د.ج</td>
                                <td className="p-2">
                                    <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        عرض
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        <Footer></Footer>
       </>
    );
};

export default UserHistory;
