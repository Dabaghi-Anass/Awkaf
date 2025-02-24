import React from 'react';
import '../CSS/sendMessage.css';

export const SendMessage = ({ userMessage, handleChange,defaultValue,setUserMessage }) => {
    
    const sendMessage = async (event) => {
        event.preventDefault(); // ✅ Prevent form submission

        try {
            const response = await fetch("http://127.0.0.1:8000/apif/send-email/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userMessage),
            });

            const data = await response.json();
            console.log("Response data:", data); // ✅ Log response

            if (response.ok) {
                alert("Message sent successfully!");
                setUserMessage(defaultValue);
            } else {
                alert("Something went wrong: " + JSON.stringify(data));
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <div className="send-msg-container">
            <h2>Send a message</h2>
            <form onSubmit={sendMessage}>
                <div className="send-msg-input-container">
                    <input type="text" placeholder="First Name" name="first_name" value={userMessage.first_name} onChange={handleChange} />
                    <input type="text" placeholder="Last Name" name="last_name" value={userMessage.last_name} onChange={handleChange} />
                </div>

                <div className="send-msg-input-container full">
                    <input type="text" placeholder="Email" name="sender_email" value={userMessage.sender_email} onChange={handleChange} />
                </div>

                <div className="send-msg-input-container full">
                    <input type="text" placeholder="Phone Number" name="phone" value={userMessage.phone} onChange={handleChange} />
                </div>

                <textarea placeholder="How can we help you?" name="message" value={userMessage.message} onChange={handleChange}></textarea>

                <div className="send-msg-btn-container">
                    <button  className="send-msg button">Send</button>
                </div>
                <p>بالاتصال بنا، فإنك توافق على شروط الخدمة و سياسة الخصوصية الخاصة بنا.</p>
            </form>
        </div>
    );
};
