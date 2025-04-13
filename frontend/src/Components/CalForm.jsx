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
      companyTypes.map((company) => console.log("Company:", company));
     
    
    
      useEffect(() => {
        if (selectedCompany) {
            console.log("Using existing fields for company:", selectedCompany);
            setFields(selectedCompany.custom_fields); // Directly set fields from selectedCompany
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
        <div dir='rtl' className="flex flex-col p-15 bg-gray-200 ">
            <div className=" bg-white w-3/4 mx-auto rounded-lg  shadow-lg  p-8 mt-15 "> 
                <h1 className="text-center py-3  text-[1.5em] font-bold text-green-500">أدخل بياناتك لمعرفة مقدار الزكاة المستحق</h1>
                <div className='bg-white p-5 rounded-lg'>
                    <form className="mx-auto  bg-[#fff]  px-10 truncate"
                        onSubmit={(e) => { e.preventDefault(); calculateZakat(); }}>
                        
                        {/* Select Company Type */}
                        <div className="flex flex-col gap-1 mb-5">
                            <label className="text-gray-700 font-semibold text-sm">نوع الشركة</label>
                            <select 
                                className="cal-input text-sm w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-10 text-right mt-1"
                                onChange={(e) => {
                                    const selected = companyTypes.find(c => c.id === parseInt(e.target.value));
                                    setSelectedCompany(selected ?? null); // Ensure we never set undefined
                                }}
                                disabled={companyTypes.length === 0} // Disable if no companies available
                            >
                                <option value="">{companyTypes.length === 0 ? "لا توجد شركات متاحة" : "اختر نوع الشركة"}</option>
                                {companyTypes.map(company => (
                                    <option key={company.id} value={company.id}>{company.name}</option>
                                ))}
                            </select>


                        </div>

                        {/* Dynamic Input Fields */}
                        {fields.map((field, index) => (
                            <div className="bg-white flex flex-col gap-1 mb-5" key={index}>
                                <label className="text-gray-700 text-sm font-semibold">{field.label}</label>
                                <div className="relative w-full">
                                    <input
                                        className="cal-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-10 text-right"
                                        type="text"
                                        name={field.name}  // Use the field name directly
                                        min={0}
                                        value={formatNumber(zakatFormInfos[field.name] || "")}  // Prevent undefined errors
                                        onChange={handleChange}
                                        placeholder="00,000"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">دج</span>
                                </div>
                            </div>
                        ))}

 
                        {/* Select Dropdown */}
                        <div className="flex flex-col gap-1 mb-5">
                            <label className="text-gray-700 font-semibold text-sm">نوع الحول</label>
                            <select
                                className="cal-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm pr-10 text-right mt-1"
                                onChange={(e) => setIsUnnaire(e.target.value === "هجري")}
                            >
                                <option value="هجري">هجري</option>
                                <option value="ميلادي">ميلادي</option>
                                
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full py-3 mt-6 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-green-600 "
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
