

import { useState } from 'react';
import { Register } from './Components/Register';



export const RegisterPage = () => {

    const userData={
        username:'',
        password:'',
        email:'',
        confirm_password:'',
        company:"company",
        first_name:"",
        last_name:""
    }
    const [formData,setFormData]=useState(userData);

    

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    
     
          /* {errors.password && <p className="error">{errors.password}</p>}*/
    
  return (
   <>
      <div>
        <Register formData={formData} handleChange={handleChange}></Register>
            
      </div>
   </>
  )
}
