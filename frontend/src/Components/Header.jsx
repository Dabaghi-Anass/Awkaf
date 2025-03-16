import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../CSS/Header.css';

export const Header = () => {
  const location = useLocation(); // Get the current path

  return (
    <>
      <div dir='rtl' className="header-container">
        <div className="header-top">
          <Link className='logo' to={"/"}>
            منصة حساب زكاة الشركات وتوجيهها للوقف والتنمية
          </Link>
        </div>
        
        <div className="header-bottom">
          <div className='pages'>
            <Link to={"/"} className={`page ${location.pathname === "/" ? "activee" : ""}`}>الرئيسية</Link>
            <Link to={"/About"} className={`page ${location.pathname === "/About" ? "activee" : ""}`}>عن الزكاة</Link>
            <Link to={"/ZakatCalculator"} className={`page ${location.pathname === "/ZakatCalculator" ? "activee" : ""}`}>حاسبة الزكاة</Link>
            <Link to={"/Awkaf"} className={`page ${location.pathname === "/Awkaf" ? "activee" : ""}`}>مشاريع الوقف</Link>
            <Link to={"/Contact"} className={`page ${location.pathname === "/Contact" ? "activee" : ""}`}>تواصل مباشرة معنا</Link>
          </div>
        </div>
      </div>
    </>
  );
};
