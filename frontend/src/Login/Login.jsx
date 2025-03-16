import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

export const Login = ({ handleChange, data }) => {
    const formRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [loginError, setLoginError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("Server response:", result);

            if (response.ok && result.message === "OTP sent to your email. Enter OTP to proceed.") {
                setOtpSent(true);
                alert("OTP sent to your email. Enter it below.");
            } else if (result.access && result.refresh) {
                localStorage.setItem("accessToken", result.access);
                localStorage.setItem("refreshToken", result.refresh);
                console.log("You are logged in!");
                navigate('/');
            } else {
                setLoginError(result.detail || "إسم المستخدم او كلمة المرور غير صحيحة");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoginError("An unexpected error occurred. Please try again later.");
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Entered OTP:", otpCode);
            
            const response = await fetch("http://127.0.0.1:8000/apif/token/verify/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
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
        <>
            <div className='h-screen flex items-center justify-center'>
            <div className="wrapper bg-[#035116] w-[30em] pb-15 my-auto rounded-3xl">
            <header className='login-header relative text-center text-4xl text-[#F2CB05] font-bold py-5 mb-15'>تسجيل الدخول</header>
            
            <form dir="rtl" ref={formRef} onSubmit={otpSent ? handleOtpSubmit : handleSubmit} className='login-form  text-center'>
                {!otpSent ? (
                    <>

                        <div className=' my-7'>
                            
                               
                                <input className={`bg-white py-3 px-2 transition-all duration-300 focus:ring-2 focus:ring-amber-300 outline-none rounded-sm w-4/5 ${loginError ? 'border-red-500 ring-red-500' : 'focus:border-[#F2CB05]'}`} ref={usernameRef} type="text" placeholder="إسم المستخدم" name='username' value={data.username} onChange={handleChange} />
                      
                  
                        </div>
                        <div className=' mb-10'>
                        
                        
                                <input className='bg-white py-3 px-2 w-4/5 transition-all duration-300
                                 focus:border-[#F2CB05]  focus:ring-2 focus:ring-amber-300 outline-none
                                rounded-sm    '  ref={passwordRef} type="password" name='password' placeholder="كلمة المرور"  value={data.password} onChange={handleChange}/>  
                                
                                <Link className='inline-block w-4/5 text-right text-sm text-[#F2CB05] font-light hover:underline' to='/'>نسيت كلمة المرور</Link>
                                {loginError && <div className="error-message inline-block w-4/5 text-center text-sm text-red-500 mt-5">{loginError}</div>}
                        </div>
                        
                        <button className='bg-[#F2CB05]  py-2 w-[40%] text-[#035116] rounded-sm font-bold' type="submit" value="Login" >تسجيل</button> <br />
                        <p className='mt-10 text-white'>لا تملك حساب؟ <Link className='inline-block  text-sm text-[#F2CB05] font-light hover:underline' to='/register'>انشاء حساب</Link></p>
                    </>
                ) : (
                    <>
                        <div className="field otp mb-5">
                          
                                <input className='bg-white py-3 px-2 w-1/2 transition-all duration-300
                                 focus:border-green-700  focus:ring-2 focus:ring-green-500 outline-none
                                rounded-sm    ' type="text" placeholder="Enter OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                            
                        </div>
                        <button className='bg-[#F2CB05]  py-2 w-[30%] text-[#035116] rounded-sm font-bold' type="submit">Verify OTP</button>
                    </>
                )}
            </form>
        </div>
            </div>
        </>
    );
};