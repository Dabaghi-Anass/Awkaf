import '../CSS/Login.css';
import React, { useState } from 'react';
import validation from './validation';

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validation(data);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log(data);
            setData({
                email: "",
                password: ""
            });
        }
    };

    return (
        <div className="Login-container">
            <h2 className='title'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="email"
                        value={data.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <label>Email Address</label>
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        value={data.password}
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <label>Password</label>
                </div>
                <div className='login-btn-cont'>
                    <button type="submit" className="login-btn">Login</button>
                </div>
                <p className="Or">Or</p>
                <p className='login-with'>Login with</p>
                <div className="other-ways">
                    <div className="icon"></div>
                    <div className="icon"></div>
                    <div className="icon"></div>
                    <div className="icon"></div>
                </div>
                <div className="no-account">
                    <p>
                        <span className='dont-have-acc'>Don't have an account?</span>
                        <a href="">Sign up</a>
                        <span className='line'></span>
                        <span className='terms'>Read terms and conditions</span>
                    </p>
                </div>
            </form>
        </div>
    );
}
