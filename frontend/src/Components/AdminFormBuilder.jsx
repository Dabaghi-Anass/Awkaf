import React, { useState } from "react";

const AdminFormBuilder = () => {
  const [companyName, setCompanyName] = useState("");
  const [fields, setFields] = useState([]);
  const [calculationMethod, setCalculationMethod] = useState("");

  const addField = (parentIndex = null) => {
    const newField = { name: "", label: "", children: [] };

    if (parentIndex === null) {
      setFields([...fields, newField]);
    } else {
      const updatedFields = [...fields];
      updatedFields[parentIndex].children.push(newField);
      setFields(updatedFields);
    }
  };

  const updateField = (fieldPath, key, value) => {
    const update = (fieldList, path) => {
      const [index, ...rest] = path;
      if (rest.length === 0) {
        fieldList[index][key] = value;
      } else {
        update(fieldList[index].children, rest);
      }
    };

    const newFields = [...fields];
    update(newFields, fieldPath);
    setFields(newFields);
  };

  const removeField = (fieldPath) => {
    const remove = (fieldList, path) => {
      const [index, ...rest] = path;
      if (rest.length === 0) {
        fieldList.splice(index, 1);
      } else {
        remove(fieldList[index].children, rest);
      }
    };

    const newFields = [...fields];
    remove(newFields, fieldPath);
    setFields(newFields);
  };

  const renderFields = (fieldList, path = []) =>
    fieldList.map((field, index) => {
      const currentPath = [...path, index];
      return (
        <div key={currentPath.join("-")} className="ml-4 mb-4 border-l border-gray-300 pl-4">
          <input
            type="text"
            placeholder="Label"
            value={field.label}
            onChange={(e) => updateField(currentPath, "label", e.target.value)}
            className="mb-1 mr-2 p-2 border text-black"
          />
          <input
            type="text"
            placeholder="Name"
            value={field.name}
            onChange={(e) => updateField(currentPath, "name", e.target.value)}
            className="mb-1 p-2 border text-black"
          />
          <button
            type="button"
            onClick={() => removeField(currentPath)}
            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
          >
            Remove
          </button>
          <button
            type="button"
            onClick={() => addField(index)}
            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          >
            + Sub-field
          </button>
          {field.children && field.children.length > 0 && renderFields(field.children, currentPath)}
        </div>
      );
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      name: companyName,
      calculation_method: calculationMethod,
      fields: fields,
    };

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return alert("Authentication required!");

      const res = await fetch("http://localhost:8000/apif/create-company-with-fields/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }

      alert("Company created!");
      setCompanyName("");
      setCalculationMethod("");
      setFields([]);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Company Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-4 p-2 border text-black"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <textarea
          className="w-full mb-4 p-2 border text-black"
          placeholder="Calculation formula"
          value={calculationMethod}
          onChange={(e) => setCalculationMethod(e.target.value)}
        />
        <div>
          <h3 className="font-semibold mb-2">Fields</h3>
          {renderFields(fields)}
          <button
            type="button"
            onClick={() => addField(null)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Field
          </button>
        </div>
        <button type="submit" className="block mt-6 bg-green-600 text-white px-4 py-2 rounded">
          Save Company
        </button>
      </form>
    </div>
  );
};

export default AdminFormBuilder;
