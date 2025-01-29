import React from 'react'
import '../CSS/Register.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export const RegisterPage = () => {
  const navigate = useNavigate();
    const userData={
        company_name:'',
        username:'',
        email:'',
        password:'',
        confirm_password:'',
    }
    const [formData,setFormData]=useState(userData);
    const [formErrors,setFormErrors]=useState({});

    

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formData);
        setFormErrors(errors);
    
        if (Object.keys(errors).length === 0) {
          // Perform the fetch after successful validation
          try {
            const response = await fetch("http://127.0.0.1:8000/apif/user/register/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData), // Send the form data
            });
    
            const data = await response.json();
    
            if (response.ok) {
              navigate('/');
              // Success notification
                console.log("Fetch Succeced",data)
              setFormData(userData);  // Reset form after successful submission
              
            } else {
              // Error handling from backend
             console.log('Somthing went wrong');
            }
          } catch (error) {
            console.error("Error during form submission:", error);
            
          }
        }
      };
    const validate = (values) => {
        const errors = {};
        const regex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (!values.company_name.trim()) {
          errors.company_name = "اسم الشركة مطلوب!";
        }

        if (!values.username.trim()) {
          errors.username = "اسم المستخدم مطلوب!";
        }
        
       
        if (!values.email.trim()) {
          errors.email = "البريد الإلكتروني مطلوب!";
        } else if (!regex.test(values.email)) {
          errors.email = "البريد الإلكتروني غير صالح!";
        }

        if (!values.password.trim()) {
          errors.password = "كلمة المرور مطلوبة!";
        } else if (values.password.length < 4) {
          errors.password = "يجب أن تكون كلمة المرور أكثر من 4 أحرف!";
        } 

        if (values.password !== values.confirm_password) {
          errors.confirm_password = "كلمتا المرور غير متطابقتين!";
        }

        return errors;
      };
     
          /* {errors.password && <p className="error">{errors.password}</p>}*/
    
  return (
   <>
      <div className="sign-up-container center">
            <div className="register-container">
            <div className="top center register-top">
                  <div className='welcome register-w'>
                      <h2>إنشاء حساب جديد</h2>
                      <p>يرجى تقديم بياناتك لإنشاء حساب جديد</p>
                  </div>  
                   
                </div>
                <div className="middle">
                      <form  onSubmit={handleSubmit}>
                          <div className="input-container-register">
                                <input  placeholder='إسم الشركة'
                                  name="company_name"
                                  onChange={handleChange}
                                  value={formData.company_name}
                                />
                                <span className="error">{formErrors.company_name}</span>
                          </div>

                          <div className="input-container-register">
                                <input  placeholder='إسم المستخدم'
                                  name="username"
                                  onChange={handleChange}
                                  value={formData.username}
                                />
                                <span className="error">{formErrors.username}</span>
                          </div>


                           <div className="input-container-register"> 
                              <input  placeholder='البريد الالكتروني '
                                name="email" 
                                onChange={handleChange}
                                value={formData.email}

                              />
                              <span className="error">{formErrors.email}</span>

                           </div>
                            
                           
                           <div className="input-container-register">
                              <input type="password" 
                                placeholder='كلمة المرور'
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                              />
                                <span className="error">{formErrors.password}</span>
                           </div>
                            

                            <div className="input-container-register" >
                                  <input type="password"
                                placeholder='تأكيد كلمة المرور '
                                  name="confirm_password"
                                  onChange={handleChange}
                                  value={formData.confirm_password}
                                />
                                <span className="error">{formErrors.confirm_password}</span>

                            </div>
                          
                        
                          <button className=' login-btn signup-btn ' type="submit">إنشاء حساب</button>
                          <div className="no-account center">
                          لديك حساب مسبقًا؟<Link className='signup-login' to={'/Login'} >تسجيل الدخول</Link>
                      </div>
                      </form>
                      
                    </div>
            </div>
      </div>
   </>
  )
}
