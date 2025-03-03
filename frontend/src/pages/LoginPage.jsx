import React, { useState,useEffect } from 'react';
import '../CSS/Login.css';
import { Login } from '../Login/Login.jsx';

export const LoginPage = () => {

  
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    setData({
      username: "",
      password: "",
    });
  }, []);

  return (
    <div className="sign-up-container center">
      <Login  data ={data}  setData={setData} setErrors={setErrors}
       errors={errors} handleChange={handleChange} 
       />
      <div className="">
      

      </div>
    </div>
  );
};
