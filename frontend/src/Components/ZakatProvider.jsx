import React, { createContext, useState, useEffect } from "react";
import { useApi } from "@/ApiProvider";
export const ZakatContext = createContext();

export const ZakatProvider = ({ children }) => {
    
const api = useApi();
const [nissab, setNissab] = useState(null);
const [zakatFormInfos, setZakatFormInfos] = useState();
const [isUnnaire, setIsUnnaire] = useState(false);
const [showResult, setShowResult] = useState(false);
const [totalAmount, setTotalAmount] = useState(0);
const [selectedCompany, setSelectedCompany] = useState(null);
const [isLoading,setIsLoading]=useState('');
const [popup,setPopup]=useState({message:'',type:''});
// Update form fields dynamically when company type changes
useEffect(() => {
    if (selectedCompany && Array.isArray(selectedCompany.fields)) {
        const extractLeafFields = (nodes) => {
            return nodes.flatMap(field =>
                field.children && field.children.length > 0
                    ? extractLeafFields(field.children)
                    : [field]
            );
        };

        const leafFields = extractLeafFields(selectedCompany.fields);
        const initialValues = Object.fromEntries(leafFields.map(field => [field.name, ""]));
        setZakatFormInfos(initialValues);
    }
}, [selectedCompany]);


    

    const saveZakatHistory = async () => {
         const zakatData = {
            zakat_result:zakatFormInfos.zakatAmount,
            zakat_base:zakatFormInfos.totalAmount,
            calculation_date: zakatFormInfos.calculationDate,
            nissab:nissab
        };
    const [data, status, error] = await api.post("/save-zakat-history/", zakatData);

    if (error) {
      console.error("Error:", error);
      setPopup({ message: "حدث خطأ أثناء الحفظ", type: "error" });
    } else {
      setPopup({ message: "تم حفظ الزكاة بنجاح!", type: "success" });
      setZakatFormInfos({});
      setShowResult(false);
    }
  };
    
        {/*
        try {
            const response = await fetch("http://localhost:8000/apif/save-zakat-history/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(zakatData),
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error("Failed to save Zakat history");
            }

            setPopup({message:"تم حفظ الزكاة بنجاح!",type:"success"});
            setZakatFormInfos({});
            setShowResult(false);
          
        } catch (error) {
            console.error("Error:", error);
           setPopup({message:"حدث خطاء",type:"error"})
        } */}
    

    return (
        <ZakatContext.Provider value={{ 
            zakatFormInfos, setZakatFormInfos, 
            isUnnaire, setIsUnnaire, 
           
            showResult, setShowResult,
            saveZakatHistory, 
            isLoading, setIsLoading,
            totalAmount, setTotalAmount,
            selectedCompany, setSelectedCompany,
            nissab,setNissab,
            popup,setPopup
        }}>
            {children}
        </ZakatContext.Provider>
    );
};
