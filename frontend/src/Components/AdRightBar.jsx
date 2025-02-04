import React from 'react'
import '../CSS/AdRightBar.css'
export const AdRightBar = ({inputList,setInputList,inputFeild,setInputField,saveInput}) => {

      const handleChange=(e)=>{
         const  {name,value}=e.target
         setInputField({...inputFeild,[name]:value})

      }

      const handleRequired =(value)=>{
          setInputField({...inputFeild,isRequired:value})
      }
      
      
      const handleCancel=()=>{
        setInputField({
          type:"",
          placeHolder:"",
          label:"",
          isRequired:false,
          max:"",
          min:""
        })
      }



  return (
    <>
           <div className="side-bar">
                <div className="inside-side-bar">
                    <p className='side-bar-title'>Properties</p>
                    <div className="side-bar-line"></div>
                    <label  >Label</label>
                    <input type="text" className='side-bar-input' placeholder='Current label here' name='label' value={inputFeild.label} onChange={handleChange} />
                    <label >Place holder</label>
                    <input type="text" className='side-bar-input' placeholder='Current placeholder' name='placeHolder' value={inputFeild.placeHolder} onChange={handleChange} />
                    <div className="side-bar-line"></div>

                    <div className='side-bar-sub-title'>input type</div>
                    <select id="inputTypes" className="side-bar-input" value={inputFeild.type} onChange={handleChange} name='type'>
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
                            <option value="color">Color</option>
                            <option value="hidden">Hidden</option>
                            <option value="submit">Submit</option>
                            <option value="reset">Reset</option>
                            <option value="button">Button</option>
                    </select>

                    <div className="side-bar-line"></div>

                   <div className="side-bar-sub-title">Validation</div>
                   <p className='validation-text'>Default email input validation will be automatically applied </p>

                   <span className="inter-validation">required</span>
                   <div className="yes-no">
                    <button  className={`yes ${inputFeild.isRequired === true ? "active" : ""}`}  onClick={()=>handleRequired(true)}>Yes</button>
                    <button  className={`no ${inputFeild.isRequired === false ? "active" : ""}`}  onClick={()=>handleRequired(false)}>No</button>
                   </div>

                   <span className="inter-validation">number of characters</span>
                   
                   <div className="max-min ">
                    <input type="number" className='max' placeholder='Max' min={0} onChange={handleChange} name='max'/>
                    <input type="number" className='min' placeholder='Min' min={0} onChange={handleChange} name='min'/>
                   </div>

                    <span className='min-max-text'>Not setting a maximum limit allows unlimited text input</span>
                    <span className='min-max-text'>Not setting a minimum limit allows empty or single-character responses</span>
                    <div className="side-bar-line"></div>

                    <div className="save-cancel center">
                      <button className="save-input-btn" onClick={saveInput}>Save</button>
                      <button className="cancel-input-btn" onClick={handleCancel}>Cancel</button>
                      
                    </div>
                </div>
           </div>
    </>
    
  )
}
