import React from 'react';

export const AdLeftBar = ({ savedInputList,selectSavedInput}) => {
  return (
    <>
      <div className="side-bar">
        <div className="inside-side-bar">
          <p className='side-bar-title'>Navigation</p>
          <div className="side-bar-line"></div>
          <div className="side-bar-sub-title">Pages</div>
          <div className="side-bar-pages">
            <li className='side-bar-page'>Page1</li>
            <li className='side-bar-page'>Page2</li>
            <li className='side-bar-page'>Page3</li>
          </div>
          <div className="side-bar-line"></div>
          <div className="side-bar-sub-title">Inputs</div>
          <div className="side-bar-pages">
            {savedInputList.map((input, index) => (
              <li key={index} className='side-bar-input-title' onClick={() => selectSavedInput(input.id)}>{input.label}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
