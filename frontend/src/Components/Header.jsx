import React from 'react'
import '../CSS/Header.css'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <div className="header-container">
          <div className="header-top"><Link className='logo' to={"/"}>منصة حساب زكاة الشركات <br /> وتوجيهها للوقف والتنمية</Link></div>
          <div className="header-bottom">
            <Link to={"/"} className='page'>الرئيسية</Link>
            <Link to={"/About"} className='page'>عن الزكاة</Link>
            <Link to={"/ZakatCalculator"} className='page'>حاسبة الزكاة</Link>
            <Link to={"/Awkaf"} className='page'>مشاريع الوقف</Link>
            <Link to={""} className='page'>تواصل مباشرة معنا</Link>
          </div>
      </div>
    </>
  )
}
