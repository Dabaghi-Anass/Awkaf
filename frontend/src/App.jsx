import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { Button } from "@/components/ui/button"

function App() {
  const [formData, setFormData] = useState({
    input1:"",
    input2:"",
    input3:"",
    input4:""});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  const claculatZakat=()=>{
      
  }



 

  return (
     <div className="flex min-h-svh flex-col items-center justify-center bg-graay">
      <div className="bg-white w-[30em]  mx-auto rounded-lg shadow-lg p-8 ">
        <div className="form-pattern mx-auto   w-[90%] rounded-lg " >
          <label className="custom-form-label">Dexter Morgan</label>
          <input type="text" placeholder="00,000" className="custom-form-input"/>

          <label className="custom-form-label">Dexter Morgan</label>
          <input type="text" placeholder="00,000" className="custom-form-input"/>

          <label className="custom-form-label">Dexter Morgan</label>
          <input type="text" placeholder="00,000" className="custom-form-input"/>

          <label className="custom-form-label">Dexter Morgan</label>
          <input type="text" placeholder="00,000" className="custom-form-input"/>
          <button className="custom-button mx-auto block rounded-md">Calcul me </button>
        </div>
    
      </div>
       
    </div>
  );
}

export default App;
