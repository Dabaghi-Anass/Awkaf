import React, { useState } from 'react';
import '../CSS/AdminRegister.css';

export const AdminRegister = () => {
    const initialAdminData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''  // ✅ Add confirmPassword
    };

    const [adminForm, setAdminForm] = useState(initialAdminData);

    const handleAdmin = (e) => {
        const { name, value } = e.target;
        setAdminForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Sending data:", adminForm); // ✅ Log request data

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/admin/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adminForm),
            });

            const data = await response.json();
            console.log("Response data:", data); // ✅ Log response

            if (response.ok) {
                alert("Admin registered successfully!");
                setAdminForm(initialAdminData); // Reset form
            } else {
                alert("Something went wrong: " + JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <div className="admin-register-container center">
            <form className="admin-register-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username</label> <br />
                    <input type="text" name="username" onChange={handleAdmin} value={adminForm.username} required />
                </div>
                <div>
                    <label>Email</label> <br />
                    <input type="email" name="email" onChange={handleAdmin} value={adminForm.email} required />
                </div>
                <div>
                    <label>Password</label> <br />
                    <input  name="password" onChange={handleAdmin} value={adminForm.password} required />
                </div>
                <div>
                    <label>Confirm Password</label> <br />
                    <input  name="confirmPassword" onChange={handleAdmin} value={adminForm.confirmPassword} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
