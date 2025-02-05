import React, { useState } from 'react';
import { AdTopBar } from '../Components/AdTopBar';
import { AdRightBar } from '../Components/AdRightBar';
import { AdLeftBar } from '../Components/AdLeftBar';
import '../CSS/Admin.css';

export const Admin = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [savedInputs, setSavedInputs] = useState([]);


  const [inputList, setInputList] = useState([]);
  const [inputFeild, setInputField] = useState({});

  // Add a new input with default values
  const addNewInput = () => {
    setInputField({
      type: "text",
      placeHolder: "",
      label: "New Input",
      isRequired: false,
      max: "",
      min: ""
    });
  };

  const deleteInput = (index) => {
    setInputList(inputList.filter((_, i) => i !== index));
  };

  // Select an input when clicked (updates the right bar)
  const selectInput = (index) => {
    setInputField(inputList[index]); // Load selected input into the right bar
    setEditingIndex(index); // Remember which input is being edited
  };
  

  // Handle input changes in the right bar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputField(prevState => {
      const updatedField = { ...prevState, [name]: value };

      const updatedList = inputList.map(input =>
        input.label === prevState.label ? updatedField : input
      );

      setInputList(updatedList);
      return updatedField;
    });
  };

  // Save input and clear the middle panel
  const saveInput = () => {
    if (!inputFeild.type || !inputFeild.label) {
      console.log("You should fill the type and label");
      return;
    }
  
    if (editingIndex !== null) {
      // If editing an existing input, update it
      const updatedList = [...inputList];
      updatedList[editingIndex] = inputFeild; // Replace the old input with the updated one
      setInputList(updatedList);
      setEditingIndex(null); // Reset editing index
    } else {
      // If creating a new input, add it to the list
      setInputList(prev => [...prev, inputFeild]);
    }
  
    // Clear the input field
    setInputField({
      type: "text",
      placeHolder: "",
      label: "",
      isRequired: false,
      max: "",
      min: ""
    });
  };
  

  // Cancel input editing
  const handleCancel = () => {
    setInputField({
      type: "text",
      placeHolder: "",
      label: "",
      isRequired: false,
      max: "",
      min: ""
    });
    setEditingIndex(null); // Reset editing index
  };
  
  const saveAndClearInputs = () => {
    if (inputList.length === 0) return;
  
    setSavedInputs(prev => [...prev, ...inputList]); // Move inputs to left bar
    setInputList([]); // Clear middle panel
  };
  const handleSelectInput = (selectedInput) => {
    setInputField({ ...selectedInput }); // Ensure a new object reference
  };
  
  
  

  return (
    <>
      <div className='admin-container'>
        <AdLeftBar  savedInputs={savedInputs} handleSelectInput={handleSelectInput} />

        <div className="middle-admin-page">
          <div className='center top-bar-container'>
            <AdTopBar addNewInput={addNewInput} saveAndClearInputs={saveAndClearInputs}  />
          </div>

          <div className="inputs-displayer">
            <div className="inputs-displayer-content-container">
                {inputList.map((input, index) => (
                  <div key={index} className="inputs-displayer-content" onClick={() => selectInput(index)}>
                    <label>{input.label}</label>
                    <input type={input.type} readOnly placeholder={input.placeHolder} />
                    <button className="delete-btn" onClick={() => deleteInput(index)}>🗑️</button>
                  </div>
                ))}
            </div>
            
          </div>
         
        </div>

        <AdRightBar

          inputList={inputList}
          inputFeild={inputFeild}
          saveInput={saveInput}
          addNewInput={addNewInput}
          handleChange={handleChange}
          handleCancel={handleCancel}
          saveAndClearInputs={saveAndClearInputs}
        />
      </div>
    </>
  );
};

