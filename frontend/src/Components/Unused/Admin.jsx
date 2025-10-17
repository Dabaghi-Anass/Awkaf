import React, { useState,useEffect } from 'react';
import { AdTopBar } from './AdTopBar';
import { AdRightBar } from './AdRightBar';
import { AdLeftBar } from '../ui/AdLeftBar';
import '../CSS/Admin.css';

export const Admin = () => {


  
  const resetInputs = {
    id:null,
    type: "text",
    placeHolder: "",
    label: "",
    isRequired: false,
    choices: [{
      content:"",
      id:""
    }]
  };
  
  const [savedInputList,setSavedInputList]=useState([]); // array pour les champs enregistré 
  const [inputList, setInputList] = useState([]);// tableau pour stocker les champs en cours de creation
  const [inputFeild, setInputField] = useState(resetInputs);//un objet contient les infomations du champ 
  const [existingInput,setExistingInput]=useState(null);
  const [existingChoice, setExistingChoice] = useState("");  // Stores choice text  
  const [existingChoiceId, setExistingChoiceId] = useState(null); // Stores choice ID  

  const addNewInput = () => {
    if (!inputFeild.type || !inputFeild.label) {
        console.log("You should fill in the type and label");
        return;
    }

    // Only check for duplicates when adding a NEW input
    if (existingInput === null) {
        const isDuplicate = [...inputList, ...savedInputList].some(input => input.label === inputFeild.label);
        if (isDuplicate) {
            console.log("Duplicate label found! Please use a unique label.");
            return;
        }
    }

    if (existingInput !== null) {
        // Update existing input
        setInputList(prev =>
            prev.map(input =>
                input.id === existingInput ? { ...inputFeild, id: existingInput } : input
            )
        );
        setExistingInput(null); // Reset editing mode
    } else {
        // Add new input with a unique ID
        setInputList(prev => [...prev, { ...inputFeild, id: Date.now() }]);
    }

    setInputField(resetInputs); // Reset input field
};


  

 
   

    const saveeInput = (ID) => {
      // Find the correct input from inputList before saving
      const currentInput = inputList.find(input => input.id === ID);
    
      if (!currentInput) {
        console.log("Error: No input found with ID:", ID);
        return;
      }
    
      setSavedInputList(prev => {
        const existingIndex = prev.findIndex(input => input.id === ID);
        let updatedList;
    
        if (existingIndex !== -1) {
          updatedList = [...prev];
          updatedList[existingIndex] = { ...currentInput }; // Ensure correct input is saved
        } else {
          updatedList = [...prev, { ...currentInput }];
        }
    
        console.log("Updated Saved Inputs:", updatedList);
        return updatedList;
      });
    
      // Remove the saved input from inputList
      setInputList(prev => prev.filter(input => input.id !== ID));
      setTimeout(() => setInputField(resetInputs), 0);
    };
    
    

  
  useEffect(() => {
    console.log("Updated savedInputList:", savedInputList);
  }, [savedInputList]);

  const handleCancel = () => {
    setInputField(resetInputs);
    setExistingInput(null);
  };
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputField(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  
   
 // Select an input when clicked (updates the right bar)
 const selectInput = (id) => {
      const selectedInput = inputList.find((input) => input.id === id);
      if (selectedInput) {
        setInputField({ ...selectedInput });
        setExistingInput(id);  // Store the selected ID instead of index
      };
  };


  const selectSavedInput = (id) => {
    const selectedInput = savedInputList.find((input) => input.id === id);
    
    if (selectedInput) {
      setInputList(prev => {
        const exists = prev.some(input => input.id === id);
        return exists ? prev : [...prev, { ...selectedInput }];
      });
  
      setInputField(prev => ({ ...prev, ...selectedInput })); // Merge existing values
      setExistingInput(id);
    }


  };
  
  const deleteInput = (id) => {
    // Remove from inputList
    setInputList(prev => prev.filter(input => input.id !== id));

    // Remove from savedInputList
    setSavedInputList(prev => prev.filter(input => input.id !== id));

    // Reset input field and editing state if the deleted input was selected
    setInputField(resetInputs);
    setExistingInput(null);
};


const renderInputField = (input) => {
  switch (input.type) {
    case "dropDown":
      return (
        <select onChange={(e) => selectChoice(e.target.value)}>
          {input.choices?.map((choice) => (
            <option key={choice.id} value={choice.id}>
              {choice.content}
            </option>
          ))}
        </select>
      );

    case "multipleChoice":
      return (
        <div>
          {input.choices?.map((choice) => (
            <label key={choice.id} onClick={() => selectChoice(choice.id)}>
              <input type="checkbox" /> {choice.content}
            </label>
          ))}
        </div>
      );

    default:
      return (
        <div className="input-label">
          <label>{input.label || "Label"}</label>
          <br />
          <input
            type={input.type || "text"}
            readOnly
            placeholder={input.placeHolder || "Place holder"}
            onClick={() => selectInput(input.id)}
          />
        </div>
      );
  }
};


const addChoice = () => {
  if (!existingChoice.trim()) return; // Prevent empty choices

  setInputField(prevState => ({
      ...prevState,
      choices: [...prevState.choices, { content: existingChoice, id: Date.now() }]
  }));

  setExistingChoice(""); // Reset input after adding
};

const selectChoice = (choiceId) => {
  console.log("Clicked choice ID:", choiceId); // Ensure function is triggered

  // Ensure inputFeild.choices exists and is an array
  if (!inputFeild.choices || !Array.isArray(inputFeild.choices)) {
    console.error("Error: inputFeild.choices is not an array", inputFeild.choices);
    return;
  }

  // Ensure choiceId is compared properly (convert to Number if necessary)
  const selectedChoice = inputFeild.choices.find((choice) => String(choice.id) === String(choiceId));

  console.log("Found choice:", selectedChoice); // Check if a choice was found

  if (selectedChoice) {
    setExistingChoice(selectedChoice.content);
    setExistingChoiceId(selectedChoice.id);
  } else {
    console.log("No choice found with this ID.");
  }
};









  
  return (
    <>
      <div className='admin-container'>
        <AdLeftBar savedInputList={savedInputList} selectSavedInput={selectSavedInput} />

        <div className="middle-admin-page">
          <div className='center top-bar-container'>
            <AdTopBar   />
          </div>

          <div className="inputs-displayer">
            <div className="inputs-displayer-content">
            {inputList.map((input, index) => (
                <div key={index} className="input-label-btn">
                  {renderInputField(input)}
                  <br />
                  <div className="save-delete-btns">
                    <button className="delete-input-btn" onClick={() => deleteInput(input.id)}>Delete</button>
                    <button className="add-input-btn" onClick={() => saveeInput(input.id)}>Save</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AdRightBar
          inputList={inputList}
          inputFeild={inputFeild}
          addNewInput={addNewInput}
          handleChange={handleChange}
          handleCancel={handleCancel}
          setInputField={setInputField}
          existingInput={existingInput}
          setExistingChoice={setExistingChoice}
          addChoice={addChoice}
          existingChoice={existingChoice}
        />
      </div>
    </>
  );
};

