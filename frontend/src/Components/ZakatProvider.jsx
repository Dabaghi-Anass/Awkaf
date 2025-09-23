import React, { createContext, useState, useEffect } from "react";

export const ZakatContext = createContext();

export const ZakatProvider = ({ children }) => {
    
    
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
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Authentication required! Please log in.");
            return;
        }

        const zakatData = {
            zakat_result:zakatFormInfos.zakatAmount,
            zakat_base:zakatFormInfos.totalAmount,
            calculation_date: zakatFormInfos.calculationDate,
            month_type: isUnnaire ? "هجري" : "ميلادي",
            nissab:nissab
           
        };

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
        }
    };

    
    const calculateZakat = async () => {
        const token = localStorage.getItem("accessToken");
    
        if (!token || !selectedCompany) {
            setPopup({ message: "Authentication required! Please log in.", type: "error" });
            return;
        }
    
       
    
        const cleanedInputs = {};
        Object.entries(zakatFormInfos).forEach(([key, value]) => {
            if (key && key !== "zakatAmount") { 
                cleanedInputs[key] = !isNaN(value) && value !== "" ? Number(value) : 0;
            }
        });
        console.log("Final Cleaned Inputs:", cleanedInputs);
    
        try {
            
    
            const response = await fetch("http://localhost:8000/apif/calculate-zakat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    company_type_id: selectedCompany.id,
                    user_inputs: cleanedInputs,
                    moon: isUnnaire ? 0.025 : 0.0257,
                    nissab:nissab,
                }),
            });
    
            const data = await response.json();
            console.log("Backend Response:", data);
            
            
    
            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error("Failed to calculate Zakat");
            }
    
            // ✅ Add `totalAmount` and `date`
            const calculationDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    
            setZakatFormInfos(prevState => ({
                ...prevState,
                zakatAmount: data.zakat_result.toFixed(3),  // Received from backend
                totalAmount: data.zakat_base.toFixed(3),  // New field from backend
                calculationDate: calculationDate,
                 // Add the date of calculation
            }));
            
    
            setShowResult(true);
            console.log("resuelt", showResult);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    
    

    return (
        <ZakatContext.Provider value={{ 
            zakatFormInfos, setZakatFormInfos, 
            isUnnaire, setIsUnnaire, 
            calculateZakat, 
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
