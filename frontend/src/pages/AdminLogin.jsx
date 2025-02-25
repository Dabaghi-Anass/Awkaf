import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export const AdminLogin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
      username: "",
      password: "",
      secretKey:"",
    });
    const handleChange =(e)=>{
        const {name,value}=e.target;
        setData(d=>({...d,[name]:value}));
    }
    
     const handleSubmit = async (e) => {
        e.preventDefault();

    
          try {
            const response = await fetch("http://127.0.0.1:8000/apif/admin/login/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: data.username,
                password: data.password,
                secret_key:data.secretKey
              })
            });
    
            if (response.ok) {
              const tokens = await response.json();
    
              // Save tokens to localStorage
              localStorage.setItem("accessToken", tokens.access);
              localStorage.setItem("refreshToken", tokens.refresh);
    
              console.log("You are logged in!");
              navigate('/');
            } 
          } catch (error) {
            console.error("Login failed:", error);
          }
        
      };
    
    
  return (
    <>
        <div className="admin-register-container center">
            <form className="admin-register-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username</label> <br />
                    <input type="text" name="username" onChange={handleChange} value={data.username} required />
                </div>
                
                <div>
                    <label>Password</label> <br />
                    <input  name="password" onChange={handleChange} value={data.password} required />
                </div>
                <div>
                    <label>secret key</label> <br />
                    <input  name="secretKey" onChange={handleChange} value={data.secretKey} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </>
    
  )
}
