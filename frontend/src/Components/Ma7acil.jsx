import { useState } from 'react';

export const  Ma7acil = () => {
  const [crops, setCrops] = useState([]);
  const [monthType, setMonthType] = useState('hijri');

  const RATES = {
    rain: 0.10,
    mixed: 0.075,
    artificial: 0.05,
  };

  const NISAB = 653; // 653 kg

  const addCrop = () => {
    setCrops(prev => [
      ...prev,
      {
        cropType: '',
        wateringMethod: 'rain',
        quantity: '',
        ownershipType: 'individual',
        ownershipShare: '',
        zakatDue: 0,
      },
    ]);
  };

  const updateCrop = (index, field, value) => {
    const updated = [...crops];
    updated[index][field] = value;
    setCrops(updated);
  };

  const calculateZakat = () => {
    const updated = crops.map(crop => {
      const qty = parseFloat(crop.quantity) || 0;
      const share = parseFloat(crop.ownershipShare) || 0;
      const rate = RATES[crop.wateringMethod] || 0;

      let applicableQty = qty;

      if (crop.ownershipType === 'shared') {
        const shareQty = (qty * share) / 100;
        if (shareQty < NISAB) return { ...crop, zakatDue: 0 };
        applicableQty = shareQty;
      } else {
        if (qty < NISAB) return { ...crop, zakatDue: 0 };
      }

      const zakatDue = applicableQty * rate;
      return { ...crop, zakatDue };
    });

    setCrops(updated);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-green-800">Zakat on Agricultural Crops</h2>

      {crops.map((crop, index) => (
        <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
          <label className="block mb-2 font-semibold">Crop Type:</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={crop.cropType}
            onChange={e => updateCrop(index, 'cropType', e.target.value)}
          />

          <label className="block mb-2 font-semibold">Watering Method:</label>
          <select
            className="w-full p-2 border rounded mb-2"
            value={crop.wateringMethod}
            onChange={e => updateCrop(index, 'wateringMethod', e.target.value)}
          >
            <option value="rain">Rain-fed (10%)</option>
            <option value="mixed">Mixed (7.5%)</option>
            <option value="artificial">Artificial (5%)</option>
          </select>

          <label className="block mb-2 font-semibold">Quantity (kg):</label>
          <input
            type="number"
            className="w-full p-2 border rounded mb-2"
            value={crop.quantity}
            onChange={e => updateCrop(index, 'quantity', e.target.value)}
          />

          <label className="block mb-2 font-semibold">Ownership Type:</label>
          <select
            className="w-full p-2 border rounded mb-2"
            value={crop.ownershipType}
            onChange={e => updateCrop(index, 'ownershipType', e.target.value)}
          >
            <option value="individual">Individual</option>
            <option value="shared">Shared</option>
          </select>

          {crop.ownershipType === 'shared' && (
            <>
              <label className="block mb-2 font-semibold">Your Share (%):</label>
              <input
                type="number"
                className="w-full p-2 border rounded mb-2"
                value={crop.ownershipShare}
                onChange={e => updateCrop(index, 'ownershipShare', e.target.value)}
              />
            </>
          )}

          <div className="mt-2 font-medium">
            Zakat Due: <span className="text-green-700">{crop.zakatDue.toFixed(2)} kg</span>
          </div>
        </div>
      ))}

      <button
        onClick={addCrop}
        className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded mr-4"
      >
        Add Crop
      </button>

      <button
        onClick={calculateZakat}
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded"
      >
        Calculate Zakat
      </button>
    </div>
  );
};


