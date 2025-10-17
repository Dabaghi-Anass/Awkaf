import React, { useState,useEffect } from 'react';
import { Login } from './Login';



export const LoginPage = () => {

  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  useEffect(() => {
    setFormData({
      username: "",
      password: "",
    });
  }, []);

  return (
    <div className="sign-up-container center">
      <Login  formData ={formData}  setFormData={setFormData} setErrors={setErrors}
       errors={errors} handleChange={handleChange} 
       />
      
    </div>
  );
};
