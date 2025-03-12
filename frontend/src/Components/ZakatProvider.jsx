import React, { createContext, useState } from "react";

export const ZakatContext = createContext();

export const ZakatProvider = ({ children }) => {
    const initialZakatData = {
        liquidites: "",
        stocks: "",
        investissements: "",
        bienLocation: "",
        creancesClients: "",
        bienUsageInterne: "",
        fondsNonDispo: "",
        stocksInvendable: "",
        zakatAmount: 0,
        created_at: new Date().toISOString().split("T")[0],
        nisab: 800000,
    };

    const [zakatFormInfos, setZakatFormInfos] = useState(initialZakatData);
    const [isUnnaire, setIsUnnaire] = useState(false);
    const [showResault, setShowResault] = useState(false);

    
        const saveZakatHistory = async () => {
            const token = localStorage.getItem("accessToken");
        
            const zakatData = {
                liquidites: zakatFormInfos.liquidites || -1,
                investissements: zakatFormInfos.investissements || -1,
                bien_location: zakatFormInfos.bienLocation || -1,
                creances_clients: zakatFormInfos.creancesClients || -1,
                bien_usage_interne: zakatFormInfos.bienUsageInterne || -1,
                fonds_non_dispo: zakatFormInfos.fondsNonDispo || -1,
                stocks_invendable: zakatFormInfos.stocksInvendable || -1,
                stocks: zakatFormInfos.stocks || -1,
                created_at: new Date().toISOString().split("T")[0], // YYYY-MM-DD
                nisab:zakatFormInfos.nisab,
                zakat_amount:zakatFormInfos.zakatAmount,
            };
        
            try {
                const response = await fetch("http://localhost:8000/apif/save-zakat-history/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(zakatData),
                });
        
                const data = await response.json();
                if (!response.ok) {
                    console.error("Backend error:", data);
                    throw new Error("Failed to save Zakat history");
                }
        
                console.log("Zakat history saved successfully:", data);
                alert("Zakat history saved successfully!");
        
                // Reset form after successful save
                setZakatFormInfos(initialZakatData);
        
            } catch (error) {
                console.error("Error:", error);
                alert(error.message);
            }
        };

    const calculateZakat = () => {
        const liquidites = Number(zakatFormInfos.liquidites) || 0;
        const stocks = Number(zakatFormInfos.stocks) || 0;
        const fondsNonDispo = Number(zakatFormInfos.fondsNonDispo) || 0;
        const stocksInvendable = Number(zakatFormInfos.stocksInvendable) || 0;

        const nissab = zakatFormInfos.nisab || 0;
        const zakatRate = isUnnaire ? 2.5 : 2.577;
        const totalActifs = (liquidites + stocks) - (fondsNonDispo + stocksInvendable);
        const zakat = (totalActifs > nissab) ? (totalActifs * (zakatRate / 100)) : 0;

        setZakatFormInfos(prevState => ({
            ...prevState,
            zakatAmount: zakat.toFixed(2),
        }));

        setShowResault(true);
    };

    return (
        <ZakatContext.Provider value={{ 
            zakatFormInfos, setZakatFormInfos, 
            isUnnaire, setIsUnnaire, 
            calculateZakat, 
            showResault, setShowResault ,
            saveZakatHistory
        }}>
            {children}
        </ZakatContext.Provider>
    );
};
