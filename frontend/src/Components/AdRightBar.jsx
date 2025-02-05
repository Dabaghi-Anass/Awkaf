import React from 'react';
import '../CSS/AdRightBar.css';

export const AdRightBar = ({ inputFeild, handleChange, saveInput, handleCancel }) => {
  return (
    <>
      <div className="side-bar">
        <div className="inside-side-bar">
          <p className='side-bar-title'>Properties</p>
          <div className="side-bar-line"></div>

          <label>Label</label>
          <input type="text" className='side-bar-input' placeholder='Enter label' name='label' value={inputFeild.label || ""} onChange={handleChange} />

          <label>Placeholder</label>
          <input type="text" className='side-bar-input' placeholder='Enter placeholder' name='placeHolder' value={inputFeild.placeHolder || ""} onChange={handleChange} />

          <div className="side-bar-line"></div>

          <div className='side-bar-sub-title'>Input Type</div>
          <select id="inputTypes" className="side-bar-input" value={inputFeild.type || "text"} onChange={handleChange} name='type'>
            <option value="text">Text</option>
            <option value="password">Password</option>
            <option value="email">Email</option>
            <option value="search">Search</option>
            <option value="url">URL</option>
            <option value="tel">Telephone</option>
            <option value="number">Number</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="range">Range</option>
            <option value="date">Date</option>
            <option value="datetime-local">Datetime-local</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="time">Time</option>
            <option value="file">File</option>
            <option value="image">Image</option>
           
          </select>

          <div className="side-bar-line"></div>

          <div className="side-bar-sub-title">Validation</div>
          <p className='validation-text'>Default email input validation will be applied</p>

          <span className="inter-validation">Required</span>
          <div className="yes-no">
            <button className={`yes ${inputFeild.isRequired ? "active" : ""}`} onClick={() => handleChange({ target: { name: "isRequired", value: true } })}>Yes</button>
            <button className={`no ${!inputFeild.isRequired ? "active" : ""}`} onClick={() => handleChange({ target: { name: "isRequired", value: false } })}>No</button>
          </div>

          <span className="inter-validation">Number of Characters</span>
          <div className="max-min">
            <input type="number" className='max' placeholder='Max' min={0} name='max' value={inputFeild.max || ""} onChange={handleChange} />
            <input type="number" className='min' placeholder='Min' min={0} name='min' value={inputFeild.min || ""} onChange={handleChange} />
          </div>

          <span className='min-max-text'>No max limit allows unlimited input</span>
          <span className='min-max-text'>No min limit allows empty input</span>

          <div className="side-bar-line"></div>

          <div className="save-cancel center">
            <button className="save-input-btn" onClick={saveInput}>Add</button>
            <button className="cancel-input-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};
