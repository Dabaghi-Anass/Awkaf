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
                setLoginError(result.detail || "Invalid username or password.");
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
        <div className="wrapper">
            <header>Login Form</header>
            {loginError && <div className="error-message">{loginError}</div>}
            <form ref={formRef} onSubmit={otpSent ? handleOtpSubmit : handleSubmit} className='login-form'>
                {!otpSent ? (
                    <>
                        <div className="field username">
                            <div className="input-area">
                                <input ref={usernameRef} type="text" placeholder="Username" name='username' value={data.username} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="field password">
                            <div className="input-area">
                                <input ref={passwordRef} type="password" placeholder="Password" name='password' value={data.password} onChange={handleChange} />
                            </div>
                        </div>
                        <input type="submit" value="Login" />
                    </>
                ) : (
                    <>
                        <div className="field otp">
                            <div className="input-area">
                                <input type="text" placeholder="Enter OTP" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit">Verify OTP</button>
                    </>
                )}
            </form>
        </div>
    );
};