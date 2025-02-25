import React, { useContext } from 'react';
import '../CSS/ZakatInputs.css';
import { ZakatContext } from './ZakatProvider';

export const ZakatInputs = ({ isLiquidites, isStocks, isInvestissements, isBienUsageInterne, isBienLocation, isCreancesClients, isFondsNonDispo, isStocksInvendable }) => {
    const { zakatFormInfos, setZakatFormInfos } = useContext(ZakatContext); // ✅ Get state from context

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setZakatFormInfos((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="input-montants-container">
            {isLiquidites && (
                <p className='input-label-montants'>
                    <label>Trésorerie</label><br />
                    <input type="number" name="liquidites" min={0} value={zakatFormInfos.liquidites} onChange={handleChange} />
                </p>
            )}
            {isStocks && (
                <p className='input-label-montants'>
                    <label>Stocks</label><br />
                    <input type="number" name="stocks" min={0} value={zakatFormInfos.stocks} onChange={handleChange} />
                </p>
            )}
            {isInvestissements && (
                <p className='input-label-montants'>
                    <label>Investissements</label><br />
                    <input type="number" name="investissements" min={0} value={zakatFormInfos.investissements} onChange={handleChange} />
                </p>
            )}
            {isBienUsageInterne && (
                <p className='input-label-montants'>
                    <label>Bien d'usage interne</label><br />
                    <input type="number" name="bienUsageInterne" min={0} value={zakatFormInfos.bienUsageInterne} onChange={handleChange} />
                </p>
            )}
            {isBienLocation && (
                <p className='input-label-montants'>
                    <label>Biens en location</label><br />
                    <input type="number" name="bienLocation" min={0} value={zakatFormInfos.bienLocation} onChange={handleChange} />
                </p>
            )}
            {isCreancesClients && (
                <p className='input-label-montants'>
                    <label>Créances clients</label><br />
                    <input type="number" name="creancesClients" min={0} value={zakatFormInfos.creancesClients} onChange={handleChange} />
                </p>
            )}
            {isFondsNonDispo && (
                <p className='input-label-montants'>
                    <label>Fonds non disponibles</label><br />
                    <input type="number" name="fondsNonDispo" min={0} value={zakatFormInfos.fondsNonDispo} onChange={handleChange} />
                </p>
            )}
            {isStocksInvendable && (
                <p className='input-label-montants'>
                    <label>Stocks invendables</label><br />
                    <input type="number" name="stocksInvendable" min={0} value={zakatFormInfos.stocksInvendable} onChange={handleChange} />
                </p>
            )}
        </div>
    );
};

