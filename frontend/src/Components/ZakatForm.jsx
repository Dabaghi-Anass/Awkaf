import React, { useState } from 'react';
import '../CSS/ZakatForm.css';

export const ZakatForm = () => {
  const [zakatFormInfos, setZakatFormInfos] = useState({
    actifs: {
      liquidites: 0,
      stocks: 0,
      investissements: 0,
      bienLocation: 0,
      creancesClients: 0,
      bienUsageInterne: 0
    },
    filtered: {
      fondsNonDispo: 0,
      stocksInvendable: 0,
    }
  });

  const [visibleInputs, setVisibleInputs] = useState({});
  const [zakatAmount, setZakatAmount] = useState(null);
  const [selectedRate, setSelectedRate] = useState(2.5); 

  
  const handleLabelClick = (name) => {
    setVisibleInputs((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setZakatFormInfos((prevState) => {
      const category = prevState.actifs.hasOwnProperty(name) ? "actifs" : "filtered";
      return {
        ...prevState,
        [category]: {
          ...prevState[category],
          [name]: Number(value) || 0,
        },
      };
    });
  };

 
  const handleRateChange = (e) => {
    setSelectedRate(Number(e.target.value));
  };

 
  const calculateZakat = () => {
    const { liquidites, stocks } = zakatFormInfos.actifs;
    const { fondsNonDispo, stocksInvendable } = zakatFormInfos.filtered;

    const totalActifs = liquidites + stocks - (fondsNonDispo + stocksInvendable);
    const zakat = totalActifs * (selectedRate / 100);

    setZakatAmount(zakat.toFixed(2)); 
  };

  return (
    <div className="Form-container">
      <div className="Zakat-form">
        <div className="form-title center">Zakat Calculator Form</div>
        <div className="form-container center">
          <form>
          
            <div className="Question1">
              <h2>Quels types d’actifs votre entreprise possède-t-elle ?</h2>
              {[
                { label: "Trésorerie (caisse, comptes bancaires, or et argent)", name: "liquidites" },
                { label: "Stocks destinés à la vente (marchandises, matières premières)", name: "stocks" },
                { label: "Investissements (actions, obligations, placements financiers)", name: "investissements" },
                { label: "Biens en location (immobilier, véhicules en leasing)", name: "bienLocation" },
                { label: "Créances clients (factures en attente de paiement)", name: "creancesClients" },
                { label: "Biens de consommation et d’usage interne (matériel, brevets, licences)", name: "bienUsageInterne" },
              ].map((item) => (
                <div key={item.name} className="label-input-container">
                  <label onClick={() => handleLabelClick(item.name)} >
                    {item.label}
                  </label>
                  <br />
                  {visibleInputs[item.name] && (
                    <input 
                      className='asset-input'
                      type="number"
                      name={item.name}
                      value={zakatFormInfos.actifs[item.name]}
                      onChange={handleChange}
                      placeholder="Entrez le montant"
                    />
                  )}
                </div>
              ))}
            </div>

            
            <div className="Question2">
              <h2>Avez-vous des fonds dont vous ne possédez pas totalement la propriété ?</h2>
              <label onClick={() => handleLabelClick("fondsNonDispo")} >
                Fonds non disponibles
              </label>
              <br />
              {visibleInputs["fondsNonDispo"] && (
                <input
                  className='asset-input'
                  type="number"
                  name="fondsNonDispo"
                  value={zakatFormInfos.filtered.fondsNonDispo}
                  onChange={handleChange}
                  placeholder="Entrez le montant"
                />
              )}

              <h2>Avez-vous des stocks invendables ?</h2>
              <label onClick={() => handleLabelClick("stocksInvendable")} >
                Stocks invendables
              </label>
              <br />
              {visibleInputs["stocksInvendable"] && (
                <input
                  className='asset-input'
                  type="number"
                  name="stocksInvendable"
                  value={zakatFormInfos.filtered.stocksInvendable}
                  onChange={handleChange}
                  placeholder="Entrez le montant"
                />
              )}
            </div>

            
            <div className="Question3">
              <h2>Souhaitez-vous utiliser l’année lunaire (2,5 %) ou solaire (2,577 %) ?</h2>
              <label>
                <input
                  className='asset-input'
                  type="radio"
                  name="rate"
                  value="2.5"
                  checked={selectedRate === 2.5}
                  onChange={handleRateChange}
                />
                Année lunaire (2.5 %)
              </label>
              <br />
              <label>
                <input
                  className='asset-input'
                  type="radio"
                  name="rate"
                  value="2.577"
                  checked={selectedRate === 2.577}
                  onChange={handleRateChange}
                />
                Année solaire (2.577 %)
              </label>
            </div>

     
            <div className="">
              <button type="button" className="calculate-btn" onClick={calculateZakat}>
                Calculer la Zakat
              </button>
            </div>

           
            {zakatAmount !== null && (
              <div className="result-container">
                <h2>Montant de la Zakat à payer :</h2>
                <p><strong>{zakatAmount} unités monétaires</strong></p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
