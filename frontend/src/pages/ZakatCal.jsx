
import { Link } from 'react-router-dom'
import React, { useState,useContext } from 'react';
import { Header } from '../Components/Header'
import { ZakatContext } from '../Components/ZakatProvider';
import { CalForm } from '../Components/CalForm';
import Footer from '../Components/Footer';


export const ZakactCal = () => {
    
    

    return (
        <>
              <Header></Header>
              <CalForm></CalForm>
              <Footer></Footer>
        </>
        
    );
};

export default ZakactCal