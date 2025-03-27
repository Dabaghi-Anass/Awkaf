import React, { useState } from "react";

const AdminFormBuilder = () => {
  const [companyName, setCompanyName] = useState("");
  const [fields, setFields] = useState([]);
  const [calculationMethod, setCalculationMethod] = useState("");

  const addField = () => {
    setFields([...fields, { name: "", type: "text" }]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const companyData = {
      companyName,
      fields,
      calculationMethod,
    };
    setFields([]);
    console.log("Company Type Created:", companyData);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-green-700">Créer un Type d'Entreprise</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Nom du Type d'Entreprise</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />

        <h3 className="mt-4 font-semibold text-green-700">Champs de Données</h3>
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={field.name}
              onChange={(e) => updateField(index, "name", e.target.value)}
              placeholder="Nom du champ"
              className="flex-1 px-3 py-2 border rounded-md focus:ring-green-600"
              required
            />
            <select
              value={field.type}
              onChange={(e) => updateField(index, "type", e.target.value)}
              className="px-3 py-2 border rounded-md focus:ring-green-600"
            >
              <option value="text">Texte</option>
              <option value="number">Nombre</option>
            </select>
            <button
              type="button"
              onClick={() => removeField(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="mt-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
        >
          Ajouter un champ
        </button>

        <h3 className="mt-4 font-semibold text-green-700">Méthode de Calcul</h3>
        <textarea
          value={calculationMethod}
          onChange={(e) => setCalculationMethod(e.target.value)}
          placeholder="Définissez la méthode de calcul de la Zakat"
          className="w-full px-3 py-2 border rounded-md focus:ring-green-600"
          required
        />

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-900"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default AdminFormBuilder;
