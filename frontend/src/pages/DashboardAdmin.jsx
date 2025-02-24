import React, { useState } from 'react'
import '../CSS/DashboardAdmin.css'
export const DashboardAdmin = () => {

    const [column,setColumn]=useState({
        name:"",
        type:""
    });
    const [colTab,setColTab]=useState([])

    const handleChange = (e)=>{
        const {name,value}=e.target
        setColumn(c=>({...c,[name]:value}) ) ;
    }

    const saveCol=()=>{

        setColTab(c=>([...c,column]));
        setColumn(c=>({name:"",
            type:"",
        }));
    }
    console.log(colTab)
    const sendData  = async ()=>{
        const token = localStorage.getItem("accessToken");
        try {
            const response = await fetch("http://localhost:8000/apif/admin/manage-zakat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(column),
            });
    
            const data = await response.json();
            if (!response.ok) {
                console.error("Backend error:", data);
                throw new Error("Failed to save column");
            }} catch (error) {
                console.error("Error:", error);
                alert(error.message);
            };
    }

    const deleteCol=(col)=>{
        const update = colTab.filter(element=> element.name!==col.name);
        setColTab(update);
    }
  return (
    <>
        <div className="class center ">
            <div className="holder">
                <label htmlFor="">Add Column in data base</label> <br />
                <input type="text" placeholder='column name' name='name' value={column.name} onChange={handleChange} />
                <input type="text" placeholder='column type' name='type' value={column.type} onChange={handleChange} />
                <button onClick={saveCol} >Submit </button>

                {colTab.map((element,index)=>(
                <div className="elem" key={index}>
                    <div>colm name:{element.name}</div> 
                    <div>colm type:{element.type}</div>
                    <button onClick={()=>{deleteCol(element)}}>delete</button>
                </div>
            ))}
            </div>
            

        </div>
    </>
  )
}
