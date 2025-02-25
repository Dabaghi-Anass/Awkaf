import React, { useState } from 'react'
import '../CSS/DashboardAdmin.css'
import { ManageAwkaf } from './ManageAwkaf';
export const DashboardAdmin = () => {

    const [column,setColumn]=useState({
        column_name:"",
        column_type:""
    });
    const [colTab,setColTab]=useState([])

    const handleChange = (e)=>{
        const {name,value}=e.target
        setColumn(c=>({...c,[name]:value}) ) ;
    }

    {/*
        const saveCol=()=>{

        setColTab(c=>([...c,column]));
        setColumn(c=>({column_name:"",
            column_type:"",
        }));
    } */}

    const sendData = async () => {
        const token = localStorage.getItem("accessToken");
        
        const requestData = {
            column_name: column.column_name,
            column_type: column.column_type || "VARCHAR(255)",
        };
    
        try {
            const response = await fetch("http://localhost:8000/apif/admin/manage-zakat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error(data.error || "Failed to save column");
            }
    
            console.log("Column added:", data);
            alert(data.message);
    
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    

    const deleteCol=(col)=>{
        const update = colTab.filter(element=> element.name!==col.name);
        setColTab(update);
    }
  return (
    <>
        <div className="class center ">
            <div className="holder">
                <label htmlFor="">Add Column in data base</label> <br />
                <input type="text" placeholder='column name' name='column_name' value={column.column_name} onChange={handleChange} />
                <input type="text" placeholder='column type' name='column_type' value={column.column_type} onChange={handleChange} />
                <button onClick={sendData} >Submit </button>

                {/*{colTab.map((element,index)=>(
                <div className="elem" key={index}>
                    <div>colm name:{element.name}</div> 
                    <div>colm type:{element.type}</div>
                    <button onClick={()=>{deleteCol(element)}}>delete</button>
                </div>
            ))} */}
            </div>

            <ManageAwkaf></ManageAwkaf>
            

        </div>
    </>
  )
}
