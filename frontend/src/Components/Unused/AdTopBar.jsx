import React from 'react'
import '../CSS/AdTopBar.css'
export const AdTopBar = () => {
  return (
    <>
        <div className="admin-top-bar center">
            <div className="inside-admin-top-bar">
               <span className='page-number'>Page 1</span>
                <div className="vertical-line"></div>

               {/* <button className='add-input-btn' onClick={saveInput}>save</   button> */}
            </div>
        </div>
    </>
  );
};
