import React from 'react'
import '../CSS/Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <div dir='rtl' className="footer ">
        <div className="top-footer Container center">
          <div className="our-partners-cont">
            <h1 style={{fontSize:'3.5em'}}>شركاؤنا</h1>
            <div className="partners">
              <h1> <span></span>بنك البركة</h1> <br />
              <h1> <span></span>وزارة الشؤون الدينية و الاوقاف </h1>
            </div>
          </div>
        </div>
        <div className="bottom-footer Container">
          <h1 className='Platforme'>
          منصة حساب زكاة الشركات  <br />
          وتوجيهها للوقف والتنمية
          </h1>
          <div className="cordonnee">
            <div className="contact-links">
              <div className="contact">
                <h2>للتواصل  معنا</h2>
                <div>
                <p> <span></span> 0658798756</p> 
                </div>
                <div>
                <p> <span></span>Email@gmail.com</p>   
                </div>
              </div>
              <div className="links">
                <h2>خدمتنا</h2>
                <ul >
                  <li><Link to={'/'}>الرئيسية</Link></li>
                  <li><Link to={'/About'}>عن الزكاة</Link></li>
                  <li><Link to={'/'}>حاسبة الزكاة</Link></li>
                  <li><Link to={'/Awkaf'}>مشاريع الوقف</Link></li>

                </ul>
              </div>
              
            </div>
            <div className="social-medias"></div>
          </div>
        </div>
      </div>
    </>
  )
}
