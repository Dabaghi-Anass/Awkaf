import React from 'react'

export const SideBar = () => {
  return (
    <>
        <div className="sidebar-container reletive left-0
        top-0 bg-white h-screen w-[20em] border-r-[#118218]
        border-r-2">
            
           
                <ul className='side-bar-list mt-5 px-2 w-8/9 border-[#118218] border-2 ml-6 rounded-[5px] h-100 ' >
                    <li className=''>
                        <p className='text-[16px] font-[600]  w-full  py-2 border-b-1'>Main</p>
                        <div className='side-bar-item my-5 border-l-3 py-2 pl-2 text-[20px] font-medium rounded-r-lg cursor-pointer border-[#000] text-[#118218] hover:text-amber-50 '>Dashboard</div>
                    </li>

                    <li className=''>
                        <p className='text-[16px] font-[600]  w-full  py-2 border-b-1'>User Details</p>
                        <div className='side-bar-item my-5 border-l-3 py-2 pl-2 text-[20px] font-medium rounded-r-lg cursor-pointer border-[#000] text-[#118218] hover:text-amber-50  '>Users</div>
                    </li>

                    <li className=''>
                        <p className=' text-[16px] font-[600]  w-full  py-2 border-b-1'>Project details</p>
                        <div className='side-bar-item my-5 border-l-3 py-2 pl-2 text-[20px] font-medium rounded-r-lg cursor-pointer border-[#000] text-[#118218] hover:text-amber-50'>Awkaf-projects</div>
                    </li>
                      
                </ul>
          
        </div>
        

    </>
  )
}
