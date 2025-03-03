import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const Register = ({ handleChange, formData }) => {
    const formRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const companyRef = useRef(null);

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        email: "",
        confirm_password: "",
        company: ""
    });

    const navigate = useNavigate();

    // Validate inputs
    const shakeForm = () => {
        if (formRef.current) {
            formRef.current.classList.add("shake");
            setTimeout(() => {
                formRef.current.classList.remove("shake");
            }, 500);
        }
    };

    // Validate inputs
    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username can't be blank";
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email can't be blank";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password can't be blank";
            valid = false;
        }

        if (!formData.confirm_password.trim()) {
            newErrors.confirm_password = "Confirm password can't be blank";
            valid = false;
        } else if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
            valid = false;
        }

        if (!formData.company.trim()) {
            newErrors.company = "Company name can't be blank";
            valid = false;
        }

        setErrors(newErrors);
        if (!valid) shakeForm(); // Trigger shake effect if validation fails
        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        // API Call to Register User
        try {
            const response = await fetch("http://127.0.0.1:8000/apif/user/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log("Registration successful!");
                navigate('/login'); // Redirect to login after registration
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="wrapper">
            <header>Register</header>
            <form ref={formRef} onSubmit={handleSubmit} className='login-form'>

                {/* Username Field */}
                <div className={`field username ${errors.username ? 'error' : ''}`}>
                    <div className="input-area">
                        <input ref={usernameRef} type="text" placeholder="Username" name='username'
                            value={formData.username} onChange={handleChange} />
                        <i className="icon fas fa-user"></i>
                        <i className="error error-icon fas fa-exclamation-circle"></i>
                    </div>
                    {errors.username && <div className="error error-txt">{errors.username}</div>}
                </div>

                {/* Email Field */}
                <div className={`field email ${errors.email ? 'error' : ''}`}>
                    <div className="input-area">
                        <input ref={emailRef} type="email" placeholder="Email" name='email'
                            value={formData.email} onChange={handleChange} />
                        <i className="icon fas fa-envelope"></i>
                        <i className="error error-icon fas fa-exclamation-circle"></i>
                    </div>
                    {errors.email && <div className="error error-txt">{errors.email}</div>}
                </div>

                {/* Password Field */}
                <div className={`field password ${errors.password ? 'error' : ''}`}>
                    <div className="input-area">
                        <input ref={passwordRef} type="password" placeholder="Password" name='password'
                            value={formData.password} onChange={handleChange} />
                        <i className="icon fas fa-lock"></i>
                        <i className="error error-icon fas fa-exclamation-circle"></i>
                    </div>
                    {errors.password && <div className="error error-txt">{errors.password}</div>}
                </div>

                {/* Confirm Password Field */}
                <div className={`field confirm-password ${errors.confirm_password ? 'error' : ''}`}>
                    <div className="input-area">
                        <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" name='confirm_password'
                            value={formData.confirm_password} onChange={handleChange} />
                        <i className="icon fas fa-lock"></i>
                        <i className="error error-icon fas fa-exclamation-circle"></i>
                    </div>
                    {errors.confirm_password && <div className="error error-txt">{errors.confirm_password}</div>}
                </div>

                {/* Company Field */}
                <div className={`field company ${errors.company ? 'error' : ''}`}>
                    <div className="input-area">
                        <input ref={companyRef} type="text" placeholder="Company Name" name='company'
                            value={formData.company} onChange={handleChange} />
                        <i className="icon fas fa-building"></i>
                        <i className="error error-icon fas fa-exclamation-circle"></i>
                    </div>
                    {errors.company && <div className="error error-txt">{errors.company}</div>}
                </div>

                <input type="submit" value="Register" />
            </form>
            <div className="sign-txt">Already a member? <Link className='link' to="/login">Login now</Link></div>
        </div>
    );
};
