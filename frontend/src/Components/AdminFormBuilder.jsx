import { useState } from "react";

const AdminFormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");

  const addField = () => {
    if (newFieldName.trim() !== "") {
      setFields([...fields, { name: newFieldName, type: "text" }]);
      setNewFieldName("");
    }
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-green-700">Créer un type d’entreprise</h2>

      {/* Input for new field */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Nom du champ"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={addField}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ajouter
        </button>
      </div>

      {/* Display created fields */}
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center justify-between border p-2 rounded">
            <span className="text-gray-700">{field.name}</span>
            <button
              onClick={() => removeField(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Enregistrer
      </button>
    </div>
  );
};

export default AdminFormBuilder;
