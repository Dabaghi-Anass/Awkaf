import React from 'react'
import '../CSS/ZakatInputs.css'
export const ZakatInputs = ({isLiquidites, isStocks, isInvestissements,isBienUsageInterne, isBienLocation, isCreancesClients,isFondsNonDispo, isStocksInvendable,zakatFormInfos, handleChange}) => {
  return (
   <>
    
    <div className="input-montants-container">
                                {isLiquidites && <p className='input-label-montants'><label>Trésorerie</label><br /><input type="number" name="liquidites" min={0} value={zakatFormInfos.liquidites} onChange={handleChange} /></p>}
                                {isStocks && <p className='input-label-montants'><label>Stocks</label><br /><input type="number" name="stocks" min={0} value={zakatFormInfos.stocks} onChange={handleChange} /></p>}
                                {isInvestissements && <p className='input-label-montants'><label>Investissements</label><br /><input type="number" min={0} name="investissements" value={zakatFormInfos.investissements} onChange={handleChange} /></p>}
                                {isBienUsageInterne && <p className='input-label-montants'><label>Bien d'usage interne</label><br /><input type="number" min={0} name="bienUsageInterne" value={zakatFormInfos.bienUsageInterne} onChange={handleChange} /></p>}
                                {isBienLocation && <p className='input-label-montants'><label>Biens en location</label><br /><input type="number" min={0} name="bienLocation" value={zakatFormInfos.bienLocation} onChange={handleChange} /></p>}
                                {isCreancesClients && <p className='input-label-montants'><label>Créances clients</label><br /><input type="number" min={0} name="creancesClients" value={zakatFormInfos.creancesClients} onChange={handleChange} /></p>}
                                {isFondsNonDispo && <p className='input-label-montants'><label>Fonds non disponibles</label><br /><input type="number" min={0} name="fondsNonDispo" value={zakatFormInfos.fondsNonDispo} onChange={handleChange} /></p>}
                                {isStocksInvendable && <p className='input-label-montants'><label>Stocks invendables</label><br /><input type="number" min={0} name="stocksInvendable" value={zakatFormInfos.stocksInvendable} onChange={handleChange} /></p>}
                            </div>
   
   </>
  )
}
