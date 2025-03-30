import React, { useState } from "react";

const AdminFormBuilder = () => {
  const [companyName, setCompanyName] = useState("");
  const [fields, setFields] = useState([]);
  const [calculationMethod, setCalculationMethod] = useState("");

  const addField = () => {
    if (fields.length === 0 || fields[fields.length - 1] !== "") {
      setFields([...fields, ""]); // ✅ Only add a new empty input when needed
    }
  };
  
  

  const updateField = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = value; // Directly update the string value
    setFields(updatedFields);
  };
  

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cleanedFields = fields.filter(field => field.trim() !== ""); // ✅ Remove empty fields

    const companyData = {
      name: companyName,
      calculation_method: calculationMethod,
      fields: cleanedFields,  // ✅ Send only valid field names
    };
  
    if (cleanedFields.length === 0) {
      alert("Please add at least one valid field.");
      return;
    }
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
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2>Create Company Type</h2>
      <form onSubmit={handleSubmit}>
        <input
        className="bg-amber-500"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          required
        />
        <h3>Fields</h3>
        {fields.map((field, index) => (
          <div key={index}>
            <input
            className="bg-amber-500"
              type="text"
              value={field}
              onChange={(e) => updateField(index, e.target.value)}

              placeholder="Field Name"
              required
            />
            <button type="button" onClick={() => removeField(index)}>X</button>
          </div>
        ))}
        <button type="button" onClick={addField}>Add Field</button>

        <h3>Calculation Formula</h3>
        <textarea
          value={calculationMethod}
          onChange={(e) => setCalculationMethod(e.target.value)}
          placeholder="Example: (liquidites + stocks) * 2.5 / 100"
          required
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AdminFormBuilder;
