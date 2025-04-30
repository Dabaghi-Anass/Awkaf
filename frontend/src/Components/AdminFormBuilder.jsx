import React, { useState } from "react";

const AdminFormBuilder = () => {
  const [companyName, setCompanyName] = useState("");
  const [fields, setFields] = useState([]);
  const [calculationMethod, setCalculationMethod] = useState("");

  const addField = () => {
    setFields([...fields, { name: "", label: "", children: [] }]);
  };

  const addChildField = (parentIndex) => {
    const updatedFields = [...fields];
    if (!updatedFields[parentIndex].children) {
      updatedFields[parentIndex].children = [];
    }
    updatedFields[parentIndex].children.push({ name: "", label: "" });
    setFields(updatedFields);
  };

  const updateField = (index, key, value, isChild = false, childIndex = null) => {
    const updatedFields = [...fields];
    if (isChild) {
      updatedFields[index].children[childIndex][key] = value;
    } else {
      updatedFields[index][key] = value;
    }
    setFields(updatedFields);
  };

  const removeField = (index, isChild = false, childIndex = null) => {
    const updatedFields = [...fields];
    if (isChild) {
      updatedFields[index].children = updatedFields[index].children.filter(
        (_, i) => i !== childIndex
      );
    } else {
      updatedFields.splice(index, 1);
    }
    setFields(updatedFields);
  };

  const cleanFields = (fieldsList) =>
    fieldsList
      .filter((field) => typeof field.name === "string" && field.name.trim() !== "")
      .map((field) => ({
        name: field.name,
        label: field.label,
        children: field.children ? cleanFields(field.children) : [],
      }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedFields = cleanFields(fields);

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
    <div className="w-full text-green-400 p-8 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create Company Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
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
          <h3 className="text-sm font-medium mb-1">Fields</h3>
          {fields.map((field, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md bg-white">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                  placeholder="Field label"
                  className="flex-grow p-2 border text-black rounded"
                  required
                />
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => updateField(index, "name", e.target.value)}
                  placeholder="Variable"
                  className="flex-grow p-2 border text-black rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  X
                </button>
              </div>

              {/* Render child fields */}
              {field.children && field.children.length > 0 && (
                <div className="ml-4 space-y-2">
                  {field.children.map((child, childIndex) => (
                    <div key={childIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={child.label}
                        onChange={(e) =>
                          updateField(index, "label", e.target.value, true, childIndex)
                        }
                        placeholder="Child label"
                        className="flex-grow p-2 border text-black rounded"
                        required
                      />
                      <input
                        type="text"
                        value={child.name}
                        onChange={(e) =>
                          updateField(index, "name", e.target.value, true, childIndex)
                        }
                        placeholder="Child variable"
                        className="flex-grow p-2 border text-black rounded"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeField(index, true, childIndex)}
                        className="px-3 py-1 bg-red-400 text-white rounded"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => addChildField(index)}
                className="mt-2 text-sm bg-green-200 px-3 py-1 rounded"
              >
                + Add Child Field
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addField}
            className="mt-3 w-full py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md transition hover:bg-green-600"
          >
            + Add Field
          </button>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Calculation Formula</h3>
          <textarea
            value={calculationMethod}
            onChange={(e) => setCalculationMethod(e.target.value)}
            placeholder="Example: (variable1 + variable2) - variable3"
            className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white text-lg font-bold rounded-lg shadow-md transition hover:bg-green-600"
        >
          Save Company
        </button>
      </form>
    </div>
  );
};

export default AdminFormBuilder;
