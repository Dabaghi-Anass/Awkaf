import React, { useState,useEffect } from 'react';
import { AdTopBar } from '../Components/AdTopBar';
import { AdRightBar } from '../Components/AdRightBar';
import { AdLeftBar } from '../Components/AdLeftBar';
import '../CSS/Admin.css';

export const Admin = () => {
  const resetInputs = {
    id:null,
    type: "text",
    placeHolder: "",
    label: "",
    isRequired: false,
    max: null,
    min: null, 
    choices: [{
      content:"",
      id:""
    }]
  };

  const [savedInputList,setSavedInputList]=useState([]); // array pour les champs enregistré 
  const [inputList, setInputList] = useState([]);// tableau pour stocker les champs en cours de creation
  const [inputFeild, setInputField] = useState(resetInputs);//un objet contient les infomations du champ 
  const [existingInput,setExistingInput]=useState(null);


  const addNewInput = () => {
    if (!inputFeild.type || !inputFeild.label) {
        console.log("You should fill in the type and label");
        return;
    }

    // Check for duplicate label in both inputList and savedInputList
    const isDuplicate = [...inputList, ...savedInputList].some(input => input.label === inputFeild.label);
    if (isDuplicate) {
        console.log("Duplicate label found! Please use a unique label.");
        return;
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

  

  {/*const saveInput = () => {
    if (inputList.length === 0) return; // Prevent empty saves

    setSavedInputList(prev => {
        let updatedList = [...prev];

        if (existingInput !== null) {
            // Update existing input in savedInputList
            updatedList = updatedList.map(input =>
                input.id === existingInput ? { ...inputFeild, id: existingInput } : input
            );
            setExistingInput(null); // Reset editing mode
        } else {
            // Add new inputs from inputList (ensuring they have an ID)
            const newInputs = inputList.map(input => ({ ...input, id: input.id || Date.now() }));
            updatedList = [...updatedList, ...newInputs];
        }

        return updatedList;
    }); 

    };
    */}

   

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
  
    setInputField(prevState => {
      const updatedField = { ...prevState, [name]: value };
  
      const updatedList = inputList.map(input =>
        input.id === prevState.id ? updatedField : input // Use id for comparison
      );
  
      setInputList(updatedList);
      return updatedField;
    });
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

                <div key={index} className='input-label-btn'>

                    <div className='input-label'>
                      <label>{input.label || "label"}</label> <br />
                      <input type={input.type || "text"} readOnly placeholder={input.placeHolder || "place holder"} onClick={()=>selectInput(input.id)} />
                    </div>
                      <br />
                      <div className="save-delete-btns">
                        <button className='delete-input-btn' onClick={()=>{deleteInput(input.id)}}>Delete</button>
                        <button className='add-input-btn' onClick={()=>saveeInput(input.id)}>save</   button>
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
        />
      </div>
    </>
  );
};

