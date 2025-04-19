import React, { useState } from "react";

const AdminFormBuilder = () => {
  const [companyName, setCompanyName] = useState("");
  const [fields, setFields] = useState([]);
  const [calculationMethod, setCalculationMethod] = useState("");

  const addField = () => {
    setFields([...fields, { name: "", label: "" }]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedFields = fields.filter(
      (field) => typeof field.name === "string" && field.name.trim() !== ""
    );

    if (cleanedFields.length === 0) {
      alert("Please add at least one valid field.");
      return;
    }

    const companyData = {
      name: companyName,
      calculation_method: calculationMethod,
      fields: cleanedFields,
    };

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Authentication required! Please log in.");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/apif/create-company-with-fields/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(companyData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
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
    <div className="w-full text-white   p-8 bg-green-800 shadow-md rounded-2xl ">
      <h2 className="text-2xl font-bold text-center mb-6">Create Company Type</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-green-500 text-black"
            required
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Fields</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateField(index, "label", e.target.value)}
                placeholder="Field label"
                className="flex-grow p-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="text"
                value={field.name}
                onChange={(e) => updateField(index, "name", e.target.value)}
                placeholder="Variable (for calculations)"
                className="flex-grow bg-white p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-red-600 transition"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addField}
            className="mt-3 w-full py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-green-600"
          >
            + Add Field
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Calculation Formula</h3>
          <textarea
            value={calculationMethod}
            onChange={(e) => setCalculationMethod(e.target.value)}
            placeholder="Example: (variable1 + variable2) - (variable3 + variable4)"
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white text-xl font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-green-600  "
        >
          Save Company
        </button>
      </form>
    </div>
  );
};

export default AdminFormBuilder;
