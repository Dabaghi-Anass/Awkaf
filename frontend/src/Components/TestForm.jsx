import React, { useState } from 'react';
import '../CSS/TestForm.css';

export const TestForm = () => {
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
        try {
            const response = await fetch("http://127.0.0.1:8000/save-zakat-history/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(zakatFormInfos),
            });
    
            if (!response.ok) {
                throw new Error("Failed to save Zakat history");
            }
    
            const data = await response.json();
            console.log("Zakat history saved successfully:", data);
            alert("Zakat history saved successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to save Zakat history. Please try again.");
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
    };
    

    return (
        <div className="parent center">
            <div className="zakat-form-container">
                {/* Left Section - Selection */}
                <div className="left-side">
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
                    </div>
                </div>

                {/* Right Section - Inputs */}
                {showInputs && (
                    <div className="right-side">
                        <div className="montants">
                            <h3>Veuillez saisir vos infos:</h3>
                            <div className="input-montants-container">
                                {isLiquidites && <p className='input-label-montants'><label>Trésorerie</label><input type="text" name="liquidites" value={zakatFormInfos.liquidites} onChange={handleChange} /></p>}
                                {isStocks && <p className='input-label-montants'><label>Stocks</label><input type="text" name="stocks" value={zakatFormInfos.stocks} onChange={handleChange} /></p>}
                                {isInvestissements && <p className='input-label-montants'><label>Investissements</label><input type="text" name="investissements" value={zakatFormInfos.investissements} onChange={handleChange} /></p>}
                                {isBienUsageInterne && <p className='input-label-montants'><label>Bien d'usage interne</label><input type="text" name="bienUsageInterne" value={zakatFormInfos.bienUsageInterne} onChange={handleChange} /></p>}
                                {isBienLocation && <p className='input-label-montants'><label>Biens en location</label><input type="text" name="bienLocation" value={zakatFormInfos.bienLocation} onChange={handleChange} /></p>}
                                {isCreancesClients && <p className='input-label-montants'><label>Créances clients</label><input type="text" name="creancesClients" value={zakatFormInfos.creancesClients} onChange={handleChange} /></p>}
                                {isFondsNonDispo && <p className='input-label-montants'><label>Fonds non disponibles</label><input type="text" name="fondsNonDispo" value={zakatFormInfos.fondsNonDispo} onChange={handleChange} /></p>}
                                {isStocksInvendable && <p className='input-label-montants'><label>Stocks invendables</label><input type="text" name="stocksInvendable" value={zakatFormInfos.stocksInvendable} onChange={handleChange} /></p>}
                            </div>
                            <div className="zakat-calcul-container center">
                            <button className="zakat-calcl-btn" onClick={calculateZakat}>Calculer la Zakat</button>
                            </div>
                            
                        </div>
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

                       <div className="savee center"><button className="save-btn" onClick={saveZakatHistory}>Save</button></div>
                    </div>
                )}
                

            </div>
        </div>
    );
};
