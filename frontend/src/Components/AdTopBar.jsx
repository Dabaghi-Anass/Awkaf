import React from 'react';
import '../CSS/AdTopBar.css';

export const AdTopBar = ({ addNewInput,saveAndClearInputs }) => {
  return (
    <>
      <div className="admin-top-bar center">
        <div className="inside-admin-top-bar">
          <span className='page-number'>Page 1</span>
          <div className="vertical-line"></div>
          <button className='add-input-btn' onClick={addNewInput}>New Input</button>
          <button className="save-clear-btn" onClick={saveAndClearInputs}>Save Inputs</button>
        </div>
      </div>
    </>
  );
};
