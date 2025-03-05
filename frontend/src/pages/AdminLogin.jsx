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
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");  // Store OTP input

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
                  secret_key: data.secretKey
              })
          });
  
          const result = await response.json();
          console.log("API Response:", result);
  
          if (response.ok && result.message === "OTP sent to your email. Enter OTP to proceed.") {
              setOtpSent(true);
              alert("OTP sent to your email. Enter it below.");
          } else if (result.access && result.refresh) {
              localStorage.setItem("accessToken", result.access);
              localStorage.setItem("refreshToken", result.refresh);
              console.log("Stored Tokens:", localStorage.getItem("accessToken"), localStorage.getItem("refreshToken"));
              navigate("/");
          } else {
              alert(result.detail || "Login failed");
          }
      } catch (error) {
          console.error("Login failed:", error);
      }
  };
  const [otpCode, setOtpCode] = useState("");  // ✅ Fix: State for OTP
  const handleOtpChange = (e) => {  // ✅ Function to update OTP input
    setOtpCode(e.target.value);
};
const handleOtpSubmit = async (e) => {
  e.preventDefault();

  try {
      console.log("Entered OTP:", otpCode);
      console.log("Username:", data.username);  // ✅ Debug username

      const response = await fetch("http://127.0.0.1:8000/apif/admin/verify/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              username: data.username,  // ✅ Send username
              otp: otpCode
          }),
      });

      const responseText = await response.text();
      console.log("Raw OTP API Response:", responseText);

      if (!response.ok) {
          try {
              const errorData = JSON.parse(responseText);
              console.error("OTP verification error:", errorData);
              alert(errorData.error || "OTP verification failed!");
          } catch (jsonError) {
              console.error("Failed to parse error response:", jsonError);
              alert("OTP verification failed. Unexpected response format.");
          }
          return;
      }

      const tokens = JSON.parse(responseText);
      localStorage.setItem("accessToken", tokens.access_token);
      localStorage.setItem("refreshToken", tokens.refresh_token);

      console.log("OTP Verified! Tokens stored:", tokens);
      alert("OTP Verified! You are logged in.");
      navigate("/");  
  } catch (error) {
      console.error("OTP verification failed:", error);
  }
};



  
  
    
return (
  <div className="admin-register-container center">
      <form className="admin-register-form" onSubmit={otpSent ? handleOtpSubmit : handleSubmit}>
          {!otpSent ? (
              <>
                  <div>
                      <label>Username</label> <br />
                      <input type="text" name="username" onChange={handleChange} value={data.username} required />
                  </div>

                  <div>
                      <label>Password</label> <br />
                      <input type="password" name="password" onChange={handleChange} value={data.password} required />
                  </div>

                  <div>
                      <label>Secret Key</label> <br />
                      <input type="text" name="secretKey" onChange={handleChange} value={data.secretKey} required />
                  </div>

                  <button type="submit">Submit</button>
              </>
          ) : (
              <>
                  <div>
                      <label>Enter OTP</label> <br />
                      <input type="text" name="otp" onChange={handleOtpChange} value={otpCode} required />
                  </div>

                  <button type="submit">Verify OTP</button>
              </>
          )}
      </form>
  </div>
);

}
