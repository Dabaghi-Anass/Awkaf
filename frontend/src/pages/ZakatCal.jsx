
import { Link } from 'react-router-dom'
import React, { useState,useContext } from 'react';
import { Header } from '../Components/Header'
import { ZakatContext } from '../Components/ZakatProvider';
import { CalForm } from '../Components/CalForm';
import Footer from '../Components/Footer';


export const ZakactCal = () => {
    const { zakatFormInfos, setZakatFormInfos,initialZakatData } = useContext(ZakatContext);
    

    // States to track which fields the user selects
    const [isLiquidites, setIsLiquidites] = useState(false);
    const [isStocks, setIsStocks] = useState(false);
    const [isInvestissements, setIsInvestissements] = useState(false);
    const [isBienLocation, setIsBienLocation] = useState(false);
    const [isCreancesClients, setIsCreancesClients] = useState(false);
    const [isBienUsageInterne, setIsBienUsageInterne] = useState(false);
    const [isFondsNonDispo, setIsFondsNonDispo] = useState(false);
    const [isStocksInvendable, setIsStocksInvendable] = useState(false);
    const [showInputs, setShowInputs] = useState(false);
    const [showResault,setShowResault]=useState(false);
    const [isUnnaire,setIsUnnaire]=useState(false);
    // Handles text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setZakatFormInfos(prev => ({ ...prev, [name]: value }));
    };

    // Handles Yes/No questions & selections
    const handleSelection = (field, value) => {
        setZakatFormInfos(prev => ({ ...prev, [field]: value ? "" : -1 }));
    };

    // Handles form submission (Sends selected data to the backend)
    
    
    

    const calculateZakat = () => {
        // Ensure numeric values (default to 0 if undefined)
        const liquidites = Number(zakatFormInfos.liquidites) || 0;
        const stocks = Number(zakatFormInfos.stocks) || 0;
        const fondsNonDispo = Number(zakatFormInfos.fondsNonDispo) || 0;
        const stocksInvendable = Number(zakatFormInfos.stocksInvendable) || 0;
        
        // Vérifie que nissab est défini
        const nissab = zakatFormInfos.nisab || 0;
    
        // Définir le taux de Zakat
        const zakatRate = isUnnaire ? 2.5 : 2.577;
        
        // Calcul du total des actifs éligibles
        const totalActifs = (liquidites + stocks) - (fondsNonDispo + stocksInvendable);
        
        // Calcul de la Zakat avec la bonne condition
        const zakat = (totalActifs > nissab) ? (totalActifs * (zakatRate / 100)) : 0;
    
        // Met à jour l'état
        setZakatFormInfos(prevState => ({
            ...prevState,
            zakatAmount: zakat.toFixed(3) // Stocke le montant en string pour l'affichage
        }));
    
        setShowResault(true);
    };
    
    

    return (
        <>
              <Header></Header>
              <CalForm></CalForm>
              <Footer></Footer>
        </>
        
    );
};

export default ZakactCal