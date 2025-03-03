import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

export const Login = ({handleChange,data}) => {
    // Références pour le formulaire et ses champs
    const formRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    // Fonction de validation et soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        const usernameField = usernameRef.current.closest(".field");
        const passwordField = passwordRef.current.closest(".field");

        const usernameInput = usernameRef.current;
        const passwordInput = passwordRef.current;

        // Vérification des champs
        if (data.username === "") {
            usernameField.classList.add("shake", "error");
        } else {
            checkUsername();
        }

        if (data.password === "") {
            passwordField.classList.add("shake", "error");
        } else {
            checkPass();
        }

        setTimeout(() => {
            usernameField.classList.remove("shake");
            passwordField.classList.remove("shake");
        }, 500);

        usernameInput.addEventListener("keyup", checkUsername);
        passwordInput.addEventListener("keyup", checkPass);

        function checkUsername() {
            if (data.username === "") {
                usernameField.classList.add("error");
                usernameField.classList.remove("valid");
                usernameField.querySelector(".error-txt").innerText = "Username can't be blank";
            } else {
                usernameField.classList.remove("error");
                usernameField.classList.add("valid");
            }
        }

        function checkPass() {
            if (data.password === "") {
                passwordField.classList.add("error");
                passwordField.classList.remove("valid");
            } else {
                passwordField.classList.remove("error");
                passwordField.classList.add("valid");
            }
        }

        if (usernameField.classList.contains("error") || passwordField.classList.contains("error")) {
            return; // Ne pas envoyer la requête si validation échoue
        }

        // 🔹 Envoi de la requête au serveur pour l'authentification
        try {
            const response = await fetch("http://127.0.0.1:8000/apif/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const tokens = await response.json();

                // Sauvegarde des tokens dans localStorage
                localStorage.setItem("accessToken", tokens.access);
                localStorage.setItem("refreshToken", tokens.refresh);

                console.log("You are logged in!");
                navigate('/'); // Redirection après connexion réussie
            } else {
                setLoginError("Invalid username or password. Please try again.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setLoginError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <>
            <div className="wrapper">
                <header>Login Form</header>
                {loginError && <div className="error-message">{loginError}</div>}
                <form ref={formRef} action="#" onSubmit={handleSubmit} className='login-form'>
                    <div className="field username">
                        <div className="input-area">
                            <input ref={usernameRef} type="text" placeholder="Username" name='username' value={data.username} 
                            onChange={handleChange} />
                            <i className="icon fas fa-user"></i>
                            <i className="error error-icon fas fa-exclamation-circle"></i>
                        </div>
                        <div className="error error-txt">Username can't be blank</div>
                    </div>
                    <div className="field password">
                        <div className="input-area">
                            <input ref={passwordRef} type="password" placeholder="Password"  name='password' value={data.password} 
                            onChange={handleChange} />
                            <i className="icon fas fa-lock"></i>
                            <i className="error error-icon fas fa-exclamation-circle"></i>
                        </div>
                        <div className="error error-txt">Password can't be blank</div>
                    </div>
                    <div className="pass-txt"> <Link className='link' to={""}>Forgot password?</Link> </div> 
                    <input type="submit" value="Login" />
                </form>
                <div className="sign-txt">Not yet a member? <Link className='link' to="/Register">Signup now</Link></div>
            </div>
        </>
    );
};
