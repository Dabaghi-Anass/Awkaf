import React, { useState } from "react";

const AdminFormBuilder = () => {
  const [companyName, setCompanyName] = useState("");
  const [fields, setFields] = useState([]);
  const [calculationMethod, setCalculationMethod] = useState("");

  const addField = () => {
    const newField = { name: "", variable: `x${fields.length + 1}` };
    setFields([...fields, newField]);
  };

  const updateField = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].name = value;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure fields only contain valid strings
    const cleanedFields = fields.map(field => typeof field === "string" ? field.trim() : "").filter(field => field !== "");
    
    if (cleanedFields.length === 0) {
        alert("Please add at least one valid field.");
        return;
    }

    const companyData = {
        name: companyName,
        calculation_method: calculationMethod,
        fields: cleanedFields, // ✅ Ensuring only strings are sent
    };

    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Authentication required! Please log in.");
            return;
        }

        const response = await fetch("http://localhost:8000/apif/create-company-with-fields/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(companyData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to create company type");
        }

        alert("Company Type Created Successfully!");
        setCompanyName("");
        setFields([]);
        setCalculationMethod("");
    } catch (error) {
        console.error("Error creating company type:", error);
        alert(`Error: ${error.message}`);
    }
};

  return (
    <div dir="rtl" className="max-w-3xl mx-auto mt-10 p-8 bg-green-600 shadow-md rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-[#035116] text-center mb-6">
        إنشاء نوع شركة
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">اسم الشركة</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="أدخل اسم الشركة"
            className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-[#035116] text-right"
            required
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">الحقول</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={field.name}
                onChange={(e) => updateField(index, e.target.value)}
                placeholder="أدخل اسم الحقل"
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#035116] text-right"
                required
              />
              <span className="text-gray-500">({field.variable})</span>
              <button
                type="button"
                onClick={() => removeField(index)}
                className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addField}
            className="mt-3 w-full py-2 bg-[#035116] text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-green-900"
          >
            + إضافة حقل
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">صيغة الحساب</h3>
          <textarea
            value={calculationMethod}
            onChange={(e) => setCalculationMethod(e.target.value)}
            placeholder="استخدم المتغيرات مثل x1 + x2 * 2.5 / 100"
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[#035116] text-right"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#FBBF24] text-[#035116] text-xl font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-[#FACC15] hover:scale-105 active:scale-95"
        >
          حفظ الشركة
        </button>
      </form>
    </div>
  );
};

export default AdminFormBuilder;