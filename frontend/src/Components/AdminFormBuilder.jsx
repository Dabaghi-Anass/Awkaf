import React, { useState } from "react";
import {Trash} from '../assets/icons/trash.jsx';
import {Add} from '../assets/icons/Add.jsx';
import '../CSS/DashboardAdmin.css';
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
            className="mb-1 mr-2 custom-input py-2 px-3 w-[40%]"
          />
          <input
            type="text"
            placeholder="Name"
            value={field.name}
            onChange={(e) => updateField(currentPath, "name", e.target.value)}
            className="mb-1 custom-input py-2 px-3"
          />
         <div className="inline-flex align-middle gap-2.5">
  <button
    type="button"
    onClick={() => removeField(currentPath)}
    className="ml-2 text-white  px-2 py-1 rounded"
  >
    <Trash></Trash>
  </button>

  {/* Only allow adding sub-fields if it's a top-level field */}
  {path.length === 0 && (
    <button
      type="button"
      onClick={() => addField(index)}
      className="ml-2 flex items-center text-white text-[15px] custom-button rounded-[10px] px-2 py-1"
    >
      <Add></Add>Sub-field
    </button>
  )}
</div>

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
    <div className="w-full bg-white border-gray-800 border-3 p-6 mt-10  mx-auto  shadow rounded-[15px]">
      <h2 className="text-3xl text-blue-950 font-bold mb-6 text-center">Create Company Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="custom-input w-full py-2 px-3 mb-3"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        
        <div>
          <h3 className="font-semibold text-blue-950  mb-2">Fields</h3>
          {renderFields(fields)}
          <button
            type="button"
            onClick={() => addField(null)}
            className="custom-button flex items-center py-2 px-5 rounded-[10px]"
          >
            <Add></Add> Add Field
          </button>
        </div>
        <textarea
          className="custom-input mt-8 w-full py-2 px-3"
          placeholder="Calculation formula"
          value={calculationMethod}
          onChange={(e) => setCalculationMethod(e.target.value)}
        />
        <button type="submit" className="block mt-6 custom-button  py-2 px-5 rounded-[10px] font-bold">
          Save Company
        </button>
      </form>
    </div>
  );
};

export default AdminFormBuilder;
