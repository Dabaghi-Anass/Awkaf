import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { ZakatContext } from '../Components/ZakatProvider';
import { ZakatPrice } from './ZakatPrice';

export const CalForm = () => {
    const { zakatFormInfos, setZakatFormInfos, setIsUnnaire, calculateZakat, showResault } = useContext(ZakatContext);
    const [companyTypes, setCompanyTypes] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
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
      console.log("Company Types:", companyTypes);
    
    
      useEffect(() => {
        const fetchFields = async () => {
            if (!selectedCompany?.id) return; // Prevent fetching if no company is selected
    
            try {
                const response = await fetch(`http://localhost:8000/api/company-types/${selectedCompany.id}/fields/`);
                
                if (!response.ok) {
                    const errorData = await response.json(); // Get error details
                    throw new Error(errorData.error || `Error ${response.status}: Failed to fetch fields`);
                }
    
                const data = await response.json();
                setFields(data);
            } catch (error) {
                console.error("Error fetching fields:", error);
                alert(`Error fetching fields: ${error.message}`);
            }
        };
    
        fetchFields();
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
                                onChange={(e) => setSelectedCompany(e.target.value)}
                            >
                                <option value="">اختر نوع الشركة</option>
                                {companyTypes.map(company => (
                                    <option key={company.name} value={company.id}>{company.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Dynamic Input Fields */}
                        {fields.map(field => (
                            <div className="bg-whiteflex flex-col gap-1 mb-5" key={field.id}>
                                <label className="text-gray-700 text-[1em] font-semibold">{field.name}</label>
                                <div className="relative w-full">
                                    <input
                                        className="cal-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 pr-10 text-right"
                                        type="text"
                                        name={field.name}
                                        min={0}
                                        value={formatNumber(zakatFormInfos[field.name])}
                                        onChange={handleChange}
                                        placeholder='00,000'
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
            </div>

            {/* Display Zakat Result */}
            {showResault && <ZakatPrice />}
        </div>
    );
};
