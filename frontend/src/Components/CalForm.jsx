import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { ZakatContext } from '../Components/ZakatProvider';
import { ZakatPrice } from './ZakatPrice';

export const CalForm = () => {
    const { zakatFormInfos, setZakatFormInfos, setIsUnnaire, calculateZakat, showResult,selectedCompany,setSelectedCompany } = useContext(ZakatContext);
    const [companyTypes, setCompanyTypes] = useState([]);
   
    const [fields, setFields] = useState([]);

    const fetchCompanyTypes = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("Authentication required! Please log in.");
                return;
            }
    
            const response = await fetch("http://localhost:8000/apif/company-types/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Get error details
                throw new Error(errorData.error || "Failed to fetch company types");
            }
    
            const data = await response.json();
            setCompanyTypes(data); // Assuming you have a state setter for company types
        } catch (error) {
            console.error("Error fetching company types:", error);
            alert(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchCompanyTypes();
        
      }, []);
     
    
    
      useEffect(() => {
        if (selectedCompany) {
            console.log("Using existing fields for company:", selectedCompany);
            setFields(selectedCompany.fields); // Directly set fields from selectedCompany
        } else {
            setFields([]); // Reset fields when no company is selected
        }
    }, [selectedCompany]);
    
    
    
  
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        const rawValue = value.replace(/,/g, "");
        if (!isNaN(rawValue) && rawValue >= 0) {
            setZakatFormInfos(prev => ({ ...prev, [name]: rawValue }));
        }
    };

    const formatNumber = (num) => (!num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    return (
        <div dir='rtl' className="flex flex-col mt-15">
            <div className="p-10 bg-green-800 w-fit mx-auto rounded-3xl"> 
                <h1 className="text-center py-3 mb-5 text-2xl font-bold text-white">أدخل بياناتك لمعرفة مقدار الزكاة المستحق</h1>
                <div className='bg-white p-5 rounded-lg'>
                    <form className="mx-auto w-[40em] bg-[#fff] py-5 px-10 truncate"
                        onSubmit={(e) => { e.preventDefault(); calculateZakat(); }}>
                        
                        {/* Select Company Type */}
                        <div className="flex flex-col gap-1 mb-5">
                            <label className="text-gray-700 font-semibold text-[1em]">نوع الشركة</label>
                            <select 
                            className="cal-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-10 text-right mt-1"
                             onChange={(e) => {
                                const selected = companyTypes.find(c => c.id === parseInt(e.target.value));
                                setSelectedCompany(selected || null);

                            }}>
                                <option value="">Select a company</option>
                                {companyTypes.map(company => (
                                    <option key={company.id} value={company.id}>{company.name}</option>
                                ))}
                            </select>

                        </div>

                        {/* Dynamic Input Fields */}
                        {fields.map((field, index) => (
                            <div className="bg-white flex flex-col gap-1 mb-5" key={`${selectedCompany.id}-${index}`}>
                                <label className="text-gray-700 text-[1em] font-semibold">{field}</label>
                                <div className="relative w-full">
                                    <input
                                        className="cal-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-10 text-right"
                                        type="text"
                                        name={field}  // Use the field name directly
                                        min={0}
                                        value={formatNumber(zakatFormInfos[field] || "")}  // Prevent undefined errors
                                        onChange={handleChange}
                                        placeholder="00,000"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">دج</span>
                                </div>
                            </div>
                        ))}

 
                        {/* Select Dropdown */}
                        <div className="flex flex-col gap-1 mb-5">
                            <label className="text-gray-700 font-semibold text-[1em]">نوع الحول</label>
                            <select
                                className="cal-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-10 text-right mt-1"
                                onChange={(e) => setIsUnnaire(e.target.value === "هجري")}
                            >
                                <option value="ميلادي">ميلادي</option>
                                <option value="هجري">هجري</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full py-3 mt-6 bg-[#FBBF24] text-[#035116] text-xl font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-[#FACC15] hover:scale-105 active:scale-95"
                            type="submit" onClick={(e) => { e.preventDefault(); calculateZakat(); }}>
                            حساب الزكاة
                        </button>
                    </form>
                </div>
                {showResult && <ZakatPrice />}
            </div>

            {/* Display Zakat Result */}
           
        </div>
    );
};
