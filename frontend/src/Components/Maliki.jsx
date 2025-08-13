import App from '@/App';
import React, { useState } from 'react'


export const Maliki = () => {
  
    
    const [selectedMadhab, setSelectedMadhab] = useState("");

  return (
    <>
    <div dir="rtl" className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-center mb-4">أدخل بياناتك لمعرفة مقدار الزكاة المستحق</h1>

      {/* Dropdown to choose madhab */}
      <label className="custom-form-label">اختيار المذهب لحساب الزكاة</label>
      <select
        className=" w-full p-2 border border-gray-300 rounded-lg text-sm text-right mt-1"
        value={selectedMadhab}
        onChange={(e) => setSelectedMadhab(e.target.value)}
      >
        <option value="">-- اختر المذهب --</option>
        <option value="Maliki">ملكي</option>
        <option value="shafii">شافعي</option>
      </select>

      {/* Conditionally render form */}
      {selectedMadhab === "Maliki" && <App />}
      
    </div>
  
    </>
  );
}
