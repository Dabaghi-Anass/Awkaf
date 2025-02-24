import React, { createContext, useState } from "react";

export const ZakatContext = createContext();

export const ZakatProvider = ({ children }) => {
    // Define the initial state
    const initialZakatData = {
        liquidites: "",
        stocks: "",
        investissements: "",
        bienLocation: "",
        creancesClients: "",
        bienUsageInterne: "",
        fondsNonDispo: "",
        stocksInvendable: "",
        zakatAmount: "",
        created_at: new Date().toISOString().split("T")[0],
        nisab: 800000,
    };

    // State to store zakat form information
    const [zakatFormInfos, setZakatFormInfos] = useState(initialZakatData);

    return (
        <ZakatContext.Provider value={{ zakatFormInfos, setZakatFormInfos }}>
            {children}
        </ZakatContext.Provider>
    );
};
