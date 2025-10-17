import React from 'react'
import '../CSS/AdRightBar.css'
export const AdRightBar = ({inputFeild,addNewInput,handleChange,handleCancel,existingInput,existingChoice,addChoice,setExistingChoice}) => {

      
   
       

  return (
    <>
      <div className="side-bar">
        <div className="inside-side-bar">
          <p className='side-bar-title'>Properties</p>
          <div className="side-bar-line"></div>

          <label>Label</label>
          <input type="text" className='side-bar-input' placeholder='Enter label' name='label' value={inputFeild.label || ""} onChange={handleChange} />

          <label>Placeholder</label>
          <input type="text" className='side-bar-input' placeholder='Enter placeholder' name="placeHolder" value={inputFeild.placeHolder || ""} onChange={handleChange} />

          <div className="side-bar-line"></div>

                    <div type='dropdown' className='side-bar-sub-title'>input type</div>
                    <select id="inputTypes" className="side-bar-input" value={inputFeild.type} onChange={handleChange} name='type'>
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="url">URL</option>
                            <option value="tel">Telephone</option>
                            <option value="number">Number</option>
                            <option value="multipleChoice">Multiple Choice</option>
                            <option value="dropDown">Dropdown</option>
                            <option value="range">Range</option>
                            <option value="date">Date</option>
                            <option value="file">File</option>
                            
                       
                    </select>
          

          <div className="side-bar-line"></div>
          {inputFeild.type === "dropDown" || inputFeild.type === "multipleChoice" ? (
                <>
                  <input
                    type="text"
                    placeholder="New choice"
                    value={existingChoice}
                    onChange={(e) => setExistingChoice(e.target.value)} // Updates temporary choice
                  />
                  <button onClick={addChoice}>Add Choice</button>
                  <button >Delete Choice</button>
                </>
              ) : null}


         


          {/*
              <span className="inter-validation">Number of Characters</span>
            <div className="max-min">
              <input type="number" className='max' placeholder='Max' min={0} name='max' value={inputFeild.max || ""} onChange={handleChange} />
              <input type="number" className='min' placeholder='Min' min={0} name='min' value={inputFeild.min || ""} onChange={handleChange} />
            </div>

            <span className='min-max-text'>No max limit allows unlimited input</span>
            <span className='min-max-text'>No min limit allows empty input</span>
              */}

          <div className="side-bar-line"></div>

          <div className="save-cancel center">
            <button className="save-input-btn" onClick={addNewInput}>
                  {existingInput !== null ? "Update" : "Add"}
            </button>
            <button className="cancel-input-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};
