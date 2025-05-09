import React, { useContext, useState, useEffect } from 'react';
import { ZakatContext } from '../Components/ZakatProvider';
import { ZakatPrice } from './ZakatPrice';

export const CalForm = () => {
  const { zakatFormInfos, setZakatFormInfos, setIsUnnaire, calculateZakat, showResult, selectedCompany, setSelectedCompany } = useContext(ZakatContext);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchCompanyTypes = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return alert("Authentication required!");

        const response = await fetch("http://localhost:8000/apif/company-types/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch companies");
        }

        const data = await response.json();
        setCompanyTypes(data);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    fetchCompanyTypes();
  }, []);
  console.log("Fetched Company:", companyTypes);

  useEffect(() => {
    if (selectedCompany) {
      setFields(selectedCompany.fields || []);
    } else {
      setFields([]);
    }
  }, [selectedCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/,/g, "");
    if (!isNaN(rawValue) && rawValue >= 0) {
      setZakatFormInfos(prev => ({ ...prev, [name]: rawValue }));
    }
  };

  const formatNumber = (num) =>
    !num ? "" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const renderInputs = (fieldList) =>
    fieldList.map((field, index) => (
      <div key={index}>
        {field.children && field.children.length > 0 ? (
          <>
            <div className="font-semibold text-green-700 text-[1.2em] mt-4">{field.label}</div>
            <div className="ml-4">{renderInputs(field.children)}</div>
          </>
        ) : (
          <div className="mb-4">
            <label className="text-gray-700 text-sm font-semibold">{field.label}</label>
            <div className="relative w-full">
              <input
                className="w-full h-10 p-2 border custom-input pr-10"
                type="text"
                name={field.name}
                value={formatNumber(zakatFormInfos[field.name] || "")}
                onChange={handleChange}
                placeholder="00,000"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">دج</span>
            </div>
          </div>
        )}
      </div>
    ));
   
  return (
    <div dir="rtl" className="flex flex-col p-15 bg-gray-200">
      <div className="bg-white w-[40em] mx-auto rounded-lg shadow-lg p-8 mt-15">
        <h1 className="text-center text-[1.5em] font-bold text-green-500">
          أدخل بياناتك لمعرفة مقدار الزكاة المستحق
        </h1>
        <form onSubmit={(e) => { e.preventDefault(); calculateZakat(); }} className="bg-white p-5 rounded-lg">
          <div className="mb-5">
            <label className="text-gray-700 font-semibold text-sm">نوع الشركة</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg text-sm text-right mt-1"
              onChange={(e) => {
                const selected = companyTypes.find(c => c.id === parseInt(e.target.value));
                setSelectedCompany(selected ?? null);
              }}
            >
              <option value="">{companyTypes.length === 0 ? "لا توجد شركات متاحة" : "اختر نوع الشركة"}</option>
              {companyTypes.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
         

          {/* Render Nested Fields */}
          {renderInputs(fields)}

          <div className="mb-5">
            <label className="text-gray-700 font-semibold text-sm">نوع الحول</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg text-sm pr-10 text-right mt-1"
              onChange={(e) => setIsUnnaire(e.target.value === "هجري")}
            >
              <option value="هجري">هجري</option>
              <option value="ميلادي">ميلادي</option>
            </select>
          </div>

          <button
            className="block mx-auto py-3 w-1/2 mt-6 custom-button rounded-[10px]"
            type="submit"
          >
            حساب الزكاة
          </button>
        </form>

        {showResult && <ZakatPrice />}
      </div>
    </div>
  );
};
