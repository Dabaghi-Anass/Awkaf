import React, { useState } from "react";
import './style.css'
const App = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload-image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onImageUpload(data.image_url); // Pass the image URL to parent
        alert("Image uploaded successfully!");
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="image-upload-container">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
          <button onClick={handleRemoveImage}>Remove</button>
        </div>
      )}
      <button onClick={handleUpload} disabled={!image}>
        Upload Image
      </button>
    </div>
  );
};

export default App;
