import React, { createContext, useState, useEffect } from "react";

export const ZakatContext = createContext();

export const ZakatProvider = ({ children }) => {
    const initialZakatData = {
        /*created_at: new Date().toISOString().split("T")[0],*/
        /*nisab: 800000,*/
    };

    const [zakatFormInfos, setZakatFormInfos] = useState(initialZakatData);
    const [isUnnaire, setIsUnnaire] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Update form fields dynamically when company type changes
    useEffect(() => {
        console.log("Selected company:", selectedCompany);
        if (selectedCompany) {
            const initialData = { zakatAmount: 0 };
        selectedCompany.fields.forEach(field => {
            initialData[field] = ""; // ✅ field is a string, directly use it as a key
        });
            setZakatFormInfos(initialData);
        }
    }, [selectedCompany]);
    

    const saveZakatHistory = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Authentication required! Please log in.");
            return;
        }

        const zakatData = {
            ...zakatFormInfos,
            created_at: new Date().toISOString().split("T")[0], // YYYY-MM-DD
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

            alert("Zakat history saved successfully!");
            setZakatFormInfos(initialZakatData);
            setTotalAmount(0);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    
    const calculateZakat = async () => {
        const token = localStorage.getItem("accessToken");
    
        if (!token || !selectedCompany) {
            alert("Please select a company type and log in.");
            return;
        }
    
        console.log("Raw zakatFormInfos:", zakatFormInfos);
    
        const cleanedInputs = {};
        Object.entries(zakatFormInfos).forEach(([key, value]) => {
            if (key && key !== "zakatAmount") { 
                cleanedInputs[key] = !isNaN(value) && value !== "" ? Number(value) : 0;
            }
        });
        console.log("Final Cleaned Inputs:", cleanedInputs);
    
        try {
            console.log("Sending request:", {
                company_type_id: selectedCompany.id,
                user_inputs: cleanedInputs,
                moon: isUnnaire ? 2.5 : 2.57,
            });
    
            const response = await fetch("http://localhost:8000/apif/calculate-zakat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    company_type_id: selectedCompany.id,
                    user_inputs: cleanedInputs,
                    moon: isUnnaire ? 2.5 : 2.57,
                }),
            });
    
            const data = await response.json();
            console.log("Backend Response:", data);
            setZakatFormInfos(prevState => ({
                ...prevState,
                zakatAmount: data.zakat_amount
            }));
            console.log("Updated zakatFormInfos:", zakatFormInfos);
            
    
            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error("Failed to calculate Zakat");
            }
    
            // ✅ Add `totalAmount` and `date`
            const calculationDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    
            setZakatFormInfos(prevState => ({
                ...prevState,
                zakatAmount: data.zakat_amount,  // Received from backend
                totalAmount: data.total_amount,  // New field from backend
                calculationDate: calculationDate, // Add the date of calculation
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
            isEditing, setIsEditing,
            totalAmount, setTotalAmount,
            selectedCompany, setSelectedCompany
        }}>
            {children}
        </ZakatContext.Provider>
    );
};
