
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { Header } from '../Components/Header'
import { ZakatInputs } from '../Components/ZakatInputs';

export const ZakactCal = () => {
   
    // Initial empty values
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
    };

    const [zakatFormInfos, setZakatFormInfos] = useState(initialZakatData);

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
    // Handles text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setZakatFormInfos(prev => ({ ...prev, [name]: value }));
    };

    // Handles Yes/No questions & selections
    const handleSelection = (field, value) => {
        setZakatFormInfos(prev => ({ ...prev, [field]: value ? "" : undefined }));
    };

    // Handles form submission (Sends selected data to the backend)
    const saveZakatHistory = async () => {
        const token = localStorage.getItem("accessToken");
    
        const zakatData = {
            liquidites: zakatFormInfos.liquidites || 0,
            investissements: zakatFormInfos.investissements || 0,
            bien_location: zakatFormInfos.bienLocation || 0,
            creances_clients: zakatFormInfos.creancesClients || 0,
            bien_usage_interne: zakatFormInfos.bienUsageInterne || 0,
            fonds_non_dispo: zakatFormInfos.fondsNonDispo || 0,
            stocks_invendable: zakatFormInfos.stocksInvendable || 0,
            stocks: zakatFormInfos.stocks || 0,
            created_at: new Date().toISOString().split("T")[0], // YYYY-MM-DD
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
            setIsLiquidites(false);
            setIsStocks(false);
            setIsInvestissements(false);
            setIsBienLocation(false);
            setIsCreancesClients(false);
            setIsBienUsageInterne(false);
            setIsFondsNonDispo(false);
            setIsStocksInvendable(false);
            setShowInputs(false); // Hide input fields again
    
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    
    
    

    const calculateZakat = () => {
        // Ensure numeric values (default to 0 if undefined)
        const liquidites = Number(zakatFormInfos.liquidites) || 0;
        const stocks = Number(zakatFormInfos.stocks) || 0;
        const fondsNonDispo = Number(zakatFormInfos.fondsNonDispo) || 0;
        const stocksInvendable = Number(zakatFormInfos.stocksInvendable) || 0;
    
        // Ensure selectedRate is a number (default to 2.5% if not set)
        const zakatRate =  2.5;
    
        // Calculate total eligible assets
        const totalActifs = (liquidites + stocks) - (fondsNonDispo + stocksInvendable);
    
        // Calculate zakat
        const zakat = totalActifs * (zakatRate / 100);
    
        // Update the zakatAmount in zakatFormInfos
        setZakatFormInfos(prevState => ({
            ...prevState,
            zakatAmount: zakat.toFixed(2) // Store zakat amount as a string for display
        }));
        setShowResault(true);
    };
    

    return (
        <>
              <Header></Header>
            <div className="parent center">
            
                {/* Left Section - Selection */}
                <div className="zakat-form-container">
                    <div className="zakat-calculator-title">
                        <h1>Zakat Calculator</h1>
                        <p>Dans ce formulaire, vous pouvez simplement calculer le montant <br /> 
                           de votre Zakat en remplissant les informations ci-dessous.</p>
                    </div>
                    <div className="line-hor"></div>
                    <div className="questions-container">

                        {/* Question 1 - Asset Selection */}
                        <div className="question">
                            <h3>1. Quels types d’actifs votre entreprise possède-t-elle ?</h3>
                            <ul>
                                <li className={`choice ${isLiquidites ? "active" : ""}`} onClick={() => setIsLiquidites(prev => !prev)}>Trésorerie (caisse, comptes bancaires, or et argent)</li>
                                <li className={`choice ${isStocks ? "active" : ""}`} onClick={() => setIsStocks(prev => !prev)}>Stocks destinés à la vente</li>
                                <li className={`choice ${isInvestissements ? "active" : ""}`} onClick={() => setIsInvestissements(prev => !prev)}>Investissements</li>
                                <li className={`choice ${isBienLocation ? "active" : ""}`} onClick={() => setIsBienLocation(prev => !prev)}>Biens en location</li>
                                <li className={`choice ${isCreancesClients ? "active" : ""}`} onClick={() => setIsCreancesClients(prev => !prev)}>Créances clients</li>
                                <li className={`choice ${isBienUsageInterne ? "active" : ""}`} onClick={() => setIsBienUsageInterne(prev => !prev)}>Biens d’usage interne</li>
                            </ul>
                        </div>

                        {/* Question 2 - Fonds Non Dispo */}
                        <div className="question">
                            <h3>2. Avez-vous des fonds non disponibles ?</h3>
                            <div className="yes-no">
                                <button className={`yes ${isFondsNonDispo ? "active" : ""}`} onClick={() => { setIsFondsNonDispo(true); handleSelection('fondsNonDispo', true); }}>Yes</button>
                                <button className={`no ${!isFondsNonDispo ? "active" : ""}`} onClick={() => { setIsFondsNonDispo(false); handleSelection('fondsNonDispo', false); }}>No</button>
                            </div>
                        </div>

                        {/* Question 3 - Stocks Invendables */}
                        <div className="question">
                            <h3>3. Avez-vous des stocks invendables ?</h3>
                            <div className="yes-no">
                                <button className={`yes ${isStocksInvendable ? "active" : ""}`} onClick={() => { setIsStocksInvendable(true); handleSelection('stocksInvendable', true); }}>Yes</button>
                                <button className={`no ${!isStocksInvendable ? "active" : ""}`} onClick={() => { setIsStocksInvendable(false); handleSelection('stocksInvendable', false); }}>No</button>
                            </div>
                        </div>

                        {/* Next Button */}
                        <div className="question">
                            <button className="next-btn" onClick={() => setShowInputs(true)}>Next</button>
                        </div>
                        <div className="line-hor"></div>
                        {showInputs && (
                    <div className="right-side">
                        <div className="montants">
                            <h3>Veuillez saisir vos infos:</h3>
                            <ZakatInputs 
                             isLiquidites={isLiquidites} isStocks={isStocks} isInvestissements={isInvestissements}
                             isBienUsageInterne={isBienUsageInterne} isBienLocation={isBienLocation} isCreancesClients={isCreancesClients}
                             isFondsNonDispo={isFondsNonDispo} isStocksInvendable={isStocksInvendable} 
                             zakatFormInfos={zakatFormInfos} handleChange={handleChange}
                            ></ZakatInputs>
                            
                            <div className="zakat-calcul-container center">
                            <button className="zakat-calcl-btn" onClick={calculateZakat}>Calculer la Zakat</button>
                            </div>
                            
                        </div>
                        {showResault&&(
                            <div className="result-container">
                            <h2>قيمة الزكاة الواجبة على شركتكم</h2>
                            <div className="line-ver"></div>
                            <div className="zakat-amount">{zakatFormInfos.zakatAmount}</div>
                            <p>
                            لقد قمنا بحساب زكاتك وهي تبلغ [مبلغ الزكاة] دولار أمريكي. ندعوك لاستخدام زكاتك في الوقف، حيث ستسهم
                            في مشاريع مستدامة تحقق فائدة طويلة الأمد للمجتمع. بادر بالمساهمة بزكاتك للوقف ودع أثرها الإيجابي
                            يمتد لأجيال قادمة.
                            </p>
                        </div>
                        )}
                        

                       <div className="savee center">

                        <button className="save-btn" onClick={saveZakatHistory}>Save</button>
                        <button className="save-btn" onClick={()=>{setShowInputs(false) ;setShowResault(false)} }>Previous</button>
                       </div>
                    </div>
                )}
                
                    </div>
                </div>

                {/* Right Section - Inputs */}
               

            
        </div>
        </>
        
    );
};

export default ZakactCal