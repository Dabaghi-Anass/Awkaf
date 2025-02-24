import React, { useState } from 'react'
import { SendMessage } from '../Components/SendMessage'
import { Header } from '../Components/Header'

export const Contact = () => {
    const defaultValue ={
        first_name:"",
        last_name:"",
        sender_email:"",
        phone:"",
        message:"",
    }
    const [userMessage,setUserMessage]=useState(defaultValue)

    const handleChange =(e)=>{
        const {name,value}=e.target;
        setUserMessage(u=>({...u,[name]:value}));
    }
  return (
        <>
        <Header></Header>
            <div className='contact-container center'>
                <div className="con">
                    <div className="contact-text">
                            <h1>To contact us</h1>
                            <p>راسلنا عبر البريد الإلكتروني، اتصل، أو املأ النموذج لمعرفة كيف يمكننا حل مشكلة المراسلة لديك.</p>
                    </div>
                        <SendMessage userMessage={userMessage}
                        setUserMessage={setUserMessage}
                        handleChange={handleChange} 
                        defaultValue={defaultValue} />
                        
                        <div className="deco"></div>
                        <div className="deco two"></div>
                </div>
            </div>
                
        </>
  )
}
