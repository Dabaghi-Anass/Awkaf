import React from 'react'
import '../CSS/Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import validation from './validation'
export const LoginPage = () => {

   const [data, setData] = useState({
          email: "",
          password: ""
      });
  
      const [errors, setErrors] = useState({});
  
      const handleChange = (e) => {
          setData({
              ...data,
              [e.target.name]: e.target.value
          });
      };
  
      const handleSubmit = (e) => {
          e.preventDefault();
          const validationErrors = validation(data);
          setErrors(validationErrors);
  
          if (Object.keys(validationErrors).length === 0) {
              console.log(data);
              setData({
                  email: "",
                  password: ""
              });
          }
      };


  return (
   <>
        <div className="sign-up-container center">
           <div className="sign-up">

              <div className="left-sign-up"></div>

              <div className="right-sign-up">
                    <div className="top center">
                        <div className='welcome'>
                        <h2>مرحبا بكم</h2>
                        <p>الرجاء منكم إدخال معوماتكم الشخصية</p>
                        </div>
                      
                    </div>
                    <div className="middle ">
                      <form onSubmit={handleSubmit} action="">
                          
                          <input type="email" placeholder='البريد الالكتروني'value={data.email}
                            name="email"
                            onChange={handleChange} />
                            {errors.email && <p className="error">{errors.email}</p>}
                          <input type="password" placeholder='كلمة المرور' value={data.password}
                            name="password"
                            onChange={handleChange} />
                          
                          <div className="forgot-password-container">
                                {errors.password && <p className="error">{errors.password}</p>}
                                <Link to={'/'} className='forgot-password'>نسيت كلمة المرور?</Link>
                          </div>
                        

                          <button className='login-btn' type="submit">تسجيل الدخول</button>
                          <div className="no-account center">
                      ليس لديك حساب؟ <Link className='signup-login' to={'/Register'}>إِشترك الان</Link>
                      </div>
                      </form>
                      
                    </div>
                 
              </div>
           </div>
           
           
        </div>

   </>
  )
}
