import React, { useState } from 'react'
import '../CSS/DashboardAdmin.css'
import { ManageAwkaf } from './ManageAwkaf';
import { TopBar } from '../Components/admin_dashboard/TopBar';
import { SideBar } from '../Components/admin_dashboard/SideBar';
import {ManageUsers} from '../Components/ManageUsers'
import { ProjectsTable } from '../Components/ProjectsTable';


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
        <TopBar></TopBar>
        <div className='flex  gap-5 '>
        <SideBar></SideBar> 
            <div className='w-3/4 pr-4 '>
            <div className='bg-[#eeeeee] py-4 pl-3.5 rounded-lg mt-5 mb-8 relative after:absolute after:-bottom-4 after:left-0 after:h-0.5  after:bg-[#999999] after:w-full after:rounded-4xl text-[#118218] font-[600] text-lg'>Home-Users</div>
            <div className='flex items-center  mb-5 gap-8'>
                <h1  className='font-bold text-[25px] text-[#000]  '>
                    Users
                </h1>
                <button className='bg-[#118218] py-2 px-5 rounded-[5px] font-light text-white'>+Add New</button>
            </div>
                <ProjectsTable></ProjectsTable>
            </div>
        </div>
        
        
       
     
    </>
  )
}
{/*
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
            ))} */}{/*}
            </div>

            <ManageAwkaf></ManageAwkaf>
            

        </div> */}
