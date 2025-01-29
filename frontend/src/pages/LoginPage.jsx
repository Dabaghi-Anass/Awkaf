import React, { useState,useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import validation from './validation';
import '../CSS/Login.css';

export const LoginPage = () => {

    const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(""); // For API errors

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://127.0.0.1:8000/apif/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password
          })
        });

        if (response.ok) {
          const tokens = await response.json();

          // Save tokens to localStorage
          localStorage.setItem("accessToken", tokens.access);
          localStorage.setItem("refreshToken", tokens.refresh);

          console.log("You are logged in!");
          navigate('/');
        } else {
          setLoginError("Invalid username or password. Please try again.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setLoginError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="sign-up-container center">
      <div className="sign-up">
      

        <div className="right-sign-up">
          <div className="top center">
            <div className="welcome">
              <h2>مرحبا بكم</h2>
              <p>الرجاء منكم إدخال معوماتكم الشخصية</p>
            </div>
          </div>

          <div className="middle">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="إسم المستخدم"
                  value={data.username}
                  name="username"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>

              <div className="input-container">
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={data.password}
                  name="password"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="forgot-password-container">
                  {errors.password && <p className="error">{errors.password}</p>}
                  <Link to="/" className="forgot-password">
                    نسيت كلمة المرور?
                  </Link>
                </div>
              </div>

              {loginError && <p className="error">{loginError}</p>}

              <button className="login-btn" type="submit">
                تسجيل الدخول
              </button>
              <div className="no-account center">
                ليس لديك حساب؟ <Link className="signup-login" to="/Register">إِشترك الان</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
