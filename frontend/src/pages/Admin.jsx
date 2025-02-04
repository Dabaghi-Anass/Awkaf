import React, { useState } from 'react'
import { AdTopBar } from '../Components/AdTopBar'
import { AdRightBar } from '../Components/AdRightBar'
import '../CSS/Admin.css'
import { AdLeftBar } from '../Components/AdLeftBar'
export const Admin = () => {

  const [inputList,setInputList]=useState([])
  const [inputFeild,setInputField]=useState({
    type:"",
    placeHolder:"",
    label:"",
    isRequired:false,
    max:"",
    min:""
  })

  const saveInput=()=>{
    if(!inputFeild.type && !inputFeild.label){
      console.log("You should fill the type and label");
      return 
    }

    setInputList(i=>[...i,inputFeild])
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
            <div className='admin-container'>
             <AdLeftBar 
             
             >

             </AdLeftBar>

              <div className="middle-admin-page">
                <div className='center top-bar-container'><AdTopBar></AdTopBar></div>
                
                <div className="inputs-displayer">
                    <div className="inputs-displayer-content">
                      <label htmlFor="">Current label</label>
                      <input type="text" readOnly />

                      <label htmlFor="">Current label</label>
                      <input type="text"readOnly />
                    </div>
                </div>
              </div>

              <AdRightBar
                 inputList={inputList}
                 setInputList={setInputList}
                 inputFeild={inputFeild}
                 setInputField={setInputField}
                 saveInput={saveInput}
              >

              </AdRightBar>

            </div>
   </>
  )
}
