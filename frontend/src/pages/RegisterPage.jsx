import React from 'react'
import '../CSS/Register.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Register } from '../Components/Register';


export const RegisterPage = () => {

    const userData={
        username:'',
        password:'',
        email:'',
        confirm_password:'',
        company:"company",
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
          try {
              // Remove confirm_password before sending to backend
              const { confirm_password, ...submitData } = formData;
  
              const response = await fetch("http://127.0.0.1:8000/apif/user/register/", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(submitData),  // ✅ Send only required fields
              });
  
              const data = await response.json();
              console.log("Response Status:", response.status);
              console.log("Response Data:", data);

  
              if (response.ok) {
                  navigate('/');
                  console.log("Fetch Succeeded", data);
                  setFormData(userData);
              } else {
                  console.error("Backend validation error:", data);
                  setFormErrors(data);  // ✅ Show backend validation errors
              }
          } catch (error) {
              console.error("Error during form submission:", error);
          }
      }
  };
  
      const validate = (values) => {
        const errors = {};
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (!values.company?.trim()) {  // ✅ Using optional chaining to avoid "undefined" error
            errors.company = "اسم الشركة مطلوب!";
        }
    
        if (!values.username?.trim()) {
            errors.username = "اسم المستخدم مطلوب!";
        }
    
        if (!values.email?.trim()) {
            errors.email = "البريد الإلكتروني مطلوب!";
        } else if (!regex.test(values.email)) {
            errors.email = "البريد الإلكتروني غير صالح!";
        }
    
        if (!values.password?.trim()) {
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
      <div>
        <Register formData={formData} handleChange={handleChange}></Register>
            
      </div>
   </>
  )
}
