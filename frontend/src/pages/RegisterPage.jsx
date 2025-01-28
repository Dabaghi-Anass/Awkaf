import React from 'react'
import '../CSS/Register.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
export const RegisterPage = () => {

    const userData={
        company_name:'',
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
          errors.company_name = "company name required!";
        }
        
       
        if (!values.email.trim()) {
          errors.email = "Email required!";
        } else if (!regex.test(values.email)) {
          errors.email = "Email is not valid!";
        }

        if (!values.password.trim()) {
          errors.password = "Password required!";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } 

        if (values.password !== values.confirm_password) {
          errors.confirm_password = "Passwords do not match!";
        }

        return errors;
      };
     
          /* {errors.password && <p className="error">{errors.password}</p>}*/
    
  return (
   <>
      <div className="sign-up-container center">
            <div className="register-container">
            <div className="top center">
                  <div className='welcome'>
                      <h2>إنشاء حساب جديد</h2>
                      <p>يرجى تقديم بياناتك لإنشاء حساب جديد</p>
                  </div>  
                   
                </div>
                <div className="middle ">
                      <form  onSubmit={handleSubmit}>
                          
                          <input  placeholder='إسم الشركة'
                            name="company_name"
                             onChange={handleChange}
                             value={formData.company_name}
                           />
                           <span className="error-msg">{formErrors.company_name}</span>

                            <input  placeholder='البريد الالكتروني '
                            name="email" 
                            onChange={handleChange}
                            value={formData.email}

                           />
                           <span className="error-msg">{formErrors.email}</span>
                           

                            <input type="password" 
                            placeholder='كلمة المرور'
                            name="password"
                             onChange={handleChange}
                             value={formData.password}
                           />
                            <span className="error-msg">{formErrors.password}</span>
                            
                          <input type="password"
                           placeholder='تأكيد كلمة المرور '
                            name="confirm_password"
                             onChange={handleChange}
                             value={formData.confirm_password}
                           />
                          <span className="error-msg">{formErrors.confirm_password}</span>
                        
                          <button className='login-btn' type="submit">إنشاء حساب</button>
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
