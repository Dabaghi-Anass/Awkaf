
import { Link } from 'react-router-dom'
import React, { useState,useContext } from 'react';
import { Header } from '../Components/Header'
import { ZakatInputs } from '../Components/ZakatInputs';
import { ZakatAmount } from '../Components/ZakatAmount';
import { ZakatContext } from '../Components/ZakatProvider';

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
            zakatAmount: zakat.toFixed(2) // Stocke le montant en string pour l'affichage
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

                        <div className="question">
                            <h3>3. Avez-vous des stocks invendables ?</h3>
                            <div className="yes-no">
                                <button className={`yes ${isUnnaire ? "active" : ""}`} onClick={() => { setIsUnnaire(true);  }}>Unnaire</button>
                                <button className={`no ${!isUnnaire ? "active" : ""}`} onClick={() => { setIsUnnaire(false); }}>Solaire</button>
                            </div>
                        </div>

                        {/* Next Button */}
                        <div className="zakat-form-btns-container center">
                            <button className="next-btn" onClick={() => setShowInputs(true)}>Next</button>
                        </div>
                        <div className="line-hor"></div>
                        {showInputs && (
                    <div className="user-inputs">
                        <div className="question">
                            <h3>4.Veuillez saisir vos infos:</h3>
                            <ZakatInputs 
                             isLiquidites={isLiquidites} isStocks={isStocks} isInvestissements={isInvestissements}
                             isBienUsageInterne={isBienUsageInterne} isBienLocation={isBienLocation} isCreancesClients={isCreancesClients}
                             isFondsNonDispo={isFondsNonDispo} isStocksInvendable={isStocksInvendable} 
                             handleChange={handleChange}
                            ></ZakatInputs>
                            
                            <div className="zakat-form-btns-container center">
                            <button className="zakat-calcl-btn" onClick={calculateZakat}>Calculer la Zakat</button>
                            </div>
                            
                        </div>
                        
                            <ZakatAmount 
                                  showResault={showResault} setShowInputs={setShowInputs}
                                saveZakatHistory={saveZakatHistory}
                            />
                            

                    </div>
                )}
                
                    </div>
                </div>
            
        </div>
        </>
        
    );
};

export default ZakactCal