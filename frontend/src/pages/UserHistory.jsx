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
} from "@/components/ui/table"
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
        <div className="  mx-auto mt-25 p-6 bg-white  ">
            
           
            {loading ? (
                <p className="text-center text-gray-600">جاري التحميل...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : history.length === 0 ? (
                <p className="text-center text-gray-600">لا يوجد سجل للزكاة</p>
            ) : (
                  <Table className={"mt-4 w-[50em] mx-auto "}>
                   
                    <TableHeader>
                        <TableRow className={"bg-green-400 hover:bg-green-400 text-[1.2em] "}>
                        <TableHead className="  text-center">التاريخ</TableHead>
                        <TableHead className="text-center">الوعاء الزكوي</TableHead>
                        <TableHead className="  text-center">قيمة الزكاة</TableHead>
                        <TableHead className="text-center">نوع الحول</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((item, index) => (
                                        
                        <TableRow key={index}  className="text-center row-table  ">
                        <TableCell className="font-medium">{item.calculation_date}</TableCell>
                        <TableCell>{item.zakat_base.toLocaleString("fr-FR")} د.ج</TableCell>
                        <TableCell>{item.zakat_result.toLocaleString("fr-FR")} د.ج</TableCell>
                        <TableCell className="text-right">{item.month_type}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
        <Footer></Footer>
       </>
    );
};

export default UserHistory;
