import React from 'react'
import '../CSS/RapportCal.css'
import { Header } from './Header'

export const RapportCal = () => {
  return (
    <>
        <Header></Header>
        <div className="center">
            <div className="details-container">
              <h1>Calculations Details</h1>
              <div className="mbape">
                <label >Valeur du Nissab:</label> 
                <input type="text" readOnly value={'12555 DA'} />
              </div>

              <div className="mbape">
                <label >Montant Total:</label> 
                <input type="text" readOnly value={'12555 DA'} />
              </div>

              <div className="mbape">
                <label >Valeur du Zakat:</label> 
                <input type="text" readOnly value={'12555 DA'} />
              </div>

              <div className="mbape">
                <label >Date:</label> 
                <input type="text" readOnly value={'30/1/2022'} />
              </div>
              <div className="mbape">
                <label >Type d'anneé:</label> 
                <input type="text" readOnly value={'Unnaire'} />
              </div>


            </div>
            
            
            
        </div>
       
    </>
  )
}
